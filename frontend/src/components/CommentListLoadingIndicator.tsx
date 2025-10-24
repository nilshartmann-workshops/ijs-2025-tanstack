import LoadingIndicator from "@/components/LoadingIndicator.tsx";

export default function CommentLoadingIndicator() {
  return (
    <LoadingIndicator>
      <span className={"font-caveat"}>Comments loading...</span>
    </LoadingIndicator>
  );
}
