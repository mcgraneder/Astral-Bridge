import { useState, useEffect, useCallback } from "react";
import BigNumber from "bignumber.js";
import { fetchPrice } from "../utils/market/fetchAssetPrice";

const useFetchAssetPrice = (asset: any) => {
  const [assetPrice, setAssetPrice] = useState<BigNumber | number | undefined>(
    0
  );

  const fetchAssetPrice = useCallback((): void => {
    (async () => {
      try {
        const assetPriceQuery = await fetchPrice(asset.Icon, "USD");
        const formattedObj = Object.values(assetPriceQuery);
        assetPriceQuery !== "API_FAILED"
          ? setAssetPrice(formattedObj[0].usd)
          : setAssetPrice(undefined);
      } catch (error) {
        console.error("failed fetch");
      }
    })();
  }, [setAssetPrice, asset]);

  useEffect(() => {
    if (!asset) return;
    fetchAssetPrice();
    const intervalId = setInterval(fetchAssetPrice, 30000);
    return () => clearInterval(intervalId);
  }, [fetchAssetPrice, asset]);

  return { assetPrice };
};

export default useFetchAssetPrice;
