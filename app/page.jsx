import CarCardComponent from "@/components/CarCard";
import HomeSearchComponent from "@/components/home-search";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { carMakes, FAQ, featuredCars } from "@/lib/vehicledata";
import { SignedOut } from "@clerk/nextjs";
import { Calendar, Car, ChevronRight, Shield } from "lucide-react";
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
              return (
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
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why choose us section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12 underline">
            Why choose us
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-4">
            <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Car className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Wide Selection</h3>
            <p className="text-gray-600">
              We are a trusted dealership and verified supplier of both use &
              new cars in Kenya
            </p>
          </div>
          <div className="text-center p-4">
            <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Easy test drive booking</h3>
            <p className="text-gray-600">
              Book a test drive online with flexible scheduling options.
            </p>
          </div>
          <div className="text-center p-4">
            <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Secure process</h3>
            <p className="text-gray-600">
              Verified car listings and secure booking & purchasing process for
              peace of mind.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-gray-50 to-gray-200 w-full">
        <div className="w-full px-4 sm:px-8 md:px-16">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-10 underline decoration-indigo-500 underline-offset-4">
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQ.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-gray-200 rounded-lg shadow-sm w-full"
              >
                <AccordionTrigger className="text-lg font-medium text-gray-700 px-4 py-3 hover:bg-gray-100 transition rounded-t-lg w-full text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 text-gray-600 bg-white rounded-b-lg">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      <section className="py-16 dotted-background text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Ready to drive Your Dream Car?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their dream car
            through our platform
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/cars">View all cars</Link>
            </Button>
            <SignedOut>
              <Button size="lg" asChild>
                <Link href="/sign-up">Sign up now</Link>
              </Button>
            </SignedOut>
          </div>
        </div>
      </section>
    </div>
  );
}
