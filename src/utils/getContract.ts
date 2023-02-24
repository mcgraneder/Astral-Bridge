import { getAddress } from "@ethersproject/address";
import { AddressZero } from "@ethersproject/constants";
import { Contract } from "@ethersproject/contracts";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from '@web3-react/core';

const isAddress = (value: any): string | false => {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
};

const getSigner = (library: Web3Provider, account: string): JsonRpcSigner => {
  return library.getSigner(account).connectUnchecked();
};

const getProviderOrSigner = (
  library: Web3Provider,
  account?: string
): Web3Provider | JsonRpcSigner => {
  return account ? getSigner(library, account) : library;
};

const getContract = (
  address: string,
  ABI: any,
  library: Web3Provider,
  account?: string
): Contract => {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account) as any);
};

// export const returnContract = <contract extends Contract = Contract>(
//   tokenddress: string | undefined,
//   ABI: any,
//   withSignerIfPossible = true
// ): contract | null => {
//   //wont work
//   const { library: provider, account: address, chainId } = useWeb3React();
//   if (!tokenddress || !ABI || !provider || !chainId) return null;
//   try {
//     return getContract(
//       tokenddress,
//       ABI,
//       provider,
//       withSignerIfPossible && address ? address : undefined
//     ) as contract;
//   } catch (error) {
//     console.error("Failed to get contract", error);
//     return null;
//   }
// };

export default getContract;
