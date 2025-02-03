import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-28 ">
      <nav className="p-5 font-medium text-xl flex items-center gap-2">
        <Image src="/book.svg" alt="Book icon" width={25} height={25} />
        Book Keeper
      </nav>
      <div className="grid grid-cols-2 max-xl:grid-cols-1 items-center gap-10 mt-10">
        <div className="flex flex-col gap-4 p-5 max-xl:text-center max-xl:items-center">
          <span className="font-bold md:text-4xl text-3xl">
            Welcome to the Live Demo of <br />
          </span>
          <span className="md:text-5xl text-4xl text-white bg-black p-5 rounded-xl font-bold">
            Simple Book Management!
          </span>
          <p className="w-[90%] max-xl:w-[70%] max-md:w-[90%]">
            Explore how this system streamlines managing books effortlessly with
            an intuitive and user-friendly interface. Let&apos;s dive in!
          </p>
          <Link
            href="/dashboard"
            className="border-2 border-black rounded-lg py-3 px-5 text-xl font-medium mt-3
        hover:scale-105 active:scale-100 duration-150 transition-transform ease-in 
        hover:shadow-lg text-center lg:w-[50%]"
          >
            Get Started
          </Link>
        </div>
        <div>
          <Image
            src="/heroDesktop.webp"
            alt="Screenshots of dashboard and other pages"
            width={500}
            height={600}
            className="object-contain max-md:hidden max-xl:mx-auto"
          />
          <Image
            src="/heroMobile.webp"
            alt="Screenshots of dashboard and other pages"
            width={500}
            height={600}
            className="object-contain hidden max-md:block max-md:mx-auto"
          />
        </div>
      </div>
      <footer className="text-center mt-20 mb-10 flex flex-col gap-2">
        Copyright &copy; 2025 Dounhuward B. Caparas
        <span>All Rights Reserved.</span>
      </footer>
    </div>
  );
};

export default Home;
