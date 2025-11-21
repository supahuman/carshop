// app/favorites/page.tsx
import Favorites from "@/components/favorites/Favorites";

export default function FavoritesPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Favorite Cars</h1>
      <Favorites />
    </div>
  );
}
