import { createContext, useCallback, useContext, useState } from "react";
import { useGlobalState } from "./useGlobalState";

interface TransactionFlowStateProps {
  children: React.ReactNode;
}

type TransactionFlowContextType = {
  transactionFailed: boolean;
  pending: boolean;
  confirmation: boolean;
  rejected: boolean;
  submitted: boolean;
  toggleTransactionFailedModal: () => void;
  togglePendingModal: () => void;
  toggleRejectedModal: () => void;
  toggleConfirmationModal: () => void;
  toggleSubmittedModal: () => void;
};

const TransactionFlowContext = createContext({} as TransactionFlowContextType);

function TransactionFlowStateProvider({ children }: TransactionFlowStateProps) {
  const [transactionFailed, setTransactionFailed] = useState<boolean>(false);
  const [rejected, setRejected] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [pending, setPending] = useState<boolean>(false);
  const { setPendingTransaction } = useGlobalState();

  const toggleTransactionFailedModal = useCallback(
    (): void => setTransactionFailed(false),
    [setTransactionFailed]
  );
  const togglePendingModal = useCallback((): void => {
    setConfirmation(false);
    setPending((w: boolean) => !w);
    setPendingTransaction(true);
  }, [setPending, setPendingTransaction, setConfirmation]);

  const toggleRejectedModal = useCallback((): void => {
    setPending(false);
    setRejected((w: boolean) => !w);
    setPendingTransaction(false);
  }, [setPending, setRejected, setPendingTransaction]);

  const toggleConfirmationModal = useCallback(
    (): void => {
        console.log("hey")
        setConfirmation((w: boolean) => !w)
    },
    [setConfirmation]
  );

  const toggleSubmittedModal = useCallback(() => {
    setPending(false);
    setSubmitted((w: boolean) => !w);
  }, [setPending, setSubmitted]);

  return (
    <TransactionFlowContext.Provider
      value={{
        transactionFailed,
        pending,
        confirmation,
        rejected,
        submitted,
        toggleTransactionFailedModal,
        togglePendingModal,
        toggleRejectedModal,
        toggleConfirmationModal,
        toggleSubmittedModal,
      }}
    >
      {children}
    </TransactionFlowContext.Provider>
  );
}

const useTransactionFlow = () => {
  return useContext(TransactionFlowContext);
};

export { TransactionFlowStateProvider, useTransactionFlow };
