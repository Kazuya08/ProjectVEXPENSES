"use client"

import styled from "styled-components";

export const Hr = styled.hr`
  border: none;
  border-top: 2px solid ${(props) => props.theme.colors.lightGray1}; 
  margin: 30px 0; 
  width: 100%;
`;