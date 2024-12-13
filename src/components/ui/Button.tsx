"use client"
import styled from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'default';
}

const Button = styled.button<ButtonProps>`
  background-color: ${({ theme, variant }) =>
    variant === 'primary'
      ? theme.colors.mediumBlue
      : variant === 'secondary'
      ? theme.colors.lightBlue
      : theme.colors.gray};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacings.medium};
  border: none;
  border-radius: ${({ theme }) => theme.radii.medium};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme, variant }) =>
      variant === 'primary'
        ? theme.colors.darkBlue
        : variant === 'secondary'
        ? theme.colors.mediumBlue
        : theme.colors.lightGray1};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.lightGray1};
    cursor: not-allowed;
  }
`;

export default Button;
