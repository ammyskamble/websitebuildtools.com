import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbCrumb {
  name: string;
  path?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbCrumb[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center space-x-1.5 text-xs text-slate-400 py-2 px-3 rounded-xl bg-dark-card/40 border border-dark-border/60 w-fit ${className}`}
    >
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-white transition-colors"
        title="SvgFav.com Home"
      >
        <Home className="w-3.5 h-3.5" />
        <span className="sr-only">Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
            {item.path && !isLast ? (
              <Link
                to={item.path}
                className="hover:text-white transition-colors truncate max-w-[150px] sm:max-w-[220px]"
              >
                {item.name}
              </Link>
            ) : (
              <span className="text-slate-200 font-semibold truncate max-w-[180px] sm:max-w-[280px]">
                {item.name}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
