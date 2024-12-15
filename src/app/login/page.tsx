"use client";

import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "@/components/ui/Button";
import {
    FormContainer,
    InputWrapper,
    Input,
    Label,
    ErrorMessage,
    Wrapper
} from "@/components/Auth/Login/Login.style";
import { LoadingIcon } from "@/components/LoadingIcon";

interface ILoginInputs {
    username: string;
    password: string;
}

const schema = yup.object().shape({
    username: yup
        .string()
        .required("Usuário é obrigatório")
        .matches(/^[a-zA-Z0-9]+$/, "Usuário deve conter apenas letras e números"),
    password: yup
        .string()
        .required("Senha é obrigatória")
        .min(5, "Senha deve ter no mínimo 5 caracteres"),
});

export default function LoginPage() {
    const { control, handleSubmit, formState: { errors } } = useForm<ILoginInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<ILoginInputs> = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post("/api/auth/login", data);
            console.log(response)
            if (response.status === 200) {
                toast.success("Login realizado com sucesso!");
                router.push("/admin/fornecedores");
            }
        } catch (error) {
            console.error("Erro no login:", error);
            toast.error("Credenciais inválidas ou erro no servidor.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Wrapper>
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
                <h1 style={{ textAlign: "center", color: "#333", fontSize: "24px" }}>
                    Bem-vindo de volta!
                </h1>

                <InputWrapper>
                    <Label htmlFor="username" isRequired>
                        Usuário
                    </Label>
                    <Controller
                        name="username"
                        control={control}
                        render={({ field }) => <Input {...field} />}
                    />
                    {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
                </InputWrapper>

                <InputWrapper>
                    <Label htmlFor="password" isRequired>
                        Senha
                    </Label>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => <Input type="password" {...field} />}
                    />
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                </InputWrapper>

                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? <LoadingIcon /> : "Entrar"}
                </Button>

            </FormContainer>
        </Wrapper>
    );
}
