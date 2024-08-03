export const deleteProduct = async (id: string) => {
  const res = await fetch("api/seller/delete-product", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  const data = await res.json();

  return data;
};
