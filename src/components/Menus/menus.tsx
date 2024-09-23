import styled from "styled-components";
import { LeftMenu } from "./leftMenu";
import { TopMenu } from "./topMenu";
import { ReactNode, useEffect, useState } from "react";

const Page = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  .content
  {
    background-color: #f8f8f8;
    width: 100%;
    height: 100%;
    overflow-wrap: anywhere;
    display: flex;
    flex-direction: column;
  }
`;

interface MenusProps {
    title: string;
    children: ReactNode;
}

export const Menus: React.FC<MenusProps> = ({ title: Title, children }) => {

    const [leftMenuClosed, setLeftMenuClosed] = useState(false);

    const toggleLeftMenu = () => {
        setLeftMenuClosed(!leftMenuClosed);
    };

    return(
        <Page>
            <LeftMenu leftMenuClosed={leftMenuClosed}/>
            <div className="content">
                <TopMenu toggleLeftMenu={toggleLeftMenu} title={Title}/>
                <div style={{overflow: "auto"}}>
                    {children}
                </div>
            </div>
        </Page>
    )
};