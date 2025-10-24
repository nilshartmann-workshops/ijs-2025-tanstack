import FavDonut from "@/components/FavDonut.tsx";

type FavListProps = {
  favIds?: string[];
};
export default function FavList({ favIds }: FavListProps) {
  return (
    <div className={"FavList"}>
      <h2>My favs</h2>
      {favIds?.map((id) => (
        <div key={id}>
          <FavDonut donutId={id} />
        </div>
      ))}
    </div>
  );
}
