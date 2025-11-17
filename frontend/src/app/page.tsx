// app/page.tsx
import CarList from "../components/CarList";

export default function Page() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">CarShop</h1>
      <CarList />
    </main>
  );
}
