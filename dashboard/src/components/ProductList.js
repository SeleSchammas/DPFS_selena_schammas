import React from "react";

const ProductList = ({ products }) => {
  if (!products || products.length === 0)
    return <p>No hay productos disponibles</p>;

  return (
    <div className="row">
      {products.map((product) => (
        <div key={product.id} className="col-md-4 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">Precio: ${product.price}</p>
              <p className="card-text">Categorías: {product.categories}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
