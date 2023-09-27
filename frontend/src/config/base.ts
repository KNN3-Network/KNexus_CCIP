export const isProduction =
  typeof window !== "undefined" &&
  (window.location.href.includes("localhost") ||
    window.location.href.includes("staging"))
    ? false
    : true;

export const baseURL = isProduction
  ? "https://knn3-gateway.knn3.xyz/knexus-backend-v2"
  : "https://knn3-gateway-test.api.knn3.xyz/knexus-backend";

export const knexusContractAddress = isProduction
  ? "0xbc99b4bba14a24827a31d5453abc0be916a8f4af"
  : "0x7be8f0e47f8514e1084f9ce7d88454662fb27617";

export const usdtContractAddress = isProduction
  ? "0xc2132d05d31c914a87c6611c10748aeb04b58e8f"
  : "0xd93658903f051092fc065415e721df6f57fbe9bb";

export const earnAddress = isProduction
  ? "0x6f4a6c45A96ff9396E579ccE7b1713FF72A7289b"
  : "0xE37917d6D650Edf014893e7cF8F7dC0D68D45E5e";

export const siteName = isProduction
  ? "https://knexus.xyz"
  : "https://knexus.staging.knn3.xyz";

export const redashURL = "https://lens-api.knn3.xyz/api";

export const versionConfig = "v1.1";

export const env = isProduction ? "prod" : "staging";
