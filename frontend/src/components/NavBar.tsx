import { Link } from "@tanstack/react-router";

export default function NavBar() {
  return (
    <nav
      className={
        "container mx-auto mb-4 flex items-center justify-center gap-x-8 border-b-2 border-b-teal-900 p-4 font-bold"
      }
    >
      {/* todo: update Link to point to "/"-Route */}
      <Link to={"."}>
        <img src={"/images/d-icon.png"} className={"h-12"} alt={"Home"} />
      </Link>
      {/* todo: update Link to point to "/donuts"-Route */}
      <Link
        to={"."}
        className="hover:text-sprinkleBlue text-brown tracking-wider"
      >
        Donuts
      </Link>
    </nav>
  );
}
