function Button({ className, type, children, disabled }) {
  return (
    <button className={className} type={type} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
