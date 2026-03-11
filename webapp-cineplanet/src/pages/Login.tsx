import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loginSuccess, loginGuest } from '../features/auth/authSlice';
import WelcomeModal from '../components/WelcomeModal';
import '../styles/login.css';

/** Decodifica el payload JWT de Google (sin verificar firma, solo lectura del ID token) */
function decodeJwtPayload(token: string): Record<string, string> {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const json = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join(''),
  );
  return JSON.parse(json);
}

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isGuest, user } = useAppSelector((state) => state.auth);

  const [showWelcome, setShowWelcome] = useState(false);

  // Si ya está autenticado o es invitado, redirigir a /candystore
  useEffect(() => {
    if (isAuthenticated || isGuest) {
      navigate('/candystore', { replace: true });
    }
  }, [isAuthenticated, isGuest, navigate]);

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) return;

    const payload = decodeJwtPayload(credentialResponse.credential);

    dispatch(
      loginSuccess({
        name: payload.name || '',
        email: payload.email || '',
        picture: payload.picture || '',
      }),
    );

    setShowWelcome(true);
  };

  const handleGuest = () => {
    dispatch(loginGuest());
    navigate('/candystore');
  };

  const handleAcceptWelcome = () => {
    setShowWelcome(false);
    navigate('/candystore');
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card__logo">🎬</div>
        <h1 className="login-card__title">Cineplanet</h1>
        <p className="login-card__subtitle">Inicia sesión para continuar</p>

        <div className="login-google-wrapper">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.error('Error en login de Google')}
            text="signin_with"
            shape="rectangular"
            width="300"
          />
        </div>

        <div className="login-divider">o</div>

        <button className="btn-guest" onClick={handleGuest}>
          Continuar como Invitado
        </button>
      </div>

      {showWelcome && (
        <WelcomeModal
          name={user.name}
          picture={user.picture}
          onAccept={handleAcceptWelcome}
        />
      )}
    </div>
  );
}

export default Login;
