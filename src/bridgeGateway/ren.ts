
import RenJS, { Gateway } from "@renproject/ren";
import { RenNetwork } from "@renproject/utils";

import { isProduction } from "../utils/misc";
type GatewayCallbackEventTypes = "progress" | "submitted";

const network = isProduction() ? RenNetwork.Mainnet : RenNetwork.Testnet;

//gasPrice: ethers.utils.parseUnits('100', 'gwei'), gasLimit: 1000000}
export const submitGatewayInTx = async (
  gateway: Gateway<any, any>,
) => {
  if (gateway.in !== undefined) {
    for (const setupKey of Object.keys(gateway.inSetup)) {
      const setup = gateway.inSetup[setupKey];
      await setup!.submit?.().catch((error) => {
        console.error(error.code);
        // updateOnMetamaskConfirmation(true);
        // if (error.code === 4001) setApprovalError(false);
      });
      await setup!
        .wait()
        .catch((error) => console.error(error));
    }
    await gateway.in.submit?.().on("progress", (result) => {
      if (result.confirmations != 0) return;
    //   updateOnMetamaskConfirmation(false);
    });
    await gateway.in.wait(1);
  }
};

export const submitApprovalGatewayInTx = async (
  gateway: Gateway<any, any>,
  resetFlow: any
) => {
  if (gateway.in !== undefined) {
    for (const setupKey of Object.keys(gateway.inSetup)) {
      const setup = gateway.inSetup[setupKey];
      await setup!.submit?.().catch((error: Error) => {
        console.error(error);
      });
      await setup!.wait().then(() => {
        resetFlow();
      });
    }
  }
};

