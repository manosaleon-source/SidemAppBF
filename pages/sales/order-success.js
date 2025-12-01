import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '../../components/common/Button';

const OrderSuccess = () => {
  const router = useRouter();

  const handleContinueShopping = () => {
    router.push('/sales/cart');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">¡Gracias por tu compra!</h1>
      <p className="mb-6">Tu pedido ha sido procesado con éxito.</p>
      <Button onClick={handleContinueShopping}>Continuar comprando</Button>
    </div>
  );
};

export default OrderSuccess;