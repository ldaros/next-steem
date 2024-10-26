  import { useEffect, useState } from "react";
  import { Game } from "@/types";
  import { Button } from "./ui/button";
  import { useCart } from "@/contexts/CartContext";

  export function Catalog() {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true); // Track if there are more games to load
    const [offset, setOffset] = useState(0);
    const limit = 10; // Number of games to load per request
    const { addToCart } = useCart();

    useEffect(() => {
      async function fetchGames() {
        if (loading || !hasMore) return;
        setLoading(true);
        const response = await fetch(`/api/games?limit=${limit}&offset=${offset}`);
        const data = await response.json();

        // If there are no more games, set `hasMore` to false
        if (data.length < limit) {
          setHasMore(false);
        }

        setGames((prevGames) => [...prevGames, ...data]); // Append new games
        setLoading(false);
      }

      fetchGames();
    }, [offset]);

    useEffect(() => {
      function handleScroll() {
        // Check if the user is near the bottom of the page
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading && hasMore) {
          setOffset((prevOffset) => prevOffset + limit); // Load more games by increasing the offset
        }
      }

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll); // Cleanup the event listener on unmount
    }, [loading, hasMore]);

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map((game, index) => (
          <div
            key={index}
            className="bg-neutral-800 border border-neutral-700 rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={game.cover}
              alt={game.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold mb-2 text-neutral-100">{game.name}</h3>
              <p className="text-neutral-400 mb-4">R$ {game.price / 100}</p>
              <Button
                onClick={() => addToCart({ ...game, quantity: 1 })}
                className="w-full bg-neutral-600 text-neutral-100 hover:bg-neutral-500"
              >
                Adicionar ao carrinho
              </Button>
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-center col-span-3">
            <p className="text-neutral-400">Carregando mais jogos...</p>
          </div>
        )}
      </div>
    );
  }
