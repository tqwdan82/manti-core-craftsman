import darkTheme from "./Dark/Dark_theme";
import darkButton from "./Dark/button";
import lightTheme from "./Light/Light_theme";
import lightButton from "./Light/button";
import retroTheme from "./Retro/Retro_Theme";
import retroButton from "./Retro/button";
import gardenTheme from "./Garden/Garden_theme";
import gardenButton from "./Garden/button";
import sunlightTheme from "./Sunlight/Sunlight_Theme";
import sunlightButton from "./Sunlight/button";
import earthTheme from "./Earth/Earth_Theme";
import earthButton from "./Earth/button";

export const themes = {
  Light: lightTheme,
  Dark: darkTheme,
  // Garden: gardenTheme,
  // Retro: retroTheme,
  // Sunlight: sunlightTheme,
  // Earth: earthTheme,
};
export const themeNames = Object.keys(themes);

export const themeButtons = {
  Light: lightButton,
  Dark: darkButton,
  // Green: gardenButton,
  // Retro: retroButton,
  // Sunlight: sunlightButton,
  // Earth: earthButton,
};
