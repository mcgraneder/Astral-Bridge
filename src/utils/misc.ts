export const shortenAddress = (d: any, offset: number = 5) => {
  return `${d?.substring(0, offset)}...${d?.substring(d?.length - offset, d?.length)}`;
};

export function isProduction() {
  return process.env.NEXT_PUBLIC_ENVIRONMENT === "production";
}

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getValueOrNull = (param: any) => param ?? null;


export const toPlainNumber = (n: string | number) => {
  return (+n).toLocaleString("fullwide", { useGrouping: false, maximumFractionDigits: 20 });
};

export const toTitleCase = (s: string) => {
  if (!s || s === "") return "";
  return s[0]?.toUpperCase() + s.substring(1);
};

export const toFixed = (n: number | string, precision = 4) => {
  if (n === undefined || n === null || isNaN(Number(n))) return n;
  n = Number(n)
  let p = 10 ** precision;
  let preciseNumber: number | string = Math.trunc(n * p) / p;
  if (preciseNumber === 0) {
    p = 10 ** (precision + 2);
    preciseNumber = Math.trunc(n * p) / p;
  }
  let preciseNumberAsString = preciseNumber.toString();
  if (!preciseNumberAsString.includes(".")) {
    preciseNumber = preciseNumber + ".00";
  }
  if (preciseNumberAsString.includes(".") && preciseNumberAsString.split(".")[1]?.length! === 1) {
    preciseNumber = preciseNumber + "0";
  }
  return preciseNumber;
};

///This function makes sure s string never overflows more the passed precision digits
export const inputToFixed = (s: string, precision = 6) => {
  //Check for decimal portion
  const inputPortions = s.split(".") ?? [];
  //If decimal portion is there and it has more than 6 digits ,then limit 6 digits
  if (inputPortions.length > 1 && inputPortions[1]?.length! > precision) {
    return toFixed(Number(s), precision);
  }
  return s;
};

export const formatFiat = (value: number, fiat = "USD") => {
  const locale = "en-US";
  return new Intl.NumberFormat(locale, {
    currency: fiat,
    style: "currency",
  }).format(value);
};

export const validateCatIdInput = (id: string) => {
  if (id.length <= 20 && /^[a-z0-9]*$/.test(id)) {
    return true;
  }
  return false;
};

export const getReadableDateAndTime = (timestamp: number) => {
  const readableDate = new Date(timestamp).toLocaleDateString("en-GB");
  const time = new Date(timestamp).toLocaleTimeString("en-GB");

  return { readableDate, time };
};

export const removePaddedZerosInAddress = (address: string) => {
  if (address.length === 42) return address;
  return address.slice(0, 2) + address.slice(26);
};

export async function copyText(text: string) {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
  } else {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    document.execCommand("copy");
    document.body.removeChild(textArea);
  }
}

export function formatHighValues(n: number) {
  if (n === null || n === undefined) return;

  let million = 1000000;
  let billion = 1000000000;
  let hundredK = 100000;

  if (n < hundredK) {
    return toFixed(n, 2);
  } else if (n < million) {
    return toFixed(n / 1000, 2) + "k";
  } else if (n < billion) {
    return toFixed(n / million, 2) + "m";
  } else {
    return toFixed(n / billion, 2) + "b";
  }
}

//
