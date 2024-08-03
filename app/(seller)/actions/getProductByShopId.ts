export const getProductByShopId = async (productId: string, shopId: string) => {
  try {
    const res = await fetch(
      `/api/seller/get-productByShopId?productId=${productId}&shopId=${shopId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch the product data");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
};
