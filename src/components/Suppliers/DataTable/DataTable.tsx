"use client"

import api from "@/services/api";
import { IContact, ISupplier } from "@/types/supplier";
import { useEffect, useState } from "react";
import { ButtonWrapper, ContactButtonContainer, GoogleMapsLink, PaginationButton, PaginationNumberButton, PaginationWrapper, SearchContainer, SearchIcon, SearchInput, Table, TableWrapper, TdEmptyData, WhatsAppButton } from "./DataTable.styles";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/globals/ButtonGroups.style";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AiOutlineWhatsApp } from "react-icons/ai";
import Papa from "papaparse";
import { LoadingIcon } from "@/components/LoadingIcon";
import { FiMapPin } from "react-icons/fi";

const DataTable: React.FC = () => {
    const router = useRouter();
    const [loadingExportCsv, setLoadingExportCsv] = useState(false);
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
        router.push(`/admin/fornecedores/${id}`)
    };

    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/suppliers/${id}`);

            toast.success('Fornecedor deletado com sucesso!');

            await new Promise((resolve) => setTimeout(resolve, 1500));

            reloadPage();

        } catch (error) {
            console.error('Error delete supplier:', error);
            toast.error('Erro! Algo deu errado.');
        }
    };

    const handleCreate = () => {
        router.push("/admin/fornecedores/adicionar-fornecedor")
    };

    const handleExportCSV = async () => {
        setLoadingExportCsv(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));

            const { data }: { data: ISupplier[] } = await api.get('/suppliers');

            const csvData = Papa.unparse(data.map(supplier => ({
                Name: supplier.name,
                Description: supplier.description,
                Contacts: supplier.contacts.map(contact => `${contact.name} (${contact.phone})`).join(', '),
                Address: `${supplier.address.street}, ${supplier.address.number} - ${supplier.address.city}, ${supplier.address.state}`
            })));

            const blob = new Blob([csvData], { type: 'text/csv' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'fornecedores.csv';
            link.click();
        } catch (error) {
            console.error('Error export csv suppliers:', error);
            toast.error('Erro ao exportar!');
        } finally {
            setLoadingExportCsv(false);
        }
    };


    return (
        <div>
            <ButtonWrapper>
                <Button variant="primary" onClick={handleExportCSV}>
                    {loadingExportCsv ? <LoadingIcon /> : 'Exportar para CSV'}
                </Button>
                <Button variant="primary" onClick={handleCreate}>
                    Cadastrar fornecedor
                </Button>
            </ButtonWrapper>
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
                                            <ContactButtonContainer key={index}>
                                                <p>{contact.name} ({contact.phone})</p>
                                                {contact.phone && (
                                                    <WhatsAppButton href={`https://wa.me/${contact.phone.replace(/\D/g, '')}?text=Olá,%20${contact.name}`} target="_blank" rel="noopener noreferrer" >
                                                        <AiOutlineWhatsApp size={15} />
                                                    </WhatsAppButton>
                                                )}
                                            </ContactButtonContainer>
                                        ))}
                                    </td>
                                    <td>
                                        {supplier.address.street}, {supplier.address.number} -{' '}
                                        {supplier.address.city}, {supplier.address.state}
                                        <GoogleMapsLink
                                            href={`https://www.google.com/maps?q=${encodeURIComponent(
                                                `${supplier.address.street}, ${supplier.address.number}, ${supplier.address.city}, ${supplier.address.state}`
                                            )}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <FiMapPin size={20} />
                                        </GoogleMapsLink>
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
        </div>
    );
};

export default DataTable;