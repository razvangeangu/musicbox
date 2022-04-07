/**
 *
 * Layout
 *
 */
import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components/macro';

interface LayoutProps {}

export function Layout(props: LayoutProps) {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

const Container = styled.main`
  padding: 2rem;
`;
