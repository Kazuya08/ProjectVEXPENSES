"use client"
import React from 'react';
import { SidebarContainer, MenuItem, MenuText, MenuIcon } from './Sidebar.styles';
import { LuClipboardList, LuGauge, LuHexagon, LuTrello } from 'react-icons/lu';

interface SidebarProps {
    isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
    return (
        <SidebarContainer isOpen={isOpen ? true : undefined}>
            <MenuItem>
                <MenuIcon>
                    <LuHexagon />
                </MenuIcon>
            </MenuItem>


            <MenuItem>
                <MenuIcon>
                    <LuClipboardList />
                </MenuIcon>
                <MenuText>Fornecedores</MenuText>
            </MenuItem>
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
