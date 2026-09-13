import React, { useEffect, useState, useCallback } from 'react';
import { ChevronUp } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export const ScrollToTop: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const { theme } = useTheme();

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
    setProgress(pct);
    setVisible(scrollTop > 300);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SVG circle dimensions
  const size = 48;
  const strokeW = 3;
  const r = (size - strokeW) / 2;
  const circumference = 2 * Math.PI * r;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const isLight = theme === 'light';

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.85)',
        transition: 'opacity 0.3s ease, transform 0.3s ease, background-color 0.25s ease',
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        width: `${size}px`,
        height: `${size}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isLight ? 'rgba(255, 255, 255, 0.92)' : 'rgba(15, 18, 30, 0.85)',
        backdropFilter: 'blur(12px)',
        border: isLight ? '1px solid rgba(226, 232, 240, 0.9)' : 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        boxShadow: isLight
          ? '0 4px 20px rgba(0,0,0,0.1), 0 2px 8px rgba(59,130,246,0.15)'
          : '0 4px 24px rgba(59,130,246,0.25), 0 2px 8px rgba(0,0,0,0.4)',
      }}
    >
      {/* Progress ring */}
      <svg
        width={size}
        height={size}
        style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}
        aria-hidden="true"
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(59,130,246,0.15)"
          strokeWidth={strokeW}
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#scroll-grad)"
          strokeWidth={strokeW}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.15s ease' }}
        />
        <defs>
          <linearGradient id="scroll-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Arrow icon */}
      <ChevronUp
        style={{
          width: '18px',
          height: '18px',
          color: isLight ? '#0f172a' : '#e2e8f0',
          position: 'relative',
          zIndex: 1,
          flexShrink: 0,
        }}
        strokeWidth={2.5}
      />
    </button>
  );
};
