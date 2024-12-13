"use client"
import styled from "styled-components";

interface MainContentProps {
  isOpen: boolean;
}

export const MainContent = styled.main<MainContentProps>`
  margin-left: ${({ isOpen }: { isOpen: boolean }) => (isOpen ? '250px' : '60px')}; 
  padding: ${({ theme }) => theme.spacings.medium};
  flex: 1;
  transition: margin-left 0.3s ease, padding-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;