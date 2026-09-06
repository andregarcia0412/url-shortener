import ring from "../assets/ring.svg";

type ButtonProps = {
  text: string;
  onClick: () => void;
  icon?: string;
  loading?: boolean;
};

export const Button = ({
  text,
  onClick,
  icon,
  loading = false,
}: ButtonProps) => {
  return (
    <button
      className={`bg-transparent border border-accent min-h-12 px-4 rounded-md text-accent hover:bg-accent/22 cursor-pointer ${
        loading ? "opacity-50" : ""
      }`}
      disabled={loading}
      onClick={onClick}
    >
      <div className="flex items-center justify-center gap-2">
        {loading ? (
          <img src={ring} width={24} height={24} alt="loading" />
        ) : (
          icon && <img src={icon} width={24} height={24} alt="icon" />
        )}
        <p>{text}</p>
      </div>
    </button>
  );
};
