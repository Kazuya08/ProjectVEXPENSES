import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingIcon = styled(AiOutlineLoading3Quarters)`
  animation: ${spin} 1s linear infinite;
  font-size: 16px; 
  color: inherit;
  margin: auto;
`;