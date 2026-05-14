import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import FilterBar from '../components/inventory/FilterBar';
import ProductTable from '../components/inventory/ProductTable';
import ProductModal from '../components/inventory/ProductModal';
import { categories } from '../data/products';
import LoadingSkeleton from '../components/shared/LoadingSkeleton';

export default function InventoryPage() {
  const { data: products, loading, refetch } = useFetch(api.getProducts);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category ? p.category === category : true;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  const handleAddClick = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await api.deleteProduct(id);
      refetch();
    }
  };

  const handleSave = async (productData) => {
    if (editingProduct) {
      await api.updateProduct(editingProduct.id, productData);
    } else {
      await api.addProduct(productData);
    }
    setIsModalOpen(false);
    refetch();
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <FilterBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        categories={categories}
        onAddClick={handleAddClick}
      />

      {loading ? (
        <LoadingSkeleton height="400px" rounded="16px" />
      ) : (
        <ProductTable products={filteredProducts} onEdit={handleEditClick} onDelete={handleDelete} />
      )}

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={editingProduct}
        onSave={handleSave}
        categories={categories}
      />
    </motion.div>
  );
}
