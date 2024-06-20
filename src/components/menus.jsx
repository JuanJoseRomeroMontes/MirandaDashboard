import styled from "styled-components";
import { LeftMenu } from "./leftMenu";
import { TopMenu } from "./topMenu";
import { useState } from "react";

const Page = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  .content
  {
    width: 100%;
    overflow-wrap: anywhere;
  }
`;

export const Menus = ({ title: Title, children, ...rest }) => {

    const [leftMenuClosed, setLeftMenuClosed] = useState(false);

    const toggleLeftMenu = () => {
        setLeftMenuClosed(!leftMenuClosed);
    };

    return(
        <Page>
            <LeftMenu leftMenuClosed={leftMenuClosed}/>
            <div className="content">
                <TopMenu toggleLeftMenu={toggleLeftMenu}/>
                {children}
            </div>
        </Page>
    )
};