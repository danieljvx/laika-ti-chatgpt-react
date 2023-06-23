import { useMemo } from "react";
import { css } from "@emotion/css";
import { useTheme } from "@emotion/react";

export const useClasses = (stylesElement: unknown) => {
  const theme = useTheme();
  return useMemo(() => {
    const rawClasses =
      typeof stylesElement === "function"
        ? stylesElement(theme)
        : stylesElement;
    const prepared: {
      [name: string]: string;
    } = {};

    Object.entries(rawClasses).forEach(([key, value = {}]) => {
      prepared[key] = css(value as TemplateStringsArray);
    });

    return prepared;
  }, [stylesElement, theme]);
};
