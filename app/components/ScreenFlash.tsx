'use client';
import { useEffect, useRef, useState } from 'react';

export function ScreenFlash({ trigger, color = 'var(--green)' }: {
  trigger: number; // increment this to fire
  color?: string;
}) {
  const [visible, setVisible] = useState(false);
  const prev = useRef(0);

  useEffect(() => {
    if (trigger > prev.current) {
      prev.current = trigger;
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 550);
      return () => clearTimeout(t);
    }
  }, [trigger]);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: color,
      pointerEvents: 'none',
      animation: 'screen-flash 0.55s cubic-bezier(0.22,1,0.36,1) forwards',
    }}>
      <style>{`
        @keyframes screen-flash {
          0%   { opacity: 0.65; }
          35%  { opacity: 0.35; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
