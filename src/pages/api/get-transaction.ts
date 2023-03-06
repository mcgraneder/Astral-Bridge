import type { NextApiRequest, NextApiResponse } from "next";
import Collections from "../../services/Collections";
import ErrorCodes from "../../constants/errorCodes";
import { TxType, TxStatus } from "./walletTx";
import Firebase from "../../services/firebase-admin";

type ResponseData = {
  tx?: any[];
  errorCode?: string;
};

const initializeVariables = (
  queryAccountId: string | string[],
  queryHash: string | string[]
) => {
  const accountId = Array.isArray(queryAccountId)
    ? queryAccountId[0]
    : queryAccountId;
  const hash = Array.isArray(queryHash) ? queryHash[0] : queryHash;


  return { accountId, hash };
};

const checkTransactionType = async (
  txDocsRef: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>,
  userRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>
) => {
  const tx: any[] = [];
  const txDocs = txDocsRef.docs;

  for (const t of txDocs) {
    const data = t.data();
    tx.push(data);
  }
  return tx;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    const { accountId: queryAccountId, txHash: queryHash } = req.query;

    const { accountId } = initializeVariables(
      queryAccountId!,
      queryHash!
    );

    //handle undefined case from above return at some point

    const { userRef } = await Firebase();

    const userDoc = await userRef.doc(accountId!).get();

    if (!userDoc.exists) {
      res.status(404).json({ errorCode: ErrorCodes.invalidAccountId });
      return;
    }

    const userDocRef = userDoc.ref;
    const txDocsRef = await userDocRef
      .collection(Collections.txs)
      .where("txHash", "==", queryHash)
      .get();

    const tx = await checkTransactionType(txDocsRef, userRef);

    res.status(200).json({ tx });
  }
  res.status(404).end();
}