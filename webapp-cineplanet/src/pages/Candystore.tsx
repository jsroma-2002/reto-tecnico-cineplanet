import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchCandystoreProducts } from '../features/candystore/candystoreSlice';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import '../styles/candystore.css';

function Candystore() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isGuest } = useAppSelector((state) => state.auth);
  const { loading, products, error } = useAppSelector((state) => state.candystore);

  // Redirigir si no está autenticado ni es invitado
  useEffect(() => {
    if (!isAuthenticated && !isGuest) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, isGuest, navigate]);

  useEffect(() => {
    dispatch(fetchCandystoreProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="container mt-4">
        <p className="candystore-loading">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <p className="candystore-error">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="candystore-title">🍿 Dulcería</h1>
      <div className="candystore-layout">
        <div className="candystore-products">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="candystore-sidebar">
          <Cart />
        </div>
      </div>
    </div>
  );
}

export default Candystore;
