import React, { useEffect, useState } from 'react';
import { getProducts } from '../../services/api/products';
import { useCart } from '../../hooks/useCart';
import { Product } from '../../types/global.d';

interface Props {
  products?: Product[];
}

const ProductList: React.FC<Props> = ({ products: initialProducts }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts || []);
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(!initialProducts);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (!initialProducts) fetchProducts();
  }, [initialProducts]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="product-list">
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            {product.stock !== undefined && <p>Stock: {product.stock}</p>}
            <p>Price: ${product.price}</p>
            <button onClick={() => addToCart({ ...product, quantity: 1 })} className="mt-2 bg-green-500 text-white px-3 py-1 rounded">Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
