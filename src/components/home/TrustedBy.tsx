// src/components/home/TrustedBy.tsx
// CINEVISION AI — TRUSTED BY / SOCIAL PROOF

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const logos = [
  { name: 'YouTube', icon: '📺' },
  { name: 'Instagram', icon: '📸' },
  { name: 'TikTok', icon: '🎵' },
  { name: 'LinkedIn', icon: '💼' },
  { name: 'Spotify', icon: '🎧' },
  { name: 'Twitch', icon: '🎮' },
];

export function TrustedBy() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-16 px-4 border-y border-white/5">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-center text-sm text-gray-500 mb-8 uppercase tracking-wider"
        >
          Usado por criadores nas principais plataformas
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {logos.map((logo, i) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">
                {logo.icon}
              </span>
              <span className="text-lg font-medium hidden sm:inline">{logo.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustedBy;
