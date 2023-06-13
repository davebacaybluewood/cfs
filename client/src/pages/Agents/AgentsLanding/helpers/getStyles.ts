import { Theme } from "@mui/material";

function getStyles(name: string, language: readonly string[], theme: Theme) {
  return {
    fontWeight:
      language.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default getStyles;
