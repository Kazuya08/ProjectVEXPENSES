"use client"
import styled from 'styled-components';

export const Header = styled.header`
  display: none;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacings.medium};
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 110;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: top 0.3s ease;

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const HamburgerMenu = styled.div`
  font-size: 24px; 
  cursor: pointer;
  padding: 15px;
  border-radius: 5px;
  align-items: center;
  transition: background-color 0.3s ease;
  display: flex;
  gap: 20px;  
  margin-right: auto;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.mediumBlue};
  }
`;

export const ItemMenu = styled.div`
  font-size: 24px; 
  display: flex;
  gap: 20px;  
  margin-right: 30px;
`;