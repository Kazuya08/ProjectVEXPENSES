"use client"

import React from 'react';
import { useForm, Controller, SubmitHandler, useFieldArray } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { ContactContainer, DeleteButton, Divider, ErrorMessage, FormContainer, Input, InputWrapper, MaskInput } from './Form.styles';
import Button from '@/components/ui/Button';
import { LuTrash2 } from 'react-icons/lu';
import api from '@/services/api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface IFormInputs {
    name: string;
    description?: string;
    contacts?: { name: string; phone: string }[];
    address: {
        cep: string;
        state: string;
        city: string;
        street: string;
        number: number;
        reference?: string;
    };
}

const schema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório').matches(/^[a-zA-Z0-9\s]+$/, 'Nome deve ser alfanumérico'),
    description: yup.string(),
    contacts: yup.array().of(
        yup.object().shape({
            name: yup.string().required('Nome é obrigatório').matches(/^[a-zA-Z\s]+$/, 'Nome deve ser alfabético'),
            phone: yup.string().required('Telefone é obrigatório').matches(/^\d{10,11}$/, 'Telefone deve ter 10 ou 11 dígitos')
                .transform((value) => value.replace(/\D/g, '')),
        })
    ).min(1, 'Pelo menos 1 contato é obrigatório'),
    address: yup.object().shape({
        cep: yup.string()
            .required('CEP é obrigatório')
            .matches(/^\d{8}$/, 'CEP inválido')
            .transform((value) => value.replace(/\D/g, '')),
        state: yup.string().required('Estado é obrigatório').matches(/^[A-Z]{2}$/, 'Estado deve ter 2 caracteres maiúsculos'),
        city: yup.string().required('Cidade é obrigatória').matches(/^[a-zA-ZÀ-ÿ\s]+$/, 'Cidade deve ser alfabética'),
        street: yup.string().required('Logradouro é obrigatório'),
        number: yup.number().required('Número é obrigatório').positive('Número deve ser positivo').integer('Número deve ser inteiro'),
        reference: yup.string().matches(/^[a-zA-Z0-9\s]*$/, 'Referência deve ser alfanumérica').optional(),
    })
})

export default function FormFornecedor() {
    const router = useRouter();
    const { control, handleSubmit, setValue, formState: { errors }, reset } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            contacts: [
                {
                    name: "",
                    phone: "",
                }
            ],
            address: {
                cep: "",
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
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            if (response.data) {
                setValue('address.street', response.data.logradouro);
                setValue('address.city', response.data.localidade);
                setValue('address.state', response.data.uf);
            }
        } catch (error) {
            console.error('Erro ao buscar CEP:', error);
        }
    };

    const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
        try {
            await api.post('/suppliers', data);

            toast.success('Fornecedor cadastrado com sucesso!');

            reset();

            router.push('/admin/fornecedores');

        } catch (error) {
            console.error('Error create supplier:', error);
            toast.error('Erro! Algo deu errado.');
        }
    };

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <label>Nome*</label>
            <Controller
                name="name"
                control={control}
                render={({ field }) => <Input {...field} />}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

            <label>Descrição</label>
            <Controller
                name="description"
                control={control}
                render={({ field }) => <Input {...field} />}
            />
            {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}

            <label>Contato (ao menos 1 obrigatório)</label>
            {fields.map((item, index) => (
                <ContactContainer key={item.id}>
                    <InputWrapper>
                        <label>Nome*</label>
                        <Controller
                            name={`contacts.${index}.name`}
                            control={control}
                            render={({ field }) => <input {...field} />}
                        />
                        {errors.contacts && errors.contacts[index]?.name && <ErrorMessage>{errors.contacts[index].name.message}</ErrorMessage>}
                    </InputWrapper>

                    <InputWrapper>
                        <label>Telefone*</label>
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

            <label>CEP*</label>
            <Controller
                name="address.cep"
                control={control}
                render={({ field }) => (
                    <MaskInput
                        {...field}
                        onBlur={() => fetchCEP(field.value)}
                        mask="#####-###"
                        placeholder="_____ - ___"
                    />
                )}
            />
            {errors.address && <ErrorMessage>{errors.address.cep?.message}</ErrorMessage>}

            <label>Estado*</label>
            <Controller
                name="address.state"
                control={control}
                render={({ field }) => <Input {...field} />}
            />
            {errors.address && <ErrorMessage>{errors.address.state?.message}</ErrorMessage>}

            <label>Cidade*</label>
            <Controller
                name="address.city"
                control={control}
                render={({ field }) => <Input {...field} />}
            />
            {errors.address && <ErrorMessage>{errors.address.city?.message}</ErrorMessage>}

            <label>Logradouro*</label>
            <Controller
                name="address.street"
                control={control}
                render={({ field }) => <Input {...field} />}
            />
            {errors.address && <ErrorMessage>{errors.address.street?.message}</ErrorMessage>}

            <label>Número*</label>
            <Controller
                name="address.number"
                control={control}
                render={({ field }) => <Input {...field} />}
            />
            {errors.address && <ErrorMessage>{errors.address.number?.message}</ErrorMessage>}

            <label>Referência</label>
            <Controller
                name="address.reference"
                control={control}
                render={({ field }) => <Input {...field} />}
            />
            {errors.address && <ErrorMessage>{errors.address.reference?.message}</ErrorMessage>}

            <Button variant="primary" type="submit">Cadastrar Fornecedor</Button>
        </FormContainer>
    );
};
