import styled from "styled-components";
import { LeftMenu } from "./leftMenu";
import { TopMenu } from "./topMenu";
import { useEffect, useState } from "react";

const Page = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  .content
  {
    width: 100%;
    height: 100%;
    overflow-wrap: anywhere;
    display: flex;
    flex-direction: column;
  }
`;

export const Menus = ({ title: Title, children }) => {

    const [leftMenuClosed, setLeftMenuClosed] = useState(false);

    const toggleLeftMenu = () => {
        setLeftMenuClosed(!leftMenuClosed);
    };

    return(
        <Page>
            <LeftMenu leftMenuClosed={leftMenuClosed}/>
            <div className="content">
                <TopMenu toggleLeftMenu={toggleLeftMenu} title={Title}/>
                {children}
            </div>
        </Page>
    )
};