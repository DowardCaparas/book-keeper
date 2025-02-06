import { clsx } from "clsx";
import Image from "next/image";

const SubmitButton = ({
  isPending,
  innerText,
  innerText2,
}: {
  isPending: boolean;
  innerText: string;
  innerText2: string;
}) => {
  return (
    <button
      type="submit"
      className={clsx("bg-black text-white p-3 rounded-lg", {
        "bg-opacity-95 cursor-not-allowed": isPending,
      })}
      disabled={isPending}
    >
      {isPending ? (
        <div className="flex gap-1 items-center justify-center text-sm">
          <Image src="/spinner.svg" alt="spinner" width={24} height={24} />{" "}
          {innerText2}...
        </div>
      ) : (
        <span className="text-sm">{innerText}</span>
      )}
    </button>
  );
};

export default SubmitButton;
