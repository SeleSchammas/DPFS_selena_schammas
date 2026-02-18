const BASE_URL = "http://localhost:3000/api/users";

export const getUsers = async (page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}?page=${page}`);
    if (!response.ok) throw new Error("Error al cargar usuarios");
    const data = await response.json();
    // Asegurarnos de que siempre tenga pagination
    return {
      count: data.count || 0,
      users: data.users || [],
      pagination: data.pagination || { totalPages: 1, current: 1 },
    };
  } catch (error) {
    console.error(error);
    return { count: 0, users: [], pagination: { totalPages: 1, current: 1 } };
  }
};
