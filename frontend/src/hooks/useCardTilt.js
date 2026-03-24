import { useRef, useCallback } from 'react';

/**
 * useCardTilt
 * Attaches mouse-tracking 3D perspective tilt to a card element.
 *
 * Usage:
 *   const { ref, onMouseMove, onMouseLeave } = useCardTilt(12);
 *   <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} />
 *
 * @param {number} maxTilt - max rotation in degrees (default 12)
 * @param {number} maxLift - max Z translateZ in px (default 16)
 */
export const useCardTilt = (maxTilt = 12, maxLift = 16) => {
  const ref = useRef(null);
  const rafRef = useRef(null);

  const onMouseMove = useCallback(
    (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 → +0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5;    // -0.5 → +0.5

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!ref.current) return;
        ref.current.style.transition = 'transform 0.08s linear';
        ref.current.style.transform = `
          perspective(900px)
          rotateY(${px * maxTilt}deg)
          rotateX(${-py * maxTilt * 0.75}deg)
          translateZ(${maxLift}px)
          scale(1.025)
        `;
        /* dynamic shine overlay via CSS var */
        ref.current.style.setProperty('--shine-x', `${(px + 0.5) * 100}%`);
        ref.current.style.setProperty('--shine-y', `${(py + 0.5) * 100}%`);
        ref.current.style.setProperty('--shine-opacity', '1');
      });
    },
    [maxTilt, maxLift]
  );

  const onMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (!ref.current) return;
    ref.current.style.transition = 'transform 0.65s cubic-bezier(.16,1,.3,1)';
    ref.current.style.transform =
      'perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0px) scale(1)';
    ref.current.style.setProperty('--shine-opacity', '0');
  }, []);

  return { ref, onMouseMove, onMouseLeave };
};

export default useCardTilt;
