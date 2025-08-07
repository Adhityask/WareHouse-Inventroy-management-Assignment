import React, { useEffect, useState } from 'react';
import { createTransaction, fetchProducts } from '../services/api';

const TransactionForm = ({ refresh }) => {
  const [products, setProducts] = useState([]);
  const [reference_note, setNote] = useState('');
  const [transaction_type, setType] = useState('IN');
  const [items, setItems] = useState([{ product: '', quantity: '' }]);

  useEffect(() => {
    fetchProducts().then((res) => setProducts(res.data));
  }, []);

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addItem = () => setItems([...items, { product: '', quantity: '' }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      transaction_type,
      reference_note,
      details: items.map((i) => ({
        product: parseInt(i.product),
        quantity: parseInt(i.quantity),
      })),
    };
    await createTransaction(payload);
    alert('Transaction added!');
    setNote('');
    setType('IN');
    setItems([{ product: '', quantity: '' }]);
    refresh();
  };

  return (
    <div className="card p-3 my-3">
      <h4>Add Transaction</h4>
      <form onSubmit={handleSubmit}>
        <select className="form-control my-1" value={transaction_type} onChange={(e) => setType(e.target.value)}>
          <option value="IN">IN</option>
          <option value="OUT">OUT</option>
        </select>
        {items.map((item, idx) => (
          <div className="row" key={idx}>
            <div className="col">
              <select className="form-control my-1" value={item.product} onChange={(e) => handleItemChange(idx, 'product', e.target.value)}>
                <option value="">Select Product</option>
                {products.map((p) => (
                  <option key={p.product_id} value={p.product_id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div className="col">
              <input className="form-control my-1" type="number" placeholder="Quantity" value={item.quantity} onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)} />
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-secondary my-2" onClick={addItem}>Add Item</button>
        <input className="form-control my-1" placeholder="Reference Note" value={reference_note} onChange={(e) => setNote(e.target.value)} />
        <button className="btn btn-success mt-2">Submit</button>
      </form>
    </div>
  );
};

export default TransactionForm;
