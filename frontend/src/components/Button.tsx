type ButtonProps = {
  onClick: () => void;
  loading?: boolean;
};

export const Button = ({ onClick, loading = false }: ButtonProps) => {
  return (
    <button
      className={`bg-transparent border border-accent min-h-12 px-4 rounded-md text-accent hover:bg-accent/22 cursor-pointer ${
        loading ? "opacity-50" : ""
      }`}
      disabled={loading}
      onClick={onClick}
    >
      Shorten
    </button>
  );
};
