export const SIMULATOR_MENU = {
  label: "Accessibility Demos",
  menuAriaLabel: "Accessibility demo pages",
  items: [
    { to: "/simulator", label: "Accessibility Levels" },
    { to: "/simulator/color-vision", label: "Color & Contrast" },
  ],
};
export function isSimulatorPath(pathname) {
  return pathname === "/simulator" || pathname.startsWith("/simulator/");
}
