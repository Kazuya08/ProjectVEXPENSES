"use client"
import styled, { keyframes } from "styled-components";
import MaskedInput from 'react-maskedinput';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 100%;
  margin: auto;
`;

export const Label = styled.label.withConfig({
  shouldForwardProp: (prop) => prop !== "isRequired",
}) <{ isRequired?: boolean }>`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black};

  ${({ isRequired }) =>
    isRequired &&
    `
    &::after {
      content: " *"; 
      color: red;
      font-weight: bold;
    }
  `}
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  flex: 1;

  label {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: #333;
  }

  &:last-child {
    margin-right: 0;
  }

  @media (max-width: 768px) {
    width: 100%; 
    margin-right: 0;
  }
`;

export const Input = styled.input`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    background-color: #fff;
    width: ${({ width }) => width || '100%'};
    box-sizing: border-box;
    
  &:focus {
    border-color: ${({ theme }) => theme.colors.mediumBlue};
  }
`;
export const MaskInput = styled(MaskedInput) <{ width?: string }>`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: ${({ width }) => width || '100%'};
  box-sizing: border-box;

  &:focus {
    border-color: ${({ theme }) => theme.colors.mediumBlue};
  }
`;

export const ContactContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 15px;
  background-color: ${({ theme }) => theme.colors.lightGray2};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column; 
    align-items: flex-start; 
    gap: 1rem;
  }
`;


export const DeleteButton = styled.button`
  font-size: 24px;
  background-color: transparent;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #c0392b;
  }

  @media (max-width: 768px) {
    font-size: 20px;
    align-self: flex-end; 
    margin-top: 10px; 
  }
`;

export const ErrorMessage = styled.span`
  color: #d9534f;  
  font-size: 14px;
  font-weight: 600;
  margin-left: 5px;
  display: inline-block;
  position: relative;
  margin-top: 10px;
`;

export const Divider = styled.div`
  width: 1px;
  background-color: #ddd;
  height: 60px; 
  margin: 0 10px;

  @media (max-width: 768px) {
    display: none;
  }
`;