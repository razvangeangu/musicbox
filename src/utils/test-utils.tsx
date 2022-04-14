import { render } from '@testing-library/react';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { configureAppStore } from 'store/configureStore';
import { ThemeProvider } from 'styles/theme/ThemeProvider';

const AllTheProviders = ({ children }: any) => (
  <Provider store={configureAppStore()}>
    <ThemeProvider>
      <HelmetProvider>
        <React.StrictMode>{children}</React.StrictMode>
      </HelmetProvider>
    </ThemeProvider>
  </Provider>
);

const customRender = (ui: React.ReactElement, options?) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender as render };
