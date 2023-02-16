import { type AppType } from "next/app";
import { AuthProvider } from "../context/useWalletAuth";
import { api } from "../utils/api";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import "../styles/globals.css";
import { ToastContainerProps, ToastContainer } from "react-toastify";
import { GlobalStateProvider } from "../context/useGlobalState";
import NotificationProvider from "../context/useNotificationState";
import { TransactionFlowStateProvider } from "../context/useTransactionFlowState";
import { GasStateProvider } from "../context/useGasPriceState";
import { GatewayProvider } from "../context/useGatewayState";

const toastConfig = {
  autoClose: 6000,
  closeButton: true,
  closeOnClick: false,
  theme: "dark",
  draggable: false,
  pauseOnHover: true,
  progressStyle: { visibility: "visible", animationDirection: "reverse" },
} as ToastContainerProps;

function getLibrary(provider: any): Web3Provider {
  return new Web3Provider(provider);
}
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <AuthProvider>
        <NotificationProvider>
          <GlobalStateProvider>
            <GasStateProvider>
              <GatewayProvider>
                <TransactionFlowStateProvider>
                  <ToastContainer {...toastConfig} />
                  <Component {...pageProps} />
                </TransactionFlowStateProvider>
              </GatewayProvider>
            </GasStateProvider>
          </GlobalStateProvider>
        </NotificationProvider>
      </AuthProvider>
    </Web3ReactProvider>
  );
};

export default api.withTRPC(MyApp);
