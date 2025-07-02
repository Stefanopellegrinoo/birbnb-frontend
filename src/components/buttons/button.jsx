const Button = ({ onClick, disabled, children, className = "" }) => {
  return (
    <button onClick={onClick} disabled={disabled} className={`pagination-button ${className}`}>
      {children}
    </button>
  );
};
