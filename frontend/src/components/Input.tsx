type InputProps = {
  text: string;
  setText: (text: string) => void;
};

export const Input = ({ text, setText }: InputProps) => {
  return (
    <input
      className="flex items-center text-ink outline-none px-3 min-h-12 rounded-md bg-surface border border-divider hover:border-divider-hover focus:border-accent"
      type="text"
      placeholder="https://example.com/a/very/long/path"
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
};
