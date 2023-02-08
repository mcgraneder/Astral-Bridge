import { type AppType } from "next/app";
import { AuthProvider } from "../context/useWalletAuth";
import { api } from "../utils/api";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import "../styles/globals.css";
import { ToastContainerProps, ToastContainer } from "react-toastify";
import { WalletProvider } from "../context/useWalletState";
import { GlobalStateProvider } from "../context/useGlobalState";

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
        <GlobalStateProvider>
          <WalletProvider>
            <ToastContainer {...toastConfig} />
            <Component {...pageProps} />
          </WalletProvider>
        </GlobalStateProvider>
      </AuthProvider>
    </Web3ReactProvider>
  );
};

export default api.withTRPC(MyApp);
