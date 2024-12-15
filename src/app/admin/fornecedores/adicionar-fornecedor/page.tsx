import { Hr } from '@/components/globals/Hr.styles'
import FormFornecedor from '@/components/Suppliers/Form/Form'
import { Title } from '@/components/Suppliers/Title/title.style'
import React from 'react'

export default function AddSupplierPage() {
    return (
        <div>
            <Title>
                <h1>Adicionar fornecedor</h1>
                <p>Preencha as informações abaixo para adicionar um novo fornecedor à sua lista.</p>
            </Title>
            <Hr />

            <FormFornecedor />

        </div>
    )
}
