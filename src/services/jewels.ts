import { httpClient } from "@wix/essentials";
import { Jewel } from "../types";

export const addJewel = async (item: Jewel) =>
  await httpClient.fetchWithAuth(`${import.meta.env.BASE_API_URL}/jewels`, {
    method: "POST",
    body: JSON.stringify({
      jewel: item,
    }),
  });
