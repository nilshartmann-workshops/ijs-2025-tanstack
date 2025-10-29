import { useSuspenseQuery } from "@tanstack/react-query";
import DonutLikeButton from "@/components/DonutLikeButton.tsx";
import { fetchDonutDetailsOpts } from "@/queries.ts";

type FavDonutProps = {
  donutId: string;
};
export default function FavDonut({ donutId }: FavDonutProps) {
  // todo:
  //   - remove next line
  //   - load donut with suspense query instead
  const { data: donut } = useSuspenseQuery(fetchDonutDetailsOpts(donutId));

  return (
    <div className={"FavDonut"}>
      <img src={`/images/${donut.image}`} alt={donut.name} />
      <h2>{donut.name}</h2>
      <DonutLikeButton donutId={donut.id} currentLikes={donut.likes} />
    </div>
  );
}
