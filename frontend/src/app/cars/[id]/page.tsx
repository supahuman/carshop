// app/cars/[id]/page.tsx (server component)
import CarDetail from "../../../components/CarDetail";

export default async function CarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // server fetch for SEO (optional), or you can rely on client component fetch
  return (
    <div className="p-4">
      <CarDetail id={id} />
    </div>
  );
}
