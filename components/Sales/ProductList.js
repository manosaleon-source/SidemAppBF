import React, { useEffect, useState } from 'react';
import { getProducts } from '../../services/api/products';
import { useCart } from '../../hooks/useCart';

const ProductList = ({ products: initialProducts }) => {
  const [products, setProducts] = useState(initialProducts || []);
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(!initialProducts);
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

    if (!initialProducts) fetchProducts();
  }, [initialProducts]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="product-list">
      <h2>Product List</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            {product.stock !== undefined && <p>Stock: {product.stock}</p>}
            <p>Price: ${product.price}</p>
            <button
              onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image || '', quantity: 1 })}
              className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
            >
              Add to Cart
            </button>
            {/* Optionally add an Add to Cart button in future */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;