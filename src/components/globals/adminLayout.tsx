'use client';

import { useState } from 'react';
import { ContentWrapper } from "@/components/globals/ContentWrapper";
import { HamburgerMenu, ItemMenu } from '@/components/globals/Header.styles';
import { Header } from "@/components/globals/Header.styles";
import { LayoutContainer } from "@/components/globals/LayoutContainer.styles";
import { MainContent } from "@/components/globals/MainContent.styles";
import Sidebar from './Sidebar/Sidebar';
import { LuHexagon, LuMenu } from 'react-icons/lu';
import styled from 'styled-components';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <LayoutContainer>
      <Sidebar isOpen={sidebarOpen} />

      <ContentWrapper>
        <MainContent isOpen={sidebarOpen}>
          <Header>
            <HamburgerMenu onClick={toggleSidebar}>
              <LuMenu />
            </HamburgerMenu>
            <ItemMenu>
              <LuHexagon />
            </ItemMenu>
          </Header>

          {children}
        </MainContent>
      </ContentWrapper>
    </LayoutContainer>
  );
};