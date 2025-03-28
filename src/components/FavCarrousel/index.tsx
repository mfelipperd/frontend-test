import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ICompany } from "@/interfaces/ICompany";
import { CardCompany } from "../CardCompany";

interface FavoriteCarouselProps {
  favorites: ICompany[];
}

export function FavoriteCarousel({ favorites }: FavoriteCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Favorited Companies</h2>
        <div className="space-x-2">
          <Button variant="ghost" size="icon" onClick={() => scroll("left")}>
            <ChevronLeft />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => scroll("right")}>
            <ChevronRight />
          </Button>
        </div>
      </div>

      {/* Carrossel */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-2"
      >
        {favorites.map((company) => (
          <CardCompany company={company} />
        ))}
      </div>
    </div>
  );
}
