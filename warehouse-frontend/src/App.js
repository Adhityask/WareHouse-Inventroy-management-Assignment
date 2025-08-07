import React from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import InventoryList from './components/InventoryList';
import TransactionForm from './components/TransactionForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const refresh = () => window.location.reload(); // Simple refresh for now

  return (
    <div className="container">
      <h2 className="text-center my-4">📦 Warehouse Inventory Tracker</h2>
      <ProductForm refresh={refresh} />
      <ProductList />
      <TransactionForm refresh={refresh} />
      <InventoryList />
    </div>
  );
}

export default App;
