import React, { useEffect, useState } from 'react';
import { fetchInventory } from '../services/api';

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);

  const getInventory = () => {
    fetchInventory().then((res) => setInventory(res.data));
  };

  useEffect(() => {
    getInventory();
  }, []);

  return (
    <div className="card p-3 my-3">
      <h4>Current Inventory</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Product</th>
            <th>SKU</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, idx) => (
            <tr key={idx}>
              <td>{item.name}</td>
              <td>{item.sku}</td>
              <td>{item.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryList;
