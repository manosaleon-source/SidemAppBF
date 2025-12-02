import React from 'react';
import { CartItem as Item } from '../../types/global.d';

interface Props {
  item: Item;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, qty: number) => void;
}

const CartItem: React.FC<Props> = ({ item, onRemove, onUpdateQuantity }) => {
  const price = item.price || 0;
  const quantity = item.quantity || 1;
  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center">
        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
        <div>
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-gray-600">${price.toFixed(2)} x {quantity}</p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <button type="button" className="px-2 py-1 bg-gray-200 rounded-l" onClick={() => onUpdateQuantity(item.id, Math.max(1, quantity - 1))}>-</button>
          <div className="px-3">{quantity}</div>
          <button type="button" className="px-2 py-1 bg-gray-200 rounded-r" onClick={() => onUpdateQuantity(item.id, quantity + 1)}>+</button>
        </div>
        <button onClick={() => onRemove(item.id)} className="text-red-500 hover:text-red-700">Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
