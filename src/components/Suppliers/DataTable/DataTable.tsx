"use client"

import api from "@/services/api";
import { IContact, ISupplier } from "@/types/supplier";
import { useEffect, useState } from "react";
import { PaginationButton, PaginationNumberButton, PaginationWrapper, SearchContainer, SearchIcon, SearchInput, Table, TableWrapper, TdEmptyData } from "./DataTable.styles";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/globals/ButtonGroups.style";
import { toast } from "react-toastify";

const DataTable: React.FC = () => {
    const [data, setData] = useState<ISupplier[]>([]);
    const [filteredData, setFilteredData] = useState<ISupplier[]>([]);
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const { data } = await api.get('/suppliers', {
                    params: {
                        _page: currentPage,
                        _per_page: itemsPerPage,
                    },
                });

                const totalItems = data['pages'];
                const suppliers = data.data;

                setData(suppliers);
                setFilteredData(suppliers);
                if (totalItems) {
                    setTotalPages(totalItems);
                }
            } catch (error) {
                console.error('Error get suppliers:', error);
            }
        };

        fetchSuppliers();
    }, [currentPage]);

    useEffect(() => {
        const filtered = data.filter((supplier) =>
            supplier.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchText, data]);

    const reloadPage = () => {
        window.location.reload()
    };


    const handleEdit = (id: number) => {
    };

    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/suppliers/${id}`);

            toast.success('Fornecedor deletado com sucesso!');
            reloadPage();

        } catch (error) {
            console.error('Error delete supplier:', error);
            toast.error('Erro! Algo deu errado.');
        }
    };

    return (
        <TableWrapper>
            <SearchContainer>
                <SearchIcon />
                <SearchInput
                    type="text"
                    placeholder="Buscar por nome"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </SearchContainer>
            <Table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Contatos</th>
                        <th>Endereço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((supplier) => (
                            <tr key={supplier.id}>
                                <td>{supplier.name}</td>
                                <td>{supplier.description}</td>
                                <td>
                                    {supplier.contacts.map((contact: IContact, index: number) => (
                                        <p key={index}>
                                            {contact.name} ({contact.phone})
                                        </p>
                                    ))}
                                </td>
                                <td>
                                    {supplier.address.street}, {supplier.address.number} -{' '}
                                    {supplier.address.city}, {supplier.address.state}
                                </td>
                                <td>
                                    <ButtonGroup gap="16px" direction="row" align="center">
                                        <Button variant="outline" onClick={() => handleEdit(supplier.id)}>
                                            <LuPencil size={20} />
                                        </Button>
                                        <Button variant="outline" onClick={() => handleDelete(supplier.id)}>
                                            <LuTrash2 size={20} />
                                        </Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <TdEmptyData colSpan={4}>
                                Nenhum dado encontrado
                            </TdEmptyData>
                        </tr>
                    )}

                </tbody>
            </Table>
            <PaginationWrapper>
                <PaginationButton
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Anterior
                </PaginationButton>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationNumberButton
                        key={page}
                        isActive={page === currentPage}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </PaginationNumberButton>
                ))}

                <PaginationButton
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Próxima
                </PaginationButton>
            </PaginationWrapper>
        </TableWrapper>
    );
};

export default DataTable;