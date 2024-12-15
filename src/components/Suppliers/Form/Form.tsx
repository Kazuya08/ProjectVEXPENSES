"use client"

import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler, useFieldArray } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { ContactContainer, DeleteButton, Divider, ErrorMessage, FormContainer, Input, InputWrapper, MaskInput, Label } from './Form.styles';
import Button from '@/components/ui/Button';
import { LuTrash2 } from 'react-icons/lu';
import api from '@/services/api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { ISupplier } from '@/types/supplier';
import { LoadingIcon } from '@/components/LoadingIcon';

interface IFormInputs {
    name: string;
    description?: string;
    contacts?: { name: string; phone: string }[];
    address: {
        zip_code: string;
        state: string;
        city: string;
        street: string;
        number: number;
        reference?: string;
    };
}

interface FormFornecedorProps {
    supplierData?: ISupplier;
}

const schema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório').matches(/^[a-zA-Z0-9\s]+$/, 'Nome deve ser alfanumérico'),
    description: yup.string(),
    contacts: yup.array().of(
        yup.object().shape({
            name: yup.string().required('Nome é obrigatório').matches(/^[a-zA-Z0-9\sÀ-ÿ]*$/, 'Nome deve ser alfabético'),
            phone: yup.string().required('Telefone é obrigatório').matches(/^\d{10,11}$/, 'Telefone deve ter 10 ou 11 dígitos')
                .transform((value) => value.replace(/\D/g, '')),
        })
    ).min(1, 'Pelo menos 1 contato é obrigatório'),
    address: yup.object().shape({
        zip_code: yup.string()
            .required('CEP é obrigatório')
            .matches(/^\d{8}$/, 'CEP inválido')
            .transform((value) => value.replace(/\D/g, '')),
        state: yup.string().required('Estado é obrigatório').matches(/^[A-Z]{2}$/, 'Estado deve ter 2 caracteres maiúsculos'),
        city: yup.string().required('Cidade é obrigatória').matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'Cidade deve ser alfabética'),
        street: yup.string().required('Logradouro é obrigatório'),
        number: yup.number().required('Número é obrigatório').positive('Número deve ser positivo').integer('Número deve ser inteiro'),
        reference: yup.string().matches(/^[a-zA-Z0-9\sÀ-ÿ]*$/, 'Referência deve ser alfanumérica').optional(),
    })
})



