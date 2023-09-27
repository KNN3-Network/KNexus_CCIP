import axios from "axios";

import { env, redashURL } from "../config/base";

export default async function log(
  event: string,
  address: string,
  option?: any,
) {
  return await axios.post(
    `${redashURL}/v1/trace`,
    option
      ? {
          app: env === "prod" ? "Knexus" : "Knexus-staging",
          event,
          address,
          url: window.location.href,
          column_0: option.toString(),
        }
      : {
          app: env === "prod" ? "Knexus" : "Knexus-staging",
          event,
          address,
          url: window.location.href,
        },
  );
}
