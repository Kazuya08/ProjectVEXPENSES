"use client"
import styled from 'styled-components';

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radii.medium};
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: ${({ theme }) => theme.spacings.large};
  margin: ${({ theme }) => theme.spacings.medium} auto;
  max-width: 400px;
`;

export const CardHeader = styled.div`
  font-size: 1.25rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.darkBlue};
  margin-bottom: ${({ theme }) => theme.spacings.small};
`;

export const CardBody = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.gray};
  font-size: 1rem;
  line-height: 1.5;
`;