export default function FormFornecedor({ supplierData }: FormFornecedorProps) {
    const router = useRouter();
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const { control, handleSubmit, setValue, formState: { errors }, reset } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: supplierData || {
            name: "",
            contacts: [
                {
                    name: "",
                    phone: "",
                }
            ],
            address: {
                zip_code: "",
                state: "",
                city: "",
                street: "",
            }
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "contacts",
    });

    const fetchCEP = async (cep: string) => {
        try {
            if (cep) {
                const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                if (response.data) {
                    setValue('address.street', response.data.logradouro);
                    setValue('address.city', response.data.localidade);
                    setValue('address.state', response.data.uf);
                }
            }
        } catch (error) {
            console.error('Erro ao buscar CEP:', error);
            toast.error('Erro ao buscar CEP.');
        }
    };

    const onSubmitCreate: SubmitHandler<IFormInputs> = async (data) => {
        setLoadingSubmit(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500)); // timeout para simular latencia da api externa

            await api.post('/suppliers', data);

            toast.success('Fornecedor cadastrado com sucesso!');

            reset();

            router.push('/admin/fornecedores');

        } catch (error) {
            console.error('Error create supplier:', error);
            toast.error('Erro! Algo deu errado.');
        } finally {
            setLoadingSubmit(false);
        }
    };

    const onSubmitUpdate: SubmitHandler<IFormInputs> = async (data) => {
        setLoadingSubmit(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));

            await api.put(`/suppliers/${supplierData?.id}`, data);

            toast.success('Fornecedor atualizado com sucesso!');

            reset();

            router.push('/admin/fornecedores');

        } catch (error) {
            console.error('Error update supplier:', error);
            toast.error('Erro! Algo deu errado.');
        } finally {
            setLoadingSubmit(false);
        }
    };

    return (
        <FormContainer onSubmit={supplierData ? handleSubmit(onSubmitUpdate) : handleSubmit(onSubmitCreate)}>
            <InputWrapper>
                <Label htmlFor="name" isRequired>
                    Nome
                </Label>
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                />
                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            </InputWrapper>

            <InputWrapper>
                <Label htmlFor="description">Descrição</Label>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                />
                {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
            </InputWrapper>

            <Label htmlFor="contacts">
                Contato (ao menos 1 obrigatório)
            </Label>
            {fields.map((item, index) => (
                <ContactContainer key={item.id}>
                    <InputWrapper>
                        <Label htmlFor="name" isRequired>
                            Nome
                        </Label>
                        <Controller
                            name={`contacts.${index}.name`}
                            control={control}
                            render={({ field }) => <Input {...field} />}
                        />
                        {errors.contacts && errors.contacts[index]?.name && <ErrorMessage>{errors.contacts[index].name.message}</ErrorMessage>}
                    </InputWrapper>

                    <InputWrapper>
                        <Label htmlFor="phone" isRequired>
                            Telefone
                        </Label>
                        <Controller
                            name={`contacts.${index}.phone`}
                            control={control}
                            rules={{
                                required: 'Telefone é obrigatório',
                                pattern: {
                                    value: /^\d{10,11}$/,
                                    message: 'Telefone deve ter 10 ou 11 dígitos',
                                },
                            }}
                            render={({ field }) => (
                                <MaskInput
                                    {...field}
                                    mask="(11) 11111-1111"
                                    placeholder="(__) _____-____"
                                />
                            )}
                        />
                        {errors.contacts && errors.contacts[index]?.phone && <ErrorMessage>{errors.contacts[index].phone.message}</ErrorMessage>}
                    </InputWrapper>

                    {index !== 0 &&
                        <>
                            <Divider />

                            <DeleteButton type="button" onClick={() => remove(index)}>
                                <LuTrash2 />
                            </DeleteButton>
                        </>
                    }
                </ContactContainer>
            ))}
            <Button variant="primary" type="button" onClick={() => append({ name: '', phone: '' })}>Adicionar Contato</Button>

            <InputWrapper>
                <Label htmlFor="zip_code" isRequired>
                    CEP
                </Label>
                <Controller
                    name="address.zip_code"
                    control={control}
                    render={({ field }) => (
                        <MaskInput
                            {...field}
                            onBlur={() => fetchCEP(field.value)}
                            mask="#####-###"
                            placeholder="_____ - ___"
                            width="120px"
                        />
                    )}
                />
                {errors.address && <ErrorMessage>{errors.address.zip_code?.message}</ErrorMessage>}
            </InputWrapper>

            <InputWrapper>
                <Label htmlFor="state" isRequired>
                    Estado
                </Label>
                <Controller
                    name="address.state"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                />
                {errors.address && <ErrorMessage>{errors.address.state?.message}</ErrorMessage>}
            </InputWrapper>

            <InputWrapper>
                <Label htmlFor="city" isRequired>
                    Cidade
                </Label>
                <Controller
                    name="address.city"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                />
                {errors.address && <ErrorMessage>{errors.address.city?.message}</ErrorMessage>}
            </InputWrapper>

            <InputWrapper>
                <Label htmlFor="street" isRequired>
                    Logradouro
                </Label>
                <Controller
                    name="address.street"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                />
                {errors.address && <ErrorMessage>{errors.address.street?.message}</ErrorMessage>}
            </InputWrapper>

            <InputWrapper>
                <Label htmlFor="number" isRequired>
                    Número
                </Label>
                <Controller
                    name="address.number"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                />
                {errors.address && <ErrorMessage>{errors.address.number?.message}</ErrorMessage>}
            </InputWrapper>

            <InputWrapper>
                <Label htmlFor="reference">
                    Referência
                </Label>
                <Controller
                    name="address.reference"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                />
                {errors.address && <ErrorMessage>{errors.address.reference?.message}</ErrorMessage>}
            </InputWrapper>

            <Button variant="primary" type="submit" disabled={loadingSubmit}>
                {loadingSubmit ?
                    <LoadingIcon />
                    : supplierData ? 'Atualizar Fornecedor' : 'Cadastrar Fornecedor'
                }
            </Button>
        </FormContainer>
    );
};
