'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export default function InfiniteScroll({ onLoad, hasScroll, children }) {
  const [isTopLoading, setIsTopLoading] = useState(false);
  const [isBottomLoading, setIsBottomLoading] = useState(false);
  const [hasManuallyScrolledUp, setHasManuallyScrolledUp] = useState(false);
  const [topTriggerCooldown, setTopTriggerCooldown] = useState(false);

  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const hasUserInteractedRef = useRef(false);

  const loadMoreBottom = useCallback(async () => {
    if (isBottomLoading) return;
    setIsBottomLoading(true);
    await onLoad('bottom');
    setIsBottomLoading(false);
  }, [isBottomLoading]);

  const loadMoreTop = useCallback(async () => {
    if (isTopLoading) return;
    setIsTopLoading(true);
    setTopTriggerCooldown(true); // prevent retrigger
    await onLoad('top');
    setHasManuallyScrolledUp(false); // reset trigger
    setIsTopLoading(false);
  }, [isTopLoading]);

  useEffect(() => {
    const topObserver = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasManuallyScrolledUp &&
          !topTriggerCooldown
        ) {
          loadMoreTop();
        }
      },
      { threshold: 1 },
    );

    const bottomObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreBottom();
        }
      },
      { threshold: 1 },
    );

    if (topRef.current) topObserver.observe(topRef.current);
    if (bottomRef.current) bottomObserver.observe(bottomRef.current);

    return () => {
      if (topRef.current) topObserver.unobserve(topRef.current);
      if (bottomRef.current) bottomObserver.unobserve(bottomRef.current);
    };
  }, [loadMoreTop, loadMoreBottom, hasManuallyScrolledUp, topTriggerCooldown]);

  useEffect(() => {
    if (!hasScroll) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (!hasUserInteractedRef.current && scrollY > 100) {
        hasUserInteractedRef.current = true;
      }

      if (hasUserInteractedRef.current && scrollY < 50) {
        setHasManuallyScrolledUp(true);
      }

      // Reset cooldown only when user scrolls away from top again
      if (topTriggerCooldown && scrollY > 200) {
        setTopTriggerCooldown(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScroll, topTriggerCooldown]);

  return (
    <div className={hasScroll ? `h-full flex flex-col items-center` : ''}>
      <div ref={topRef} />
      {children}
      <div ref={bottomRef} />
    </div>
  );
}
