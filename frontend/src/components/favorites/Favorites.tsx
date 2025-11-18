"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import FavoriteCarItem from "./FavoritesCarItem";

export default function FavoritesPageClient() {
  const [favIds, setFavIds] = useLocalStorage<string[]>("favorites", []);

  const removeFavorite = (id: string) => {
    setFavIds((prev) => prev.filter((x) => x !== id));
  };

  if (favIds.length === 0) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Your Favorites</h1>
        <p>You have no favorite cars yet.</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Your Favorites</h1>
      {favIds.map((id) => (
        <FavoriteCarItem key={id} id={id} removeFavorite={removeFavorite} />
      ))}
    </div>
  );
}
