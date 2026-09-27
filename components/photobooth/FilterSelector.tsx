'use client';

import React from 'react';
import { FILTERS, FilterName, getCSSFilter } from '@/lib/filters';

interface FilterSelectorProps {
  selectedFilter: FilterName;
  onSelectFilter: (filter: FilterName) => void;
}

export default function FilterSelector({ selectedFilter, onSelectFilter }: FilterSelectorProps) {
  return (
    <div className="w-full py-2">
      <h3 className="font-handwritten text-2xl text-deep-rose mb-3 px-2">Choose a Filter</h3>
      <div className="flex overflow-x-auto gap-4 px-2 pb-4 snap-x hide-scrollbar">
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onSelectFilter(filter.id as FilterName)}
            className={`flex flex-col items-center gap-2 snap-center shrink-0 transition-all ${
              selectedFilter === filter.id ? 'scale-105' : 'opacity-70 hover:opacity-100 hover:scale-105'
            }`}
          >
            <div
              className={`w-14 h-14 rounded-full bg-cover bg-center shadow-sm border-[3px] ${
                selectedFilter === filter.id ? 'border-rose ring-4 ring-rose/20' : 'border-transparent'
              }`}
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1549471013-3364d7320f66?auto=format&fit=crop&w=150&q=80)',
                backgroundColor: '#e5e7eb',
                filter: getCSSFilter(filter.id as FilterName),
              }}
            />
            <span className={`text-xs font-medium ${selectedFilter === filter.id ? 'text-rose font-semibold' : 'text-soft-brown'}`}>
              {filter.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
