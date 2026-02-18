import React, { useEffect, useState } from "react";
import { getProducts } from "../services/apiProducts";
import { getUsers } from "../services/apiUsers";
import ProductList from "./ProductList";
import UserList from "./UserList";

const Dashboard = () => {
  const [productsData, setProductsData] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const [currentProductsPage, setCurrentProductsPage] = useState(1);
  const [currentUsersPage, setCurrentUsersPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts(currentProductsPage);
      setProductsData(data);
    };
    fetchProducts();
  }, [currentProductsPage]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers(currentUsersPage);
      setUsersData(data);
    };
    fetchUsers();
  }, [currentUsersPage]);

  if (!productsData || !usersData) return <p>Cargando datos...</p>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Dashboard</h1>

      {/* PANEL PRINCIPAL */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Productos</h5>
              <p className="card-text">{productsData.count}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Usuarios</h5>
              <p className="card-text">{usersData.count}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Último Producto</h5>
              <p className="card-text">
                {productsData.lastProduct?.name || "No hay productos"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PANEL CATEGORÍAS */}
      <div className="row mb-4">
        {Object.entries(productsData.countByCategory).map(
          ([category, count]) => (
            <div className="col-md-3" key={category}>
              <div className="card text-center">
                <div className="card-body">
                  <h6>{category}</h6>
                  <p>{count}</p>
                </div>
              </div>
            </div>
          ),
        )}
      </div>

      {/* PAGINACIÓN PRODUCTOS */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <button
          className="btn btn-secondary"
          onClick={() => setCurrentProductsPage((p) => Math.max(p - 1, 1))}
          disabled={currentProductsPage === 1}
        >
          Anterior
        </button>

        <span>
          Página {currentProductsPage} de {productsData.pagination.totalPages}
        </span>

        <button
          className="btn btn-secondary"
          onClick={() =>
            setCurrentProductsPage((p) =>
              Math.min(p + 1, productsData.pagination.totalPages),
            )
          }
          disabled={currentProductsPage === productsData.pagination.totalPages}
        >
          Siguiente
        </button>
      </div>

      <h3>Productos</h3>
      {productsData.products.length > 0 ? (
        <ProductList products={productsData.products} />
      ) : (
        <p>No hay productos disponibles</p>
      )}

      <hr />

      {/* PAGINACIÓN USUARIOS */}
      <div className="d-flex justify-content-between align-items-center mb-2 mt-4">
        <button
          className="btn btn-secondary"
          onClick={() => setCurrentUsersPage((p) => Math.max(p - 1, 1))}
          disabled={currentUsersPage === 1}
        >
          Anterior
        </button>

        <span>
          Página {currentUsersPage} de {usersData.pagination.totalPages}
        </span>

        <button
          className="btn btn-secondary"
          onClick={() =>
            setCurrentUsersPage((p) =>
              Math.min(p + 1, usersData.pagination.totalPages),
            )
          }
          disabled={currentUsersPage === usersData.pagination.totalPages}
        >
          Siguiente
        </button>
      </div>

      <h3>Usuarios</h3>
      {usersData.users.length > 0 ? (
        <UserList users={usersData.users} />
      ) : (
        <p>No hay usuarios registrados</p>
      )}
    </div>
  );
};

export default Dashboard;
