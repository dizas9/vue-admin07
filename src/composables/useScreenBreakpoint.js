// src/composables/useScreenBreakpoint.js
import { useBreakpoints } from "@vueuse/core";

export function useResponsive() {
  const breakpoints = useBreakpoints({
    sm: 640,
    md: 1024,
    lg: 1280,
  });

  return {
    sm: breakpoints.smaller("sm"),
    md: breakpoints.between("sm", "md"),
    lg: breakpoints.greater("lg"),
  };
}
