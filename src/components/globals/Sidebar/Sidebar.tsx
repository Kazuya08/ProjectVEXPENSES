"use client"
import React from 'react';
import { SidebarContainer, MenuItem, MenuText, MenuIcon, MenuLogo, LogoutButton } from './Sidebar.styles';
import { LuClipboardList, LuGauge, LuHexagon, LuLogOut, LuTrello } from 'react-icons/lu';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'
import axios from 'axios';
import { toast } from 'react-toastify';

interface SidebarProps {
    isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
    const currentPath = usePathname();
    const router = useRouter();


    const handleLogout = async () => {
        try {
            await axios.post("/api/auth/logout");
            toast.success("Logout realizado com sucesso!");
            router.push("/login");

        } catch (error) {
            console.error("Error logout:", error);
            toast.error("Erro ao realizar logout.");
        }
    };

    return (
        <SidebarContainer isOpen={isOpen ? true : undefined}>
            <MenuLogo>
                <MenuIcon>
                    <LuHexagon />
                </MenuIcon>
            </MenuLogo>


            <Link href="/admin/fornecedores">
                <MenuItem isActive={currentPath === "/admin/fornecedores"}>
                    <MenuIcon>
                        <LuClipboardList />
                    </MenuIcon>
                    <MenuText>Fornecedores</MenuText>
                </MenuItem>
            </Link>
            <MenuItem>
                <MenuIcon>
                    <LuTrello />
                </MenuIcon>
                <MenuText>Dashboard</MenuText>
            </MenuItem>

            <LogoutButton onClick={handleLogout}>
                <MenuIcon>
                    <LuLogOut />
                </MenuIcon>
                <MenuText>Logout</MenuText>
            </LogoutButton>
        </SidebarContainer>
    );
};

export default Sidebar;
