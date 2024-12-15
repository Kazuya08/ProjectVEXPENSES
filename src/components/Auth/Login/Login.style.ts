import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.darkBlue}, ${theme.colors.mediumBlue}, ${theme.colors.lightBlue})`};
  padding: 20px;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 400px;
  padding: 30px;
  background-color: ${props => props.theme.colors.white}; 
  border-radius: ${props => props.theme.radii.medium}; 
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03); 
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label.withConfig({
    shouldForwardProp: (prop) => prop !== "isRequired",
}) <{ isRequired?: boolean }>`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.darkBlue}; 
  text-transform: uppercase;
  letter-spacing: 1px;
  &::after {
    content: "${({ isRequired }) => (isRequired ? ' *' : '')}";
    color: #e74c3c;
  }
`;

export const Input = styled.input`
  padding: 12px 15px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: ${({ theme }) => theme.radii.small};
  background-color: #f9f9f9;
  transition: all 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.mediumBlue};
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1); 
  }

  &:disabled {
    background-color: #f2f2f2;
  }
`;

export const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 4px;
`;

export const Button = styled.button`
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.mediumBlue};
  border: none;
  border-radius: ${({ theme }) => theme.radii.medium};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightBlue};
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    background-color: #b0c4de;
    cursor: not-allowed;
  }
`;

