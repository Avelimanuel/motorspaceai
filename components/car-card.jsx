import Image from "next/image";
import { Card } from "./ui/card";
import { CarIcon } from "lucide-react";

const CarCardComponent = ({ car }) => {
  return (
    <Card className="rounded-2xl overflow-hidden shadow-md group hover-shadow-xl transition duration-300">
      <div className="relative w-full h-48">
        {car.image && car.image.length > 0 ? (
          <div>
            <Image
              src={car.image}
              alt={`${car.make} ${car.model}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <CarIcon className="h-12 w-12 text-gray-400" />
          </div>
        )}
      </div>
    </Card>
  );
};

export default CarCardComponent;
