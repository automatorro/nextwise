
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation Skeleton */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl">
        <div className="bg-white/80 backdrop-blur-md shadow-lg border border-white/30 rounded-2xl">
          <div className="px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center space-x-2">
                <Skeleton className="w-8 h-8 rounded-lg" />
                <Skeleton className="w-32 h-6" />
              </div>
              <div className="flex items-center space-x-4">
                <Skeleton className="w-20 h-9" />
                <Skeleton className="w-28 h-9" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section Skeleton */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 pt-28">
        <div className="max-w-7xl mx-auto text-center">
          <Skeleton className="w-32 h-6 mx-auto mb-4" />
          <Skeleton className="w-96 h-12 mx-auto mb-6" />
          <Skeleton className="w-80 h-6 mx-auto mb-8" />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Skeleton className="w-48 h-12" />
            <Skeleton className="w-32 h-12" />
          </div>
        </div>
      </section>

      {/* Features Section Skeleton */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Skeleton className="w-64 h-8 mx-auto mb-4" />
            <Skeleton className="w-96 h-6 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="border rounded-lg p-6">
                <Skeleton className="w-12 h-12 mb-4" />
                <Skeleton className="w-32 h-6 mb-2" />
                <Skeleton className="w-full h-16" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoadingSkeleton;
