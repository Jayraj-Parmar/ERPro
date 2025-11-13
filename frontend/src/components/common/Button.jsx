function Button({ className, type, children, disabled, onClick, loading }) {
  return (
    <button
      className={`py-2 px-4 ${className}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
      loading={loading}
    >
      {loading ? (
        <div className="flex justify-center items-center">
          <span className="animate-spin border-2 border-t-transparent rounded-full w-4 h-4 mr-2"></span>
          Please wait...
        </div>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
