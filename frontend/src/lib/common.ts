export const isProduction =
  typeof window !== "undefined" &&
  (window.location.href.includes("localhost") ||
    window.location.href.includes("staging"))
    ? false
    : true;
