import { Link } from "@tanstack/react-router";

export default function LandingPage() {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <div className="shrink-0">
        <h1>
          {/* todo: add Link to '/donuts' (replace the to-property) */}
          <Link
            to={"/donuts"}
            className="text-sprinkleBlue font-fredoka flex justify-center text-6xl tracking-wider no-underline hover:text-pink-400 hover:underline hover:underline-offset-8 md:text-8xl"
          >
            Donutigram
          </Link>
        </h1>
      </div>

      <div className="shrink-0">
        <h2 className="font-caveat text-center text-4xl font-bold text-pink-700 md:text-6xl">
          From devs to donuts ... commit to the hole.
        </h2>
      </div>
      <div className="mt-8 shrink-0">
        <h2 className="font-caveat text-center text-4xl font-bold text-pink-700 md:text-6xl">
          "<span className={"text-brown"}>Donuts</span> is the new{" "}
          <span className={"text-brown"}>Insta</span>" (Mickey Mouse)
        </h2>
      </div>

      <div className="flex min-h-0 flex-grow items-center justify-center overflow-hidden">
        <div className="h-full w-full bg-[url('/images/d-icon.png')] bg-contain bg-center bg-no-repeat" />
      </div>

      <div className="mb-8 shrink-0">
        <h2 className="font-caveat mb-2 text-center text-4xl font-bold text-pink-700 md:text-6xl">
          Built with React, boosted by TanStack 🤤
        </h2>
      </div>
    </div>
  );
}
