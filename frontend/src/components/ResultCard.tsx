import { Button } from "./Button";
import copy from "../assets/copy.svg";
import { TextButton } from "./TextButton";

type ResultCardProps = {
  url: string;
  onReturnClick: () => void;
};

export const ResultCard = ({ url, onReturnClick }: ResultCardProps) => {
  return (
    <article className="flex flex-col p-4 gap-2 bg-surface border rounded-xl border-neutral-800">
      <p className="text-xs text-accent">YOUR SHORT LINK</p>

      <div className="flex items-center justify-between">
        <h2 className="text-accent-300 text-2xl">{url}</h2>
        <Button
          text="Copy"
          onClick={async () => await navigator.clipboard.writeText(url)}
          icon={copy}
        />
      </div>

      <TextButton text="Shorten another" onClick={onReturnClick} />
    </article>
  );
};
