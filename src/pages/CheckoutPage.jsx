import React from "react";
import { useLocation } from "react-router-dom";

export default function CheckoutPage() {
  const location = useLocation();
  const cart = location.state?.cart || []; // Получаем данные корзины из состояния

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.count,
    0
  );

  return (
    <div className="">
      <div className="order-summary">
        <h2>Order Summary</h2>
        {cart.map((item, index) => (
          <div key={index}>
            <p>{item.name}</p>
            <p>{item.type}</p>
            <p>{item.syrup}</p>
            <p> {item.addon}</p>

            <p>
              {item.count} x ${item.price}
            </p>
            <p>-------------</p>
          </div>
        ))}

        <h3>Total: ${totalAmount.toFixed(2)}</h3>
        <div>тутуту пупупу оплата</div>
      </div>
    </div>
  );
}
