import CarCardComponent from "@/components/CarCard";
import HomeSearchComponent from "@/components/home-search";
import { Button } from "@/components/ui/button";
import { carMakes, featuredCars } from "@/lib/vehicledata";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col pt-20">
      {/* Hero */}
      <section className="relative py-16 md:py-28 dotted-background bg-white">
        <div className="mx-auto text-center px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="mb-10">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight gradient gradient-title mb-4">
              Find Your Dream Car @ Motorspace
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced AI-powered car search from thousands of vehicles.
            </p>
          </div>

          {/* Search */}
          <HomeSearchComponent />
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Featured Cars
            </h2>
            <Button className="flex items-center gap-1">
              <Link href="/allcars">View All</Link>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.map((car) => (
              <CarCardComponent key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      {/* Browse by make section */}
      <section className="py-12 bg-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Browse By Make
            </h2>
            <Button className="flex items-center gap-1">
              <Link href="/allcars">View All</Link>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {carMakes.map((make) => {
              return(
              <Link
                key={make.name}
                href={`/cars?make=${make.name}`}
                className="bg-white rounded-lg p-4 text-center shadow hover:shadow-md transition cursor-pointer"
              >
                <div className="h-16 w-auto  relative mb-2">
                  <Image
                    src={make.image}
                    alt={make.name}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </Link>)
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
