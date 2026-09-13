const API_URL = import.meta.env.VITE_API_URL;

export async function getAllProducts(token) {
  const response = await fetch(`${API_URL}/product/all`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch products");
  }
  return data;
}

export async function searchProducts(query, token) {
  const response = await fetch(
    `${API_URL}/product/search?q=${encodeURIComponent(query)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Search failed");
  }
  return data;
}
export async function getProduct(id, token) {
  const response = await fetch(`${API_URL}/product/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch the product");
  }
  return data;
}
export async function addProduct(productData, token) {
  const response = await fetch(`${API_URL}/product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add product");
  }
  return data;
}
export async function updateProduct(id, productData, token) {
  const response = await fetch(`${API_URL}/product/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update product");
  }
  return data;
}
export async function updateStock(id, change, token) {
  const response = await fetch(`${API_URL}/product/${id}/stock`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ change }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update stock");
  }
  return data;
}
export async function deleteProduct(id, token) {
  const response = await fetch(`${API_URL}/product/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || "Failed to delete product");
  }

  if (response.status === 204) return null;
  return response.json();
}
