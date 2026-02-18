const BASE_URL = "http://localhost:3000/api/products";

export const getProducts = async (page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}?page=${page}`);
    if (!response.ok) throw new Error("Error al cargar productos");
    const data = await response.json();
    // Asegurarnos de que siempre tenga pagination
    return {
      count: data.count || 0,
      products: data.products || [],
      lastProduct: data.lastProduct || null,
      countByCategory: data.countByCategory || {},
      pagination: data.pagination || { totalPages: 1, current: 1 },
    };
  } catch (error) {
    console.error(error);
    return {
      count: 0,
      products: [],
      lastProduct: null,
      countByCategory: {},
      pagination: { totalPages: 1, current: 1 },
    };
  }
};
