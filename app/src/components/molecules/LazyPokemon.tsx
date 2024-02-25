import React, { useEffect, useRef, useState } from "react";

const LazyPokemon = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const placeholderRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(placeholderRef.current);

    return () => observer.disconnect();
  }, []);

  return <div ref={placeholderRef}>{isVisible && children}</div>;
};

export default LazyPokemon;
