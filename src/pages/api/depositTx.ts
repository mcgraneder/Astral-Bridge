import type { NextApiRequest, NextApiResponse } from "next";
import Collections from "../../services/Collections";
import Firebase from "../../services/firebase-admin";
import ErrorCodes from "../../constants/errorCodes";

export const TxStatus = {
  pending: "pending",
  failed: "failed",
  completed: "completed",
};

export const TxType = {
  deposit: "deposit",
  withdraw: "withdraw",
  transfer: "transfer",
  swap: "swap",
};

type ResponseData = {
  [x: string]: any;
  errorCode?: string;
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { encryptedId } = req.body;

  if (!encryptedId) {
    res.status(400).json({ encryptedId, errorCode: ErrorCodes.invalidBody });
    return;
  }

  const { userRef } = await Firebase();
  const userSnapshot = await userRef.doc(encryptedId).get();

  console.log(userSnapshot.exists);

  if (!userSnapshot.exists) {
    res.status(204).end();
    return;
  }

  const userDocRef = userSnapshot.ref;
  if (req.method === "PATCH") {
    const { txId, ...rest } = req.body;
    const dataToUpdate = { status: TxStatus.completed, ...rest };

    await userDocRef.collection(Collections.txs).doc(txId).update(dataToUpdate);
    res.status(200).json({ success: true });
  } else if (req.method === "POST") {
    const { txHash, ...rest } = req.body;

    const renVMTxIdDocSnapshot = await userDocRef
      .collection(Collections.txs)
      .where("txHash", "==", txHash)
      .get();
    if (!renVMTxIdDocSnapshot.empty) {
      res.status(200).json({ errorCode: ErrorCodes.txAlreadyExists });
      return;
    }

    const txDoc = await userDocRef.collection(Collections.txs).add({
      date: Date.now(),
      status: TxStatus.pending,
      txHash: txHash,
      ...rest,
    });
    res.status(200).json({ success: true, txId: txDoc.id });
    return;
  } else {
    res.status(404).json({});
  }
}

export default handler;
