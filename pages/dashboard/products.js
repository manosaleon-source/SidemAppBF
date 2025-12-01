import { useEffect, useState } from 'react';
import { getProducts } from '../../../services/api/products';
import DashboardLayout from '../../../components/DashboardLayout';
import ProductList from '../../../components/Sales/ProductList';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ProductList products={products} />
    </DashboardLayout>
  );
};

export default ProductsPage;