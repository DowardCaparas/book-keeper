import Link from "next/link";

const Home = () => {
  return (
    <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-28 ">
      <nav className="p-5 font-medium text-xl">Book Keeper</nav>
      <div className="flex items-center flex-col gap-4 text-center p-5 mt-16">
        <span className="font-bold text-4xl">
          Welcome to the Live Demo of <br />
        </span>
        <span className="text-5xl text-white bg-black p-5 rounded-xl font-bold">
          Simple Book Management!
        </span>
        <p className="md:w-[45%] w-[80%]">
          Explore how this system streamlines managing books effortlessly with
          an intuitive and user-friendly interface. Let&apos;s dive in!
        </p>
        <Link
        href="/dashboard"
        className="border-2 border-black rounded-lg py-3 px-5 text-xl font-medium mt-3
        hover:scale-105 active:scale-100 duration-150 transition-transform ease-in 
        hover:shadow-lg"
      >
        Get Started
      </Link>
      </div>
    </div>
  );
};

export default Home;
