import Image from "next/image";
import Link from "next/link";

const InsertButton = ({
  pageName,
  innerText,
}: {
  pageName: string;
  innerText: string;
}) => {
  return (
    <Link
      href={`/dashboard/${pageName}/create`}
      className="bg-black px-5 py-3 rounded-lg inline-flex gap-2"
    >
      <Image
        src="/plus.svg"
        alt="search icon"
        width={20}
        height={20}
      />
      <span className="text-white font-medium text-sm">{innerText}</span>
    </Link>
  );
};

export default InsertButton;
