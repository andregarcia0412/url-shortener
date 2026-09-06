type TextButtonProps = {
  text: string;
  onClick: () => void;
};

export const TextButton = ({ text, onClick }: TextButtonProps) => {
  return (
    <button
      className="text-accent bg-transparent border-none cursor-pointer hover:underline max-w-fit"
      onClick={onClick}
    >
      {text}
    </button>
  );
};
