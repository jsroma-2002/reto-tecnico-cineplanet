import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { clearCart } from '../features/cart/cartSlice';

interface Props {
  visible: boolean;
}

function PurchaseSuccessModal({ visible }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!visible) return null;

  const handleAccept = () => {
    dispatch(clearCart());
    navigate('/', { replace: true });
  };

  return (
    <div className="modal d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content text-center p-4">
          <div className="modal-body">
            <h4 className="mb-3">🎉 Compra realizada con éxito</h4>
            <p className="mb-4">Gracias por tu compra</p>
            <button className="btn btn-primary px-4" onClick={handleAccept}>
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchaseSuccessModal;
