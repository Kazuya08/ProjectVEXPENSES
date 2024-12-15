import styled from "styled-components";

interface ButtonGroupProps {
    gap?: string;
    direction?: "row" | "column";
    align?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around";
}

export const ButtonGroup = styled.div<ButtonGroupProps>`
  display: flex;
  flex-direction: ${({ direction = "row" }) => direction};
  align-items: ${({ align = "center" }) => align};
  gap: ${({ gap = "10px" }) => gap};
  flex-wrap: wrap; 
`;

export default ButtonGroup;
