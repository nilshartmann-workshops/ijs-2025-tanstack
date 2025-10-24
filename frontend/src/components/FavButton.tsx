import { twMerge } from "tailwind-merge";
import { toggleId } from "@/components/utils.ts";

export default function FavButton({
  donutId,
  variant = "lg",
}: {
  donutId: string;
  variant?: "lg" | "sm";
}) {
  // todo: favIds select from search
  const favIds: string[] = [];
  const isFav = favIds?.includes(donutId);

  const handleFavClick = () => {
    // Use 'navigate' from TanStack Router to
    //   navigate to the current path but with
    //   updated 'favIds' search params
    //
    //   note: you can use 'toggleId' from  "@/components/utils.ts"
    //    to create the new list of favIds
    //    (the function automatically adds/removes a given id
    //     to a list of existing ids)
  };

  const buttonClassName = twMerge(
    "border-brown text-brown hover:bg-sprinkleBlue font-caveat flex items-center justify-center rounded-2xl border bg-slate-50 px-3 hover:cursor-pointer hover:text-white",
    variant === "lg" ? "py-2 text-2xl" : "px-4 py-2 text-base",
  );

  const textClassName = twMerge(
    isFav ? "fa-solid fa-star" : "fa-regular fa-star",
    variant === "lg" ? "text-2xl" : "text",
  );

  return (
    <>
      <button className={buttonClassName} onClick={handleFavClick}>
        <i className={textClassName}></i>
      </button>
    </>
  );
}
