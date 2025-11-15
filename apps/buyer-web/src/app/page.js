'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const mockAssets = [
    {
      id: 1,
      title: 'Sunset Beach',
      price: 29.99,
      image:
        'https://via.placeholder.com/400x300/0ea5e9/ffffff?text=Sunset+Beach',
    },
    {
      id: 2,
      title: 'City Skyline',
      price: 39.99,
      image:
        'https://via.placeholder.com/400x300/0284c7/ffffff?text=City+Skyline',
    },
    {
      id: 3,
      title: 'Mountain Landscape',
      price: 34.99,
      image: 'https://via.placeholder.com/400x300/0369a1/ffffff?text=Mountain',
    },
    {
      id: 4,
      title: 'Forest Path',
      price: 24.99,
      image: 'https://via.placeholder.com/400x300/0ea5e9/ffffff?text=Forest',
    },
    {
      id: 5,
      title: 'Ocean Waves',
      price: 29.99,
      image: 'https://via.placeholder.com/400x300/0284c7/ffffff?text=Ocean',
    },
    {
      id: 6,
      title: 'Desert Dunes',
      price: 32.99,
      image: 'https://via.placeholder.com/400x300/0369a1/ffffff?text=Desert',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🦤</span>
              <h1 className="text-xl font-display font-bold">DoDoHub</h1>
            </Link>
            <nav className="flex gap-6">
              <a
                href="#"
                className="text-sm font-medium text-slate-600 hover:text-primary-600"
              >
                Browse
              </a>
              <a
                href="#"
                className="text-sm font-medium text-slate-600 hover:text-primary-600"
              >
                Pricing
              </a>
              <a
                href="#"
                className="text-sm font-medium text-slate-600 hover:text-primary-600"
              >
                Sign In
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-display font-bold text-slate-900 mb-4">
            Where Rare Content Lives
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            🦤 Discover unique, verified digital assets. AI-powered search meets
            blockchain authenticity.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for photos, videos, or concepts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-full border-2 border-slate-200 focus:border-primary-500 focus:outline-none text-lg shadow-lg"
              />
              <button className="absolute right-2 top-2 bg-primary-600 text-white px-6 py-2 rounded-full hover:bg-primary-700 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Asset Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h3 className="text-2xl font-display font-bold mb-6">Popular Assets</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAssets.map((asset) => (
            <Link
              key={asset.id}
              href={`/asset/${asset.id}`}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-slate-100 group"
            >
              <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={asset.image}
                  alt={asset.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-slate-900 mb-2">
                  {asset.title}
                </h4>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary-600">
                    ${asset.price}
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Added to cart!');
                    }}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
