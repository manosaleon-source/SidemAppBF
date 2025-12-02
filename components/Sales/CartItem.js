import React from 'react';

const CartItem = ({ item, onRemove }) => {
  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center">
        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
        <div>
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-gray-600">${(item.price || 0).toFixed(2)} x {item.quantity}</p>
        </div>
      </div>
      <button 
        onClick={() => onRemove(item.id)} 
        className="text-red-500 hover:text-red-700"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;