"use client";
import React, { useState } from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import { CarIcon, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";

const CarCardComponent = ({ car }) => {
  const [liked, setLiked] = useState(car.wishListed);
  const router = useRouter()
  return (
    <Card className="overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow group w-full max-w-sm mx-auto py-0">
      <div className="relative h-48 sm:h-56 md:h-64 w-full">
        {car.images && car.images.length > 0 ? (
          <div className="relative w-full h-full">
            <Image
              src={car.images[0]}
              alt={`${car.make} ${car.model}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <CarIcon className="w-14 h-14 text-gray-400" />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setLiked(!liked)}
          className={`absolute top-3 right-3 bg-white/80 backdrop-blur-md rounded-full p-2 shadow-md hover:bg-white transition-all ${
            liked ? "animate-pulse" : ""
          }`}
        >
          <Heart
            size={20}
            className={`transition-colors duration-200 ${
              liked ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </Button>
      </div>

      <div className="p-4 space-y-1">
        <Badge variant="ouline" className="bg-gray-60">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {car.make} {car.model}
          </h3>
        </Badge>
        <br />

        <Badge variant="outline" className="bg-gray-50">
          {car.year} • {car.transmission} • {car.fuelType}
        </Badge>

        <Badge variant="outline" className="bg-gray-50">
          Mileage: {car.mileage?.toLocaleString()} km • Color: {car.color}
        </Badge>

        <br />
        <Badge variant="outline" className="bg-gray-50">
          <p className="text-base font-bold text-indigo-600">
            Ksh {car.price?.toLocaleString()}
          </p>
        </Badge>
      </div>
      <div className="px-4 pb-4 pt-2">
        <Button
          onClick={() => router.push(`/cars/${car.id}`)}
          className="w-full  hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          View Car
        </Button>
      </div>
    </Card>
  );
};

export default CarCardComponent;
