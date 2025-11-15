'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AssetDetail() {
    const [selectedLicense, setSelectedLicense] = useState('standard');

    // Mock asset data
    const asset = {
        id: 1,
        title: 'Sunset Beach Paradise',
        description: 'A stunning sunset over a pristine beach with golden sand and turquoise waters. Perfect for travel, lifestyle, and nature projects.',
        image: 'https://via.placeholder.com/1200x800/0ea5e9/ffffff?text=Sunset+Beach+Paradise',
        contributor: {
            name: 'John Doe',
            avatar: 'https://via.placeholder.com/100/a855f7/ffffff?text=JD',
            totalAssets: 234,
            rating: 4.8
        },
        tags: ['beach', 'sunset', 'nature', 'travel', 'ocean', 'paradise', 'tropical'],
        category: 'Photos',
        resolution: '6000 x 4000 px',
        fileSize: '12.5 MB',
        format: 'JPEG',
        uploadedAt: '2 days ago',
        downloads: 1234,
        views: 5678,
        likes: 456
    };

    const licenses = [
        {
            type: 'standard',
            name: 'Standard License',
            price: 29.99,
            features: [
                'Use in digital and print projects',
                'Up to 500,000 impressions',
                'Social media usage',
                'Website and blog usage'
            ]
        },
        {
            type: 'extended',
            name: 'Extended License',
            price: 79.99,
            features: [
                'Everything in Standard',
                'Unlimited impressions',
                'Merchandise for resale',
                'Print on demand',
                'Commercial usage'
            ],
            popular: true
        },
        {
            type: 'exclusive',
            name: 'Exclusive Rights',
            price: 299.99,
            features: [
                'Everything in Extended',
                'Exclusive ownership',
                'Remove from marketplace',
                'Full commercial rights',
                'Transferable license'
            ]
        }
    ];

    const relatedAssets = [
        { id: 2, title: 'Ocean Waves', price: 24.99, image: 'https://via.placeholder.com/400x300/0284c7/ffffff?text=Ocean+Waves' },
        { id: 3, title: 'Tropical Island', price: 34.99, image: 'https://via.placeholder.com/400x300/0369a1/ffffff?text=Tropical+Island' },
        { id: 4, title: 'Beach Sunset', price: 29.99, image: 'https://via.placeholder.com/400x300/0ea5e9/ffffff?text=Beach+Sunset' },
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
                            <Link href="/" className="text-sm font-medium text-slate-600 hover:text-primary-600">Browse</Link>
                            <Link href="#" className="text-sm font-medium text-slate-600 hover:text-primary-600">Pricing</Link>
                            <Link href="#" className="text-sm font-medium text-slate-600 hover:text-primary-600">Sign In</Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Image Preview */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100">
                            <div className="aspect-[3/2] bg-slate-100 relative">
                                <img
                                    src={asset.image}
                                    alt={asset.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white transition-colors text-sm font-medium">
                                        ❤️ Save
                                    </button>
                                    <button className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white transition-colors text-sm font-medium">
                                        🔗 Share
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Asset Details */}
                        <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                            <h1 className="text-3xl font-display font-bold text-slate-900 mb-4">
                                {asset.title}
                            </h1>
                            <p className="text-slate-600 mb-6">
                                {asset.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {asset.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium border border-primary-100 hover:bg-primary-100 cursor-pointer transition-colors"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            {/* Contributor Info */}
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                                <img
                                    src={asset.contributor.avatar}
                                    alt={asset.contributor.name}
                                    className="w-16 h-16 rounded-full"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-slate-900">{asset.contributor.name}</h3>
                                    <p className="text-sm text-slate-600">{asset.contributor.totalAssets} assets • ⭐ {asset.contributor.rating}</p>
                                </div>
                                <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium">
                                    Follow
                                </button>
                            </div>

                            {/* Asset Specs */}
                            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <p className="text-xs text-slate-500 uppercase">Resolution</p>
                                    <p className="font-semibold text-slate-900">{asset.resolution}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase">File Size</p>
                                    <p className="font-semibold text-slate-900">{asset.fileSize}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase">Format</p>
                                    <p className="font-semibold text-slate-900">{asset.format}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase">Downloads</p>
                                    <p className="font-semibold text-slate-900">{asset.downloads.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Pricing & Licenses */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                                <h2 className="text-xl font-display font-bold mb-4">Choose License</h2>

                                <div className="space-y-3">
                                    {licenses.map((license) => (
                                        <div
                                            key={license.type}
                                            onClick={() => setSelectedLicense(license.type)}
                                            className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedLicense === license.type
                                                    ? 'border-primary-600 bg-primary-50'
                                                    : 'border-slate-200 hover:border-slate-300'
                                                }`}
                                        >
                                            {license.popular && (
                                                <span className="absolute -top-2 right-4 bg-secondary-600 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                                                    Popular
                                                </span>
                                            )}
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="font-semibold text-slate-900">{license.name}</h3>
                                                    <p className="text-2xl font-bold text-primary-600 mt-1">
                                                        ${license.price}
                                                    </p>
                                                </div>
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedLicense === license.type
                                                        ? 'border-primary-600 bg-primary-600'
                                                        : 'border-slate-300'
                                                    }`}>
                                                    {selectedLicense === license.type && (
                                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                                    )}
                                                </div>
                                            </div>
                                            <ul className="space-y-1 text-sm text-slate-600">
                                                {license.features.map((feature, idx) => (
                                                    <li key={idx} className="flex items-start gap-2">
                                                        <span className="text-green-600 mt-0.5">✓</span>
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>

                                <button className="w-full mt-6 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg shadow-lg shadow-primary-600/30">
                                    Add to Cart - ${licenses.find(l => l.type === selectedLicense)?.price}
                                </button>

                                <button className="w-full mt-3 border-2 border-slate-300 text-slate-700 px-6 py-3 rounded-lg hover:bg-slate-50 transition-colors font-semibold">
                                    Download Preview
                                </button>

                                {/* Blockchain Badge */}
                                <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg border border-primary-100">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xl">🔗</span>
                                        <h4 className="font-semibold text-slate-900">Blockchain Verified</h4>
                                    </div>
                                    <p className="text-sm text-slate-600">
                                        This asset is verified on the blockchain, ensuring authenticity and ownership.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Assets */}
                <div className="mt-12">
                    <h2 className="text-2xl font-display font-bold mb-6">Similar Assets</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {relatedAssets.map((item) => (
                            <Link
                                key={item.id}
                                href={`/asset/${item.id}`}
                                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-slate-100"
                            >
                                <div className="aspect-[4/3] bg-slate-100">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-4">
                                    <h4 className="font-semibold text-slate-900 mb-2">{item.title}</h4>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold text-primary-600">${item.price}</span>
                                        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium">
                                            View
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
