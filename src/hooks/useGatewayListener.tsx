import { Gateway } from "@renproject/ren";
import { useEffect } from "react";

import API from "../constants/Api";
import { axios } from "../services/axios";

const useGatewayListener = (
  active: boolean,
  gateway: Gateway<any, any> | undefined,
  cb: (data?: any) => void
) => {
  useEffect(() => {
    if (!(active && gateway)) return;
    gateway.on("transaction", (tx) => {
      (async () => {
        const renVMTxId = tx.hash;
        console.log(tx)
        // only check for already processed tx if asset is not gETH
        if (gateway.params.asset !== "gETH") {
          let queryRenTxResponse = null;
          try {
            queryRenTxResponse = await axios.get(API.ren.queryRenTx, {
              params: { txHash: renVMTxId },
            });
          } catch (error: any) {
            queryRenTxResponse = error.response;
          }

          const { status, data } = queryRenTxResponse;
          console.log(status)
          if (status !== 404 && data.result.txStatus !== "ready") return;
        }

        await tx.in.wait(0);
        const exported = tx.in.progress.transaction;
        console.log(exported)

        cb({
          exportedTx: exported,
          txParams: tx.params,
          gatewayAddress: gateway.gatewayAddress,
          renVMTxId,
        });
      })();
    });
    return () => {
      gateway.eventEmitter.removeAllListeners();
    };
  }, [gateway, active]);
};
export default useGatewayListener;
