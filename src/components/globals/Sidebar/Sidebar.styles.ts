"use client"
import styled from 'styled-components';

interface SidebarProps {
  isOpen?: boolean;
}
export const SidebarContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen',
}) <SidebarProps>`
  width: ${({ isOpen }) => (isOpen ? '250px' : '60px')};
  height: 100%;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  color: ${({ theme }) => theme.colors.white};
  padding-top: 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  overflow: hidden;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.medium};
  transition: width 0.3s ease, background-color 0.3s ease, padding 0.3s ease;

  @media (max-width: 768px) {
    width: ${({ isOpen }) => (isOpen ? '250px' : '60px')};
    display: flex;
    transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
    transition: transform 0.3s ease;
  }
`;

export const MenuItem = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isActive",
}) <{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.lightGray1 : "transparent"};
  color: ${({ isActive, theme }) => (isActive ? theme.colors.darkBlue : "white")};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightGray1};
    color: ${({ theme }) => theme.colors.darkBlue};
  }
`;


export const MenuLogo = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: transparent;
  color: "white";
  transition: background-color 0.3s ease;
`;

export const MenuText = styled.span`
  display: inline;
  margin-left: 20px;
  opacity: 1;
  transition: opacity 0.3s ease;
`;

export const MenuIcon = styled.div`
  font-size: 24px; 
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
`;

export const LogoutButton = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.mediumBlue}; 
  color: ${({ theme }) => theme.colors.white};
  margin-top: auto; 
  margin-bottom: 100px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightBlue};
  }
`;
