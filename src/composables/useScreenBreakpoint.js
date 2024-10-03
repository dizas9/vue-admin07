// src/composables/useScreenBreakpoint.js
import { useBreakpoints } from "@vueuse/core";

export function useResponsive() {
  const breakpoints = useBreakpoints({
    sm: 768,
    md: 1024,
    lg: 1440,
  });


  return {
    sm: breakpoints.smaller("sm"),
    md: breakpoints.between("sm", "md"),
    lg: breakpoints.greater("md"),
  };
}
