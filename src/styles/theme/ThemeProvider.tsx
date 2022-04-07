import React from 'react';
import { useSelector } from 'react-redux';
import { useInjectReducer } from 'redux-injectors';
// eslint-disable-next-line no-restricted-imports
import { ThemeProvider as OriginalThemeProvider } from 'styled-components';
import { reducer, selectTheme, themeSliceKey } from 'styles/theme/slice';

export const ThemeProvider = (props: { children: React.ReactChild }) => {
  useInjectReducer({ key: themeSliceKey, reducer });

  const theme = useSelector(selectTheme);
  const { children } = props;
  return (
    <OriginalThemeProvider theme={theme}>
      {React.Children.only(children)}
    </OriginalThemeProvider>
  );
};
