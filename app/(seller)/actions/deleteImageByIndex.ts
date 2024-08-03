export const deleteImageByIndex = async (
  index: number,
  id: string,
  shopId: string
) => {
  try {
    const res = await fetch("/api/seller/delete-productImage", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, index, shopId }),
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};
