// app/page.tsx
import CarList from "../components/CarList";

export default function Page() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-white rounded-full"></div>
          <div className="absolute bottom-40 right-10 w-28 h-28 bg-white rounded-full"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full text-blue-200 text-sm font-medium mb-4">
                🚗 Premium Car Collection
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Find Your
              <span className="block bg-linear-to-r from-accent-400 via-accent-400 to-accent-600 bg-clip-text text-transparent">
                Dream Car
              </span>
            </h1>

            <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Discover exceptional vehicles with advanced filtering, real-time
              sorting, and seamless test drive booking. Your perfect ride
              awaits.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/20">
                <div className="text-3xl font-bold text-yellow-300 mb-1">
                  50+
                </div>
                <div className="text-sm text-blue-200 uppercase tracking-wide">
                  Quality Cars
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/20">
                <div className="text-3xl font-bold text-green-300 mb-1">
                  Easy
                </div>
                <div className="text-sm text-blue-200 uppercase tracking-wide">
                  Booking
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/20">
                <div className="text-3xl font-bold text-purple-300 mb-1">
                  Best
                </div>
                <div className="text-sm text-blue-200 uppercase tracking-wide">
                  Prices
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-linear-to-r from-primary-500 to-primary-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-2xl">
                Browse Cars
              </button>
              <button className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 border border-white/30">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-16 fill-gray-50">
            <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Car List Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CarList />
        </div>
      </section>
    </main>
  );
}
