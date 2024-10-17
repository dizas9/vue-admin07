import { useBreakpoints } from "@vueuse/core";

export function useResponsive() {
  const breakpoints = useBreakpoints({
    sm: 640, // Small devices (phones)
    md: 700, // Medium devices (tablets)
    lg: 1024, // Large devices (small laptops)
    xl: 1344, // Extra-large devices (typical laptops, including your 1343px)
    "2xl": 1440, // Extra-extra-large devices (larger desktops)
  });

  return {
    sm: breakpoints.smaller("sm"), // Below 640px
    md: breakpoints.between("sm", "md"), // Between 640px and 768px
    lg: breakpoints.between("md", "lg"), // Between 768px and 1024px
    xl: breakpoints.between("lg", "xl"), // Between 1024px and 1344px
    "2xl": breakpoints.greater("xl"), // Above 1344px (captures larger laptops/desktops)
  };
}
