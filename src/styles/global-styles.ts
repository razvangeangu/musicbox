import { createGlobalStyle } from 'styled-components/macro';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: -apple-system,BlinkMacSystemFont,'Apple Color Emoji','SF Pro','SF Pro Icons','Helvetica Neue',Helvetica,Arial,sans-serif;
  }

  /* stylelint-disable-next-line selector-max-id */
  #root {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: inherit;
    line-height: 1.5em;
  }

  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
  }

  ul {
    margin: 0;
    padding-left: 1.25rem;
  }

  a {
    text-decoration: none;
  }
`;
