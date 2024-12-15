"use client"
import styled from "styled-components";

interface ButtonProps {
  variant?: "primary" | "secondary" | "default" | "outline";
}

const Button = styled.button<ButtonProps>`
  background-color: ${({ theme, variant }) =>
    variant === "primary"
      ? theme.colors.mediumBlue
      : variant === "secondary"
        ? theme.colors.lightBlue
        : variant === "outline"
          ? "transparent"
          : theme.colors.gray};
  color: ${({ theme, variant }) =>
    variant === "outline" ? theme.colors.darkBlue : theme.colors.white};
  padding: ${({ theme }) => theme.spacings.medium};
  border: ${({ theme, variant }) =>
    variant === "outline"
      ? `2px solid ${theme.colors.darkBlue}`
      : "none"};
  border-radius: ${({ theme }) => theme.radii.medium};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 16px;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  min-width: 150px;

  &:hover {
    background-color: ${({ theme, variant }) =>
    variant === "primary"
      ? theme.colors.darkBlue
      : variant === "secondary"
        ? theme.colors.mediumBlue
        : variant === "outline"
          ? theme.colors.darkBlue
          : theme.colors.lightGray1};
    color: ${({ theme, variant }) =>
    variant === "outline" ? theme.colors.white : theme.colors.white};
    border-color: ${({ theme, variant }) =>
    variant === "outline" ? theme.colors.darkBlue : "none"};
  }

  &:disabled {
    background-color: ${({ theme }) =>
    theme.colors.lightGray1};
    color: ${({ theme, variant }) =>
    variant === "outline" ? theme.colors.lightGray1 : theme.colors.white};
    border-color: ${({ theme, variant }) =>
    variant === "outline" ? theme.colors.lightGray1 : "none"};
    cursor: not-allowed;
  }
`;

export default Button;
