import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <Image src="/face-frown.svg" alt="sad face" width={25} height={25} />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested customer.</p>
      <Link
        href="/dashboard/customers"
        className="mt-4 rounded-md bg-black px-4 py-2 text-sm text-white transition-colors hover:shadow-md"
      >
        Go Back
      </Link>
    </main>
  );
}
