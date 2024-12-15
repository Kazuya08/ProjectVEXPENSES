"use client"
import React from 'react';
import { SidebarContainer, MenuItem, MenuText, MenuIcon, MenuLogo } from './Sidebar.styles';
import { LuClipboardList, LuGauge, LuHexagon, LuTrello } from 'react-icons/lu';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

interface SidebarProps {
    isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
    const currentPath = usePathname()

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
        </SidebarContainer>
    );
};

export default Sidebar;
