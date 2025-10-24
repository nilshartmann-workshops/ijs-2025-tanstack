import DonutLikeButton from "@/components/DonutLikeButton.tsx";

type FavDonutProps = {
  donutId: string;
};
export default function FavDonut({ donutId }: FavDonutProps) {
  // todo:
  //   - remove next line
  //   - load donut with suspense query instead
  const donut: any = {};

  return (
    <div className={"FavDonut"}>
      <img src={`/images/${donut.image}`} alt={donut.name} />
      <h2>{donut.name}</h2>
      <DonutLikeButton donutId={donut.id} currentLikes={donut.likes} />
    </div>
  );
}
