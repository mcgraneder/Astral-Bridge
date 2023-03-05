import type { NextApiRequest, NextApiResponse } from "next";
import Collections from "../../services/Collections";
import ErrorCodes from "../../constants/errorCodes";
import { TxType, TxStatus } from "./walletTx";
import Firebase from "../../services/firebase-admin";

type ResponseData = {
  txs?: any[];
  errorCode?: string;
};

const initializeVariables = (
  queryAccountId: string | string[],
  queryLimit: string | string[] | 500
) => {
  const accountId = Array.isArray(queryAccountId)
    ? queryAccountId[0]
    : queryAccountId;
  const limit = Number(Array.isArray(queryLimit) ? queryLimit[0] : queryLimit);

  return { accountId, limit };
};


const checkTransactionType = async (
  txDocsRef: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>,
  userRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>
) => {
  const txs: any[] = [];
  const txDocs = txDocsRef.docs;

  for (const tx of txDocs) {
    const data = tx.data();
    const { status, type, timestamp } = data;
    txs.push(data);
  }
  return txs;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    const {
      accountId: queryAccountId,
      limit: queryLimit,
    } = req.query;

   
    const { accountId, limit } = initializeVariables(
      queryAccountId!,
      queryLimit!
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
      .orderBy("date", "desc")
      .limit(limit)
      .get();

    const txs = await checkTransactionType(txDocsRef, userRef);

    res.status(200).json({ txs });
  }
  res.status(404).end();
}
