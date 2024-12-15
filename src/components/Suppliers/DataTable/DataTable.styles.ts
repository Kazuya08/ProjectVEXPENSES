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

  @media (max-width: 768px) {
    min-width: 100%;
  }
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
    th,
    td {
      padding: 8px 10px;
    }

    tr {
      display: block;
      margin-bottom: 12px;
    }

    td {
      display: block;
      width: 100%;
      text-align: left;
      padding-left: 10px;
      position: relative;
      border-bottom: none; /* Remove the bottom border to avoid cluttering */
    }

    td::before {
      content: attr(data-label);
      font-weight: bold;
      position: absolute;
      left: 10px;
      top: 10px;
    }
    
    td:first-child {
      padding-top: 30px; /* Adds spacing to the first column when it's used as a label */
    }
  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  margin-top: 10px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
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

    @media (max-width: 768px) {
      padding: 6px 10px;
    }
`;

export const PaginationButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.darkBlue};
  border: ${({ theme }) => `${theme.colors.darkBlue} 1px solid`};
  border-radius: 4px;
  padding: 8px 12px;
  margin: 0 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkBlue};
    color: white;
  }

  @media (max-width: 768px) {
    padding: 6px 10px;
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

  @media (max-width: 768px) {
    width: 100%;
    margin: 10px;
    padding: 10px;
  }
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

  @media (max-width: 768px) {
    width: 100%;
    font-size: 14px;
  }
`;

export const TdEmptyData = styled.td`
  text-align: center;
  padding: 16px;
  @media (max-width: 768px) {
    padding: 12px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;

  @media (max-width: 768px) {
    justify-content: end;
    padding-right: 0px;
  }
`;
