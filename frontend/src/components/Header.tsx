import chain from "../assets/chain.svg";

export const Header = () => {
  return (
    <header className="flex items-center gap-3 bg-bg p-4">
      <img
        src={chain}
        draggable={false}
        className="select-none h-6 w-6"
        alt="logo"
      />
      <span className="text-xl leading-none text-ink select-none [text-box:trim-both_cap_alphabetic]">
        ShortyURL
      </span>
    </header>
  );
};
