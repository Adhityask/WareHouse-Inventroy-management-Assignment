import React, { useState, useEffect } from 'react';
import { getProducts, addTransaction } from '../services/api';

function AddTransaction() {
  const [type, setType] = useState('IN');
  const [products, setProducts] = useState([]);
  const [details, setDetails] = useState([{ product: '', quantity: 0 }]);
  const [note, setNote] = useState('');

  useEffect(() => {
    getProducts().then((res) => setProducts(res.data));
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...details];
    updated[index][field] = value;
    setDetails(updated);
  };

  const addRow = () => setDetails([...details, { product: '', quantity: 0 }]);

  const submit = () => {
    const payload = {
      transaction_type: type,
      reference_note: note,
      details: details.map((d) => ({
        product: parseInt(d.product),
        quantity: parseInt(d.quantity)
      })),
    };

    addTransaction(payload)
      .then(() => alert("Transaction added!"))
      .catch((err) => console.error(err.response?.data || err));
  };

  return (
    <div>
      <h4>➕ Add Transaction</h4>
      <div className="form-group">
        <label>Type</label>
        <select className="form-control" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="IN">IN</option>
          <option value="OUT">OUT</option>
        </select>
      </div>

      {details.map((d, i) => (
        <div className="form-row" key={i}>
          <div className="col">
            <select className="form-control" value={d.product} onChange={(e) => handleChange(i, 'product', e.target.value)}>
              <option value="">Select Product</option>
              {products.map(p => (
                <option key={p.product_id} value={p.product_id}>
                  {p.name} ({p.sku})
                </option>
              ))}
            </select>
          </div>
          <div className="col">
            <input type="number" className="form-control" value={d.quantity} onChange={(e) => handleChange(i, 'quantity', e.target.value)} />
          </div>
        </div>
      ))}

      <button className="btn btn-link" onClick={addRow}>+ Add More</button>

      <div className="form-group">
        <label>Reference Note</label>
        <textarea className="form-control" value={note} onChange={(e) => setNote(e.target.value)} />
      </div>

      <button className="btn btn-primary" onClick={submit}>Submit Transaction</button>
    </div>
  );
}

export default AddTransaction;
