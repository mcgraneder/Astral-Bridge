import { createContext, useCallback, useContext, useState } from "react";

interface TxFilterProps {
  children: React.ReactNode;
}

type TxFilterContextType = {
  filteredChain: any;
  filteredType: any;
  filteredStatus: any;
  setFilteredChain: any;
  setFilteredType: any;
  setFilteredStatus: any;
  clearFilters: () => void
};

const TxFilterContext = createContext({} as TxFilterContextType);

function TransactionFilterStateProvider({ children }: TxFilterProps) {
const [filteredChain, setFilteredChain] = useState<any>("All Chains");
const [filteredType, setFilteredType] = useState<any>("All Types");
const [filteredStatus, setFilteredStatus] = useState<any>("All Statuses");

const clearFilters = useCallback(() => {
  setFilteredChain("All Chains");
  setFilteredStatus("All Statuses");
  setFilteredType("All Types");
}, [setFilteredChain, setFilteredStatus, setFilteredType]);

  return (
    <TxFilterContext.Provider
      value={{
        setFilteredChain,
        setFilteredType,
        setFilteredStatus,
        filteredChain,
        filteredStatus,
        filteredType,
        clearFilters,
      }}
    >
      {children}
    </TxFilterContext.Provider>
  );
}

const useTxFilterState = () => {
  return useContext(TxFilterContext);
};

export { TransactionFilterStateProvider, useTxFilterState };
