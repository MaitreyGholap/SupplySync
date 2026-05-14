import { useState, useEffect } from 'react';
import Modal from '../shared/Modal';
import Button from '../shared/Button';

export default function ProductModal({ isOpen, onClose, product, onSave, categories }) {
  const [formData, setFormData] = useState({
    name: '', sku: '', category: '', quantity: 0, minStock: 0, maxStock: 0, price: 0
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({ name: '', sku: '', category: categories[0] || '', quantity: 0, minStock: 0, maxStock: 0, price: 0 });
    }
  }, [product, categories, isOpen]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={product ? 'Edit Product' : 'Add New Product'} maxWidth="600px">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>Product Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-glass" required />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>SKU</label>
            <input type="text" name="sku" value={formData.sku} onChange={handleChange} className="input-glass" required />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="input-glass" required>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>Unit Price (₹)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} className="input-glass" min="0" required />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>Current Qty</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="input-glass" min="0" required />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>Min Stock</label>
            <input type="number" name="minStock" value={formData.minStock} onChange={handleChange} className="input-glass" min="0" required />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>Max Stock</label>
            <input type="number" name="maxStock" value={formData.maxStock} onChange={handleChange} className="input-glass" min="0" required />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary">Save Product</Button>
        </div>
      </form>
    </Modal>
  );
}
