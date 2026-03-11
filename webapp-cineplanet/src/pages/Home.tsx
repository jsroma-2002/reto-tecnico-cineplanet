import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchPremieres } from '../features/premieres/premieresSlice';
import PremiereCard from '../components/PremiereCard';
import '../styles/home.css';

function Home() {
  const dispatch = useAppDispatch();
  const { loading, premieres, error } = useAppSelector((state) => state.premieres);

  useEffect(() => {
    dispatch(fetchPremieres());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="container mt-4">
        <p className="home-loading">Cargando estrenos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <p className="home-error">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="home-title">Estrenos</h1>
      <div className="premieres-list">
        {premieres.map((premiere) => (
          <PremiereCard key={premiere.id} premiere={premiere} />
        ))}
      </div>
    </div>
  );
}

export default Home;
