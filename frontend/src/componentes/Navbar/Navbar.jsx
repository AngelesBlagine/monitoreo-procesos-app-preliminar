import './Navbar.css';

export function Navbar({ status = 'OFFLINE' }) { //Valor por default
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <span className="logo-icon">🛡️</span>
        <h2>NOMBREwebAPP</h2>
      </div>
      <div className="navbar-status">
        <span className={`status-indicator ${status.toLowerCase()}`}></span> {/* Recibe como parámetro el estado del servidor, sino se le pasa ninguno por default muestra off */}
        <span className="status-text">Servidor: {status}</span>
      </div>
    </header>
  );
}