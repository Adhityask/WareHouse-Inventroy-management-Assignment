import React, { useState } from 'react';
import { createProduct } from '../services/api';

const ProductForm = ({ refresh }) => {
  const [form, setForm] = useState({ name: '', sku: '', description: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProduct(form);
    alert('Product added!');
    setForm({ name: '', sku: '', description: '' });
    refresh();
  };

  return (
    <div className="card p-3 my-3">
      <h4>Add Product</h4>
      <form onSubmit={handleSubmit}>
        <input className="form-control my-1" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input className="form-control my-1" name="sku" placeholder="SKU" value={form.sku} onChange={handleChange} required />
        <input className="form-control my-1" name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <button className="btn btn-primary mt-2">Add</button>
      </form>
    </div>
  );
};

export default ProductForm;
