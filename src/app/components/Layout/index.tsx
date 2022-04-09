/**
 *
 * Layout
 *
 */
import { Footer } from 'app/components/Footer';
import { NavBar } from 'app/components/NavBar';
import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components/macro';
import { FOOTER_SIZE, NAV_BAR_SIZE } from 'styles/constants';

interface LayoutProps {}

export function Layout(props: LayoutProps) {
  return (
    <>
      <NavBar />

      <Container>
        <Outlet />
      </Container>

      <Footer />
    </>
  );
}

const Container = styled.main`
  height: calc(100vh);
  overflow-y: auto;
  padding: ${NAV_BAR_SIZE / 16}rem 0 ${FOOTER_SIZE / 16}rem;
`;
