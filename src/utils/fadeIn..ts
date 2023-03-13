export const fadeIn = (direction: string, delay: number | undefined) => {
  return {
    hidden: {
      y: direction === "up" ? 150 : direction === "down" ? -150 : 0,
      opacity: 0,
      x: direction === "left" ? 150 : direction === "right" ? -150 : 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.5,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};
