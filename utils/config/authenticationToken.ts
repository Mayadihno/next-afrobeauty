import { getItem } from "./getItems";

export async function useAuthentication(config: any) {
  const token = await getItem("sessionToken");

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
}
