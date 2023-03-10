import { type AppType } from "next/app";
import { AuthProvider } from "../context/useWalletAuth";
import { api } from "../utils/api";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import "../styles/globals.css";
import "../styles/Accordian.css"
import "../styles/AccordianItem.css";
import "../styles/tooltip.css";


import { ToastContainerProps, ToastContainer } from "react-toastify";
import { GlobalStateProvider } from "../context/useGlobalState";
import NotificationProvider from "../context/useNotificationState";
import { TransactionFlowStateProvider } from "../context/useTransactionFlowState";

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
            <TransactionFlowStateProvider>
              <ToastContainer {...toastConfig} />
              <Component {...pageProps} />
            </TransactionFlowStateProvider>
          </GlobalStateProvider>
        </NotificationProvider>
      </AuthProvider>
    </Web3ReactProvider>
  );
};

export default api.withTRPC(MyApp);
