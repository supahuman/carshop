"use client";

import Link from "next/link";
import { Car } from "@/types";

interface FavoritesCarItemProps {
  car: Car;
  onRemove: (id: string) => void;
}

export default function FavoritesCarItem({
  car,
  onRemove,
}: FavoritesCarItemProps) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-red-300 hover:-translate-y-1">
      {/* Car Image Section */}
      <div className="relative h-56 bg-linear-to-br from-red-400 via-pink-500 to-purple-500 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-20 h-20 bg-white rounded-full"></div>
          <div className="absolute bottom-4 right-4 w-16 h-16 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full"></div>
        </div>

        {/* Car Emoji */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-7xl group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
            🚗
          </div>
        </div>

        {/* Year Badge */}
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium border border-white/20">
          {car.year}
        </div>
      </div>

      {/* Car Details */}
      <div className="p-6 space-y-4">
        {/* Title and Price */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-200">
              {car.make} {car.model}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {car.year} • {car.mileage.toLocaleString()} miles
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">
              ${car.price.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">per day</div>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-4 py-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-sm">📏</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">
                {car.mileage.toLocaleString()} miles
              </div>
              <div className="text-xs text-gray-500">Mileage</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-sm">🏁</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">
                {car.year}
              </div>
              <div className="text-xs text-gray-500">Year</div>
            </div>
          </div>

          {car.color && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-sm">🎨</span>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {car.color}
                </div>
                <div className="text-xs text-gray-500">Color</div>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-orange-600 text-sm">💰</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">
                ${car.price.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">Price</div>
            </div>
          </div>
        </div>

        {/* Description */}
        {car.description && (
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {car.description}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-2">
          <Link
            href={`/cars/${car.id}`}
            className="flex-1 bg-linear-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
          >
            Book Now
          </Link>
          <button
            onClick={() => onRemove(car.id)}
            className="flex-1 border-2 border-red-200 hover:border-red-300 text-red-600 hover:text-red-700 font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:bg-red-50"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
