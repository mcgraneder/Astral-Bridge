import type { NextApiRequest, NextApiResponse } from "next";
import Collections from "../../services/Collections";
import Firebase from "../../services/firebase-admin";

const TxStatus = {
  initiated: "initiated",
  releaseTxPending: "releaseTxPending",
  queryRenTxPending: "queryRenTxPending",
  queryRelayTxPending: "queryRelayTxPending",
  failed: "failed",
  cancelled: "cancelled",
  completed: "completed",
};

const TxType = {
  deposit: "deposit",
  withdraw: "withdraw",
  transfer: "transfer",
  swap: "swap",
};


const ErrorCodes = {
  metamaskNotFound: "errors:metamask/notFound",
  invalidBody: "errors:api/invalidBody",
  apiFailed: "errors:api/requestFailed",
  catIdNotFound: "errors:catId/catIdNotFound",
  invalidCatId: "errors:catId/invalidCatId",
  catIdTaken: "errors:catId/alreadyTaken",
  minCatIdLen: "errors:catId/length",
  emailTaken: "errors:email/alreadyTaken",
  signNotMatched: "errors:metamask/signMismatch",
  invalidEmail: "errors:email/invalidEmail",
  invalidAccountId: "errors:account/invalidAccountId",
  invalidAddress: "errors:input/invalidAddress",
  invalidInput: "errors:input/invalidInput",
  txAlreadyExists: "errors:api/txAlreadyExists",
  switchToRenChain: "errors:metamask/switchToRenChain",
  switchToMainnet: "errors:metamask/switchToMainnet",
  onlyWithdrawToYourAccount: "errors:tx/onlyWithdrawToYourAccount",
  increaseTxAmount: "errors:tx/increaseTxAmount",
  txFailed: "errors:tx/txFailed",
  captchaFailed: "errors:captcha/failed",
  waitlistNotFound: "errors:waitlist/notFound",
  waitlistAccessPending: "errors:waitlist/accessPending",
  insufficientFunds: "errors:input/insufficientFunds",
  invalidSignature: "errors:tx/invalidSignature",
};



type ResponseData = {
  [x: string]: any;
  errorCode?: string;
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { accountId } = req.body;

  if (!accountId) {
    res.status(400).json({ accountId, errorCode: ErrorCodes.invalidBody });
    return;
  }

  const { userRef } = await Firebase();
  const userSnapshot = await userRef.doc(accountId).get();

  if (!userSnapshot.exists) {
    res.status(204).end();
    return;
  }

  const userDocRef = userSnapshot.ref;
  if (req.method === "PATCH") {
    const { txId, accountId, accountKey, revert = null, ...rest } = req.body;
    const dataToUpdate = { ...rest, revert };

    if (revert === "MintGateway: signature already spent") {
      dataToUpdate.status = TxStatus.completed;
      dataToUpdate.revert = null;
    }

    await userDocRef.collection(Collections.txs).doc(txId).update(dataToUpdate);
    res.status(200).json({ success: true });
  } else if (req.method === "POST") {
    const {
      renVMTxId = null,
      accountId,
      accountKey,
      status,
      ...rest
    } = req.body;

    // CHECK IF RENVMTXID ALREADY EXISTS
    // const renVMTxIdDocSnapshot = await userDocRef
    //   .collection(Collections.txs)
    //   .where("renVMTxId", "==", renVMTxId)
    //   .get();
    // if (!renVMTxIdDocSnapshot.empty) {
    //   res.status(200).json({ errorCode: ErrorCodes.txAlreadyExists });
    //   return;
    // }

    const txDoc = await userDocRef.collection(Collections.txs).add({
      timestamp: Date.now(),
      type: TxType.deposit,
      renVMTxId,
      status: TxStatus.initiated,
      ...rest,
    });
    res.status(200).json({ success: true, txId: txDoc.id });
    return;
  } else {
    res.status(404).json({});
  }
}

export default handler;
