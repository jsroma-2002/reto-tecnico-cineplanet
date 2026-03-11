import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { processPayment, completeTransaction } from '../services/paymentService';
import PurchaseSuccessModal from '../components/PurchaseSuccessModal';
import '../styles/payment.css';

function Payment() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { items, total } = useAppSelector((state) => state.cart);

  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCvv] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [docType, setDocType] = useState('DNI');
  const [docNumber, setDocNumber] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [validated, setValidated] = useState(false);

  // Redirigir si el carrito está vacío
  useEffect(() => {
    if (items.length === 0) {
      navigate('/candystore', { replace: true });
    }
  }, [items.length, navigate]);

  // Precargar datos del usuario autenticado con Google
  useEffect(() => {
    if (isAuthenticated && user.name) {
      setName(user.name);
    }
    if (isAuthenticated && user.email) {
      setEmail(user.email);
    }
  }, [isAuthenticated, user]);

  const isCardValid = /^\d{16}$/.test(cardNumber);
  const isCvvValid = /^\d{3,4}$/.test(cvv);
  const isExpirationValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiration);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setValidated(true);
    setError('');

    if (!isCardValid || !isCvvValid || !isExpirationValid || !email || !name || !docNumber) {
      return;
    }

    setLoading(true);

    try {
      // 1. Procesar pago con PayU
      const paymentResult = await processPayment({
        cardNumber,
        cvv,
        expiration,
        amount: total,
      });

      if (paymentResult.status !== 'APPROVED') {
        setError('El pago fue rechazado. Intenta con otra tarjeta.');
        setLoading(false);
        return;
      }

      // 2. Registrar transacción en complete-service
      const completeResult = await completeTransaction({
        email,
        name,
        dni: docNumber,
        transactionId: paymentResult.transactionId,
        operationDate: paymentResult.operationDate,
      });

      if (completeResult.code === '0') {
        setShowSuccess(true);
      } else {
        setError('Error al registrar la transacción. Contacta soporte.');
      }
    } catch {
      setError('Ocurrió un error procesando tu pago. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-page">
      <h1 className="payment-title">💳 Datos de Pago</h1>

      <div className="payment-summary">
        <span>Total a pagar:</span>
        <span className="payment-summary__amount">S/{total.toFixed(2)}</span>
      </div>

      {error && <p className="payment-error">{error}</p>}

      <form
        className={`payment-form${validated ? ' was-validated' : ''}`}
        noValidate
        onSubmit={handleSubmit}
      >
        {/* Tarjeta */}
        <h5 className="payment-section-title">Tarjeta</h5>

        <div className="mb-3">
          <label htmlFor="cardNumber" className="form-label">Número de tarjeta</label>
          <input
            id="cardNumber"
            type="text"
            className={`form-control${validated && !isCardValid ? ' is-invalid' : ''}`}
            placeholder="4111111111111111"
            maxLength={16}
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
            required
          />
          <div className="invalid-feedback">Debe tener 16 dígitos</div>
        </div>

        <div className="row mb-3">
          <div className="col-6">
            <label htmlFor="expiration" className="form-label">Fecha expiración</label>
            <input
              id="expiration"
              type="text"
              className={`form-control${validated && !isExpirationValid ? ' is-invalid' : ''}`}
              placeholder="MM/YY"
              maxLength={5}
              value={expiration}
              onChange={(e) => setExpiration(e.target.value)}
              required
            />
            <div className="invalid-feedback">Formato MM/YY</div>
          </div>
          <div className="col-6">
            <label htmlFor="cvv" className="form-label">CVV</label>
            <input
              id="cvv"
              type="text"
              className={`form-control${validated && !isCvvValid ? ' is-invalid' : ''}`}
              placeholder="123"
              maxLength={4}
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
              required
            />
            <div className="invalid-feedback">3 o 4 dígitos</div>
          </div>
        </div>

        {/* Datos personales */}
        <h5 className="payment-section-title mt-4">Datos personales</h5>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo electrónico</label>
          <input
            id="email"
            type="email"
            className={`form-control${validated && !email ? ' is-invalid' : ''}`}
            placeholder="cliente@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="invalid-feedback">Campo obligatorio</div>
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre completo</label>
          <input
            id="name"
            type="text"
            className={`form-control${validated && !name ? ' is-invalid' : ''}`}
            placeholder="Juan Perez"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <div className="invalid-feedback">Campo obligatorio</div>
        </div>

        <div className="row mb-3">
          <div className="col-5">
            <label htmlFor="docType" className="form-label">Tipo de documento</label>
            <select
              id="docType"
              className="form-select"
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
            >
              <option value="DNI">DNI</option>
              <option value="CE">CE</option>
              <option value="PASAPORTE">Pasaporte</option>
            </select>
          </div>
          <div className="col-7">
            <label htmlFor="docNumber" className="form-label">Número de documento</label>
            <input
              id="docNumber"
              type="text"
              className={`form-control${validated && !docNumber ? ' is-invalid' : ''}`}
              placeholder="12345678"
              value={docNumber}
              onChange={(e) => setDocNumber(e.target.value.replace(/\D/g, ''))}
              required
            />
            <div className="invalid-feedback">Campo obligatorio</div>
          </div>
        </div>

        <button
          type="submit"
          className="payment-submit-btn mt-3"
          disabled={loading}
        >
          {loading ? 'Procesando...' : 'Pagar'}
        </button>
      </form>

      <PurchaseSuccessModal visible={showSuccess} />
    </div>
  );
}

export default Payment;
