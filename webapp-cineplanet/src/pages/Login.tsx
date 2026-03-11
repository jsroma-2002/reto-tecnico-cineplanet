import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="container mt-4 text-center">
      <h1>Login</h1>
      <p>Página en construcción</p>
      <Link to="/" className="btn btn-outline-primary mt-3">
        Volver al inicio
      </Link>
    </div>
  );
}

export default Login;
