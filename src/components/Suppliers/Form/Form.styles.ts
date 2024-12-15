"use client"
import styled from "styled-components";
import MaskedInput from 'react-maskedinput';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 100%;
  margin: auto;
`;

export const Input = styled.input`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    background-color: #fff;
    
  &:focus {
    border-color: #0082f5;
  }
`;

export const ContactContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

  input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    background-color: #fff;
    margin-bottom: 10px;
  }

  & + & {
    margin-left: 1rem;
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
`;

export const ErrorMessage = styled.span`
  color: #d9534f;  
  font-size: 14px;
  font-weight: 600;
  margin-left: 5px;
  display: inline-block;
  position: relative;
`;

export const Divider = styled.div`
width: 1px;
background-color: #ddd;
height: 60px; 
margin: 0 1rem;
`;

export const MaskInput = styled(MaskedInput)`
padding: 10px;
font-size: 16px;
border: 1px solid #ddd;
border-radius: 4px;
width: 100%;

&:focus {
  border-color: #0082f5;
}
`;