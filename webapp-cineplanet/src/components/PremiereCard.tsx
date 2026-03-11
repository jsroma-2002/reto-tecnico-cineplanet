import { useNavigate } from 'react-router-dom';
import type { Premiere } from '../features/premieres/premieresService';

interface PremiereCardProps {
  premiere: Premiere;
}

function PremiereCard({ premiere }: PremiereCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <div className="premiere-card" onClick={handleClick}>
      <img
        className="premiere-card__image"
        src={premiere.imageUrl}
        alt={premiere.title}
      />
      <div className="premiere-card__info">
        <h3 className="premiere-card__title">{premiere.title}</h3>
        <p className="premiere-card__description">{premiere.description}</p>
      </div>
    </div>
  );
}

export default PremiereCard;
