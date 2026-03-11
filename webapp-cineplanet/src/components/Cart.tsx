import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from '../features/cart/cartSlice';
import { useState } from 'react';

function Cart() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, total } = useAppSelector((state) => state.cart);
  const [emptyMsg, setEmptyMsg] = useState(false);

  const handleContinue = () => {
    if (items.length === 0) {
      setEmptyMsg(true);
      return;
    }
    navigate('/payment');
  };

  return (
    <div className="cart">
      <h2 className="cart__title">Carrito</h2>

      {items.length === 0 ? (
        <p className="cart__empty">Tu carrito está vacío</p>
      ) : (
        <ul className="cart__list">
          {items.map((item) => (
            <li key={item.id} className="cart__item">
              <div className="cart__item-info">
                <span className="cart__item-name">{item.name}</span>
                <div className="cart__item-controls">
                  <button
                    className="cart__qty-btn"
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <span className="cart__qty">{item.quantity}</span>
                  <button
                    className="cart__qty-btn"
                    onClick={() => dispatch(increaseQuantity(item.id))}
                  >
                    +
                  </button>
                </div>
                <span className="cart__item-subtotal">
                  S/{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
              <button
                className="cart__remove-btn"
                onClick={() => dispatch(removeFromCart(item.id))}
                title="Eliminar"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="cart__footer">
        <div className="cart__total">
          <span>TOTAL:</span>
          <span>S/{total.toFixed(2)}</span>
        </div>

        {emptyMsg && (
          <p className="cart__warning">Debes agregar al menos un producto</p>
        )}

        <button className="btn btn-primary cart__continue-btn" onClick={handleContinue}>
          Continuar
        </button>
      </div>
    </div>
  );
}

export default Cart;
