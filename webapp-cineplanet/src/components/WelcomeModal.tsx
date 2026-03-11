import '../styles/login.css';

interface WelcomeModalProps {
  name: string;
  picture: string;
  onAccept: () => void;
}

function WelcomeModal({ name, picture, onAccept }: WelcomeModalProps) {
  return (
    <div className="welcome-overlay">
      <div className="welcome-modal">
        {picture && (
          <img
            src={picture}
            alt={name}
            className="welcome-modal__avatar"
            referrerPolicy="no-referrer"
          />
        )}
        <h2 className="welcome-modal__title">Bienvenido {name}</h2>
        <button className="btn btn-primary welcome-modal__btn" onClick={onAccept}>
          Aceptar
        </button>
      </div>
    </div>
  );
}

export default WelcomeModal;
