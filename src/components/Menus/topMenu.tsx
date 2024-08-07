import styled from "styled-components";
import { IoLogOutOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { LuMail } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../authProvider";

const Background = styled.div`
  width: 100%;
  background-color: white;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  .topBarIcon:hover{cursor: pointer;};
`;

interface TopMenuProps {
    title: string;
    toggleLeftMenu: () => void;
}

export const TopMenu: React.FC<TopMenuProps> = ({ title, toggleLeftMenu }) => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext)

    const LogOut = () => {
        auth.authDispatch({type: 'logOut'})
        navigate("/login")
    }

    return(
        <>
            <Background>
                <IconContext.Provider value={{ size: '24px', className: "topBarIcon"}}>
                    <GiHamburgerMenu onClick={toggleLeftMenu}/>
                    <h1>{title}</h1>
                    <LuMail />
                    <FaRegBell />
                    <IoLogOutOutline onClick={LogOut}/>
                </IconContext.Provider>
            </Background>
        </>
    )
};