import { AiOutlineSearch } from "react-icons/ai";
import styled from "styled-components";

export const TableWrapper = styled.div`
  margin: 20px auto;
  width: 100%;
  min-width: 800px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow-x: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  table-layout: auto;

  th,
  td {
    padding: 12px 16px;
    border-bottom: 1px solid #ddd;
    word-wrap: break-word;
  }

  th {
    background-color: ${({ theme }) => theme.colors.lightGray1};
    font-weight: bold;
  }

  @media (max-width: 768px) {
    th, td {
      padding: 10px;
    }
  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  margin-top: 10px;
`;

export const PaginationNumberButton = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== "isActive",
}) <{ isActive?: boolean }>`
    background-color: ${({ isActive, theme }) =>
        isActive ? theme.colors.darkBlue : "transparent"};
    color: ${({ isActive, theme }) => (isActive ? "white" : theme.colors.darkBlue)};
    border: ${({ theme }) => `${theme.colors.darkBlue} 1px solid`};
    border-radius: 4px;
    padding: 8px 12px;
    margin: 0 4px;
    cursor: pointer;
  
    &:hover {
      background-color: ${({ theme }) => theme.colors.darkBlue};
      color: white;
    }
  `;

export const PaginationButton = styled.button`
  background-color: 'transparent';
  color: ${({ theme }) => theme.colors.darkBlue};
  border: ${({ theme }) => `${theme.colors.darkBlue} 1px solid`};
  border-radius: 4px;
  padding: 8px 12px;
  margin: 0 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkBlue};;
    color: white;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin-bottom: 16px;
  padding: 8px;
  border-radius: 8px;
  margin: 15px;
  background-color: ${({ theme }) => theme.colors.lightGray2};
  border: 1px solid ${({ theme }) => theme.colors.lightGray1};
`;

export const SearchIcon = styled(AiOutlineSearch)`
  color: ${({ theme }) => theme.colors.gray};
  margin-right: 8px;
  font-size: 20px;
`;

export const SearchInput = styled.input`
  padding: 8px 12px;
  width: 300px;
  border: none;
  outline: none;
  border-radius: 4px;
  font-size: 16px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.gray};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray};
  }
`;

export const TdEmptyData = styled.td`
    text-align: center;
    padding: 16px;
`

