import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="card p-3 my-3">
      <h4>Products</h4>
      <ul className="list-group">
        {products.map((p) => (
          <li key={p.product_id} className="list-group-item">
            <strong>{p.name}</strong> ({p.sku}) - {p.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
