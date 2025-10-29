import { twMerge } from "tailwind-merge";
import { useLikeMutation } from "@/queries.ts";

type DonutLikeButtonProps = {
  donutId: string;
  currentLikes: number;

  variant?: "lg" | "sm";
};
export default function DonutLikeButton({
  donutId,
  currentLikes,
  variant = "lg",
}: DonutLikeButtonProps) {
  // todo:
  //  - Describe Mutation
  //  - Execute Mutation on button click
  //  - add visual feedback while mutation runs
  //  - disable button while mutation runs

  const mutation = useLikeMutation(donutId);

  const buttonClassName = twMerge(
    "border-brown text-brown hover:bg-sprinkleBlue font-caveat flex items-center justify-center space-x-2 rounded-2xl border bg-slate-50 px-3 py-1 hover:cursor-pointer hover:text-white",
    "disabled:hover:bg-grey-200 disabled:hover:bg-sprinkleBlue/80 disabled:cursor-default",
    variant === "lg" ? "text-2xl" : "text-base",
  );

  const textClassName = twMerge(variant === "lg" ? "text-2xl" : "text-base");

  return (
    <button
      type={"submit"}
      className={buttonClassName}
      onClick={() => mutation.mutate()}
    >
      <span className={textClassName}>{currentLikes}</span>
      <i className="fa-regular fa-heart mr-2"></i>
    </button>
  );
}
