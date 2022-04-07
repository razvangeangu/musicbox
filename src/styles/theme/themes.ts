const lightTheme = {
  background: '#fff',

  text: {
    default: '#000',
  },
};

const darkTheme: Theme = {
  background: '#000',

  text: {
    default: '#fff',
  },
};

export type Theme = typeof lightTheme;

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};
