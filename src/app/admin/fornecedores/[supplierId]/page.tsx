import { Hr } from '@/components/globals/Hr.styles'
import FormFornecedor from '@/components/Suppliers/Form/Form'
import { Title } from '@/components/Suppliers/Title/title.style'
import api from '@/services/api'
import { notFound } from 'next/navigation'
import React from 'react'

const getSupplier = async ({ supplierId }: { supplierId: string }) => {
    const response = await api.get(`/suppliers/${supplierId}`);
    return response.data;
}

export default async function UpdateSupplierPage({ params }: { params: { supplierId: string } }) {
    const { supplierId } = params;
    const supplierData = await getSupplier({ supplierId });

    console.log(supplierData)

    if (!supplierData) {
        notFound();
    }

    return (
        <div>
            <Title>
                <h1>Alterar fornecedor</h1>
                <p>Atualize as informações abaixo para modificar os dados do fornecedor selecionado.</p>
            </Title>
            <Hr />

            <FormFornecedor supplierData={supplierData} />

        </div>
    )
}
