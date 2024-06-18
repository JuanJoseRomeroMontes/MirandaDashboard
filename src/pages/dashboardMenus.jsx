import { Outlet } from "react-router";
import { LateralMenu } from "../components/lateralMenu";
import { TopMenu } from "../components/topMenu";

export const DashboardMenu = () => {

    return(
        <>
            <TopMenu/>
            <LateralMenu/>
            <Outlet/>
        </>
    )
};