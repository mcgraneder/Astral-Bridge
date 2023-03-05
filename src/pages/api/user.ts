import type { NextApiRequest, NextApiResponse } from "next";
import ErrorCodes from "../../constants/errorCodes";
import Firebase from "../../services/firebase-admin";

type ResponseData = {
  [x: string]: any;
  errorCode?: string;
};

class AccountError extends Error {
  statusCode;
  constructor(message: any, statusCode: number) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
}

const handleNoAddressResponse = (address: string) => {
  if (!address)
    throw new AccountError({ address, errorCode: ErrorCodes.invalidBody }, 400);
};

const handleExistingUserGetResponse = (
  userSnapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>,
  address: string
) => {
  if (!userSnapshot.empty) {
    const userData = userSnapshot.docs[0]!.data();
    throw new AccountError(
      {
        exists: true,
        data: { data: userData, accountId: userSnapshot.docs[0]!.id },
      },
      200
    );
  }
};

const handleNewUserGetResponse = (_address: string) => {
  throw new AccountError({ exists: false, data: {} }, 200);
};

const handleExistingUserPostResponse = (
  userSnapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>,
  address: string
) => {
  if (!userSnapshot.empty) {
    // USER ALREADY EXISTS
    const userData = userSnapshot.docs[0]!.data();
    throw new AccountError(
      {
        new: false,
        data: { data: userData, accountId: userSnapshot.docs[0]!.id },
      },
      200
    );
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const { address: queryAddress } =
      req.method === "GET" ? req.query : req.body;
    const address = queryAddress;

    handleNoAddressResponse(address);

    const { userRef, db } = await Firebase();
    if (req.method === "GET") {
      const userSnapshot = await userRef
        .where("accountId", "==", address)
        .get();
      handleExistingUserGetResponse(userSnapshot, address);
      handleNewUserGetResponse(address);
    } else if (req.method === "POST") {
      const userSnapshot = await userRef
        .where("accountId", "==", address)
        .get();
        
      handleExistingUserPostResponse(userSnapshot, address);
      if (userSnapshot.empty) {
        // CREATING NEW USER
        const { address } = req.body;

        if (address) {
          const newUserDoc = await userRef.add({
            accountId: address,
          });

          throw new AccountError(
            {
              new: true,
              data: {
                address: address,
                accountId: newUserDoc.id,
              },
            },
            201
          );
        } else {
          handleNoAddressResponse(address);
        }
      }
    } else {
      res.status(404).json({});
    }
  } catch (responseObj: any) {
    res.status(responseObj.statusCode).json(responseObj.message);
  }
}
