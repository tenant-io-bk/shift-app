'use client';
import { useEffect, useRef, useState } from 'react';

export function CountUp({
  to,
  duration = 900,
  prefix = '',
  suffix = '',
  decimals = 0,
}: {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const [val, setVal] = useState(0);
  const raf = useRef<number | undefined>(undefined);
  const startTs = useRef<number | null>(null);

  useEffect(() => {
    startTs.current = null;
    function tick(ts: number) {
      if (startTs.current === null) startTs.current = ts;
      const p = Math.min((ts - startTs.current) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      const cur = to * eased;
      setVal(decimals > 0 ? parseFloat(cur.toFixed(decimals)) : Math.round(cur));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    }
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [to, duration, decimals]);

  const display = decimals > 0 ? val.toFixed(decimals) : String(Math.round(val));
  return <>{prefix}{display}{suffix}</>;
}
