function Button({ className, type, children, disabled, onClick }) {
  return (
    <button
      className={`py-2 px-4 mt-5 ${className}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
