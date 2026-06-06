/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Users, Landmark, TrendingUp, Compass } from 'lucide-react';

interface StatCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function Counter({ end, suffix = "", duration = 2000 }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [inView, end, duration]);

  return (
    <span ref={ref} className="font-sans text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight">
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const stats = [
    {
      value: 180,
      suffix: "+",
      label: "Happy Investors",
      sub: "Local & International"
    },
    {
      value: 240,
      suffix: "K+",
      label: "SQM Traded",
      sub: "Acreage Managed"
    },
    {
      value: 45,
      suffix: "%",
      label: "Growth Index",
      sub: "Annual Appreciation"
    },
    {
      value: 100,
      suffix: "%",
      label: "Title Security",
      sub: "Fully Survey-Certified"
    }
  ];

  return (
    <section className="bg-light-gray py-20 border-b border-gray-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white p-6 shadow-sm stat-box flex flex-col justify-between"
              >
                <div>
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-4">
                  <h4 className="text-gray-900 font-extrabold text-xs tracking-wider uppercase">
                    {stat.label}
                  </h4>
                  <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider mt-0.5">
                    {stat.sub}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
