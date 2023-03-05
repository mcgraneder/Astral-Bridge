import type { NextApiRequest, NextApiResponse } from "next";
import Collections from "../../services/Collections";
import ErrorCodes from "../../constants/errorCodes";
import { TxType, TxStatus } from "./depositTx";
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


// const checkTransactionType = async (
//   txDocsRef: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>,
//   userRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>
// ) => {
//   const txs: any[] = [];
//   const txDocs = txDocsRef.docs;

//   for (const tx of txDocs) {
//     const data = tx.data();
//     const { status, type, timestamp } = data;
//     if (status === TxStatus.initiated || status === TxStatus.cancelled)
//       continue;

//     let txObj: any = { status, type, timestamp, txId: tx.id };

//     if (type === TxType.transfer) {
//       const { to, from, amount, fiatAmount, token, received, tokenAddress } =
//         data;

//       txObj = await checkReceivedOrSentInTransfer(
//         txObj,
//         received,
//         userRef,
//         to,
//         from
//       );
//       txObj = { ...txObj, amount, fiatAmount, token, received, tokenAddress };
//     } else if (type === TxType.swap) {
//       const {
//         sellAmount,
//         sellToken,
//         sellFiatAmount,
//         buyAmount,
//         buyToken,
//         buyFiatAmount,
//       } = data;
//       txObj = {
//         ...txObj,
//         sellAmount,
//         sellToken,
//         sellFiatAmount,
//         buyAmount,
//         buyToken,
//         buyFiatAmount,
//       };
//     } else {
//       // withdraw and deposit
//       const { token, amount, fiatAmount, renVMTxId, tokenAddress } = data;
//       txObj = { ...txObj, token, amount, fiatAmount, renVMTxId, tokenAddress };
//     }
//     if (type === TxType.withdraw || type === TxType.deposit) {
//       if (txObj.renVMTxId) {
//         txs.push(txObj);
//       }
//     } else {
//       txs.push(txObj);
//     }
//   }
//   return txs;
// };

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

    // const txs = await checkTransactionType(txDocsRef, userRef);
    const txs = txDocsRef.docs.map(
      (
        doc: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
      ) => {
        console.log(doc.data())
        return doc.data();
      }
    );

    res.status(200).json({ txs });
  }
  res.status(404).end();
}
