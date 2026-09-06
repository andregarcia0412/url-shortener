import alert from "../assets/alert.svg";

type ErrorMessageProps = {
  message: string;
};

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="flex items-center gap-2">
      <img src={alert} height={14} width={14} />
      <p className="text-accent-300 text-xs">{message}</p>
    </div>
  );
};