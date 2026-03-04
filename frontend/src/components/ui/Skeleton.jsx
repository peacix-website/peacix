import React from "react";

const CardSkeleton = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-card border border-border rounded-2xl p-6 space-y-4 animate-pulse"
        >
          {/* Image */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-muted rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          </div>
          
          {/* Content */}
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
          </div>
          
          {/* Stats */}
          <div className="flex gap-4">
            <div className="h-4 bg-muted rounded w-16"></div>
            <div className="h-4 bg-muted rounded w-16"></div>
            <div className="h-4 bg-muted rounded w-16"></div>
          </div>
          
          {/* Button */}
          <div className="h-10 bg-muted rounded w-full"></div>
        </div>
      ))}
    </>
  );
};

const TableSkeleton = ({ rows = 5 }) => {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex gap-4 pb-3 border-b border-border">
        <div className="h-4 bg-muted rounded w-1/4"></div>
        <div className="h-4 bg-muted rounded w-1/4"></div>
        <div className="h-4 bg-muted rounded w-1/4"></div>
        <div className="h-4 bg-muted rounded w-1/6"></div>
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 py-3 border-b border-border animate-pulse">
          <div className="h-4 bg-muted rounded w-1/4"></div>
          <div className="h-4 bg-muted rounded w-1/4"></div>
          <div className="h-4 bg-muted rounded w-1/4"></div>
          <div className="h-4 bg-muted rounded w-1/6"></div>
        </div>
      ))}
    </div>
  );
};

const PageSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-pulse">
          <div className="h-12 bg-muted rounded w-3/4 mx-auto"></div>
          <div className="h-6 bg-muted rounded w-1/2 mx-auto"></div>
        </div>
        
        {/* Filters */}
        <div className="flex gap-4 flex-wrap animate-pulse">
          <div className="h-10 bg-muted rounded w-48"></div>
          <div className="h-10 bg-muted rounded w-48"></div>
          <div className="h-10 bg-muted rounded w-48"></div>
        </div>
        
        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardSkeleton count={6} />
        </div>
      </div>
    </div>
  );
};

export { CardSkeleton, TableSkeleton, PageSkeleton };
