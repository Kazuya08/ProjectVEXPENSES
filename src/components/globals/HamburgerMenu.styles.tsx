"use client"
import styled from "styled-components";

export const HamburgerMenu = styled.div`
  display: none;
  cursor: pointer;
  font-size: 24px;

  @media (max-width: 768px) {
    display: flex;
  }
`;