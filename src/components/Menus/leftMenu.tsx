import styled from "styled-components";
import { CiUser } from "react-icons/ci";
import { LiaHotelSolid } from "react-icons/lia";
import { IoMdKey } from "react-icons/io";
import { RiContactsFill } from "react-icons/ri";
import { CiCalendar } from "react-icons/ci";
import { LuLayoutDashboard } from "react-icons/lu";
import { Link } from "react-router-dom";
import { DivImg } from "../pagesGeneralComponents";

const Background = styled.div<{$closed:boolean;}>`
  height: calc(100% - 60px);
  width: ${(props) => (props.$closed ? 0 : 15)}%;
  background-color: #ffffff;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
  box-shadow: 13px 3px 40px #00000005;
`;

const List = styled.ul`
 margin-top: 50px;
  list-style-type: none;
  color: #799283;

  li{margin-bottom: 20px}
`;

const Container = styled.div`
  width: 100%; 
  display: flex;
  align-items: center;
  font-size: 1em;
`;

const TopDiv = styled.div`
display: flex;
justify-content: space-between;
align-items: center; 
width: 90%; 
margin-left: 10%;
`
 
const User = styled.div`
  box-shadow: 0px 20px 30px #00000014;
  border-radius: 18px;
  width: 70%;
  margin: 50px auto;
  padding: 5%;

  h6{
    font-size: 1rem;
    text-align: center;
    margin: 10px 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p{
    font-size: 0.8rem;
    text-align: center;
    margin: 10px 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  button{
    width: 80%;
    margin: 0 0 10px 10%;
    background: #EBF1EF 0% 0% no-repeat padding-box;
    border-radius: 8px;
    border: none;
    padding: 8% 13%;
    color: #135846;
  }

  div{
    margin: auto;
    border-radius: 8px;
  }
`

export const LeftMenu: React.FC<{leftMenuClosed:boolean}> = ({ leftMenuClosed }) => {
  const defaultUsername = "Username";
  const defaultEmail = "Email@mail.com";

  return (
    <Background $closed={leftMenuClosed}>
      <TopDiv>
        <LiaHotelSolid style={{width:"30%", height:"auto"}}/>
        <p style={{margin:"0", width:"60%"}}>Hotel Admin Dashboard</p>
      </TopDiv>
      <List>
        <li><Container><LuLayoutDashboard style={{width:"15%", height:"auto"}}/><Link to='/' style={{ textDecoration: 'none', color:'#799283', marginLeft:"10%"}}>Dashboard</Link></Container></li>
        <li><Container><CiCalendar style={{width:"15%", height:"auto"}}/><Link to='/booking' style={{ textDecoration: 'none', color:'#799283', marginLeft:"10%"}}>Booking</Link></Container></li>
        <li><Container><IoMdKey style={{width:"15%", height:"auto"}}/><Link to='/room' style={{ textDecoration: 'none', color:'#799283', marginLeft:"10%"}}>Room</Link></Container></li>
        <li><Container><CiUser style={{width:"15%", height:"auto"}}/><Link to='/employee' style={{ textDecoration: 'none', color:'#799283', marginLeft:"10%"}}>Employee</Link></Container></li>
        <li><Container><RiContactsFill style={{width:"15%", height:"auto"}}/><Link to='/contact' style={{ textDecoration: 'none', color:'#799283', marginLeft:"10%"}}>Contacts</Link></Container></li>
      </List>
      <User>
        <DivImg $paddingTop={40} $width={40} $url={"https://profesional.tarkett.es/media/img/M/THH_25094225_25187225_001.jpg"}></DivImg>
        <h6>{defaultUsername}</h6>
        <p>{defaultEmail}</p>
        <button>Contact Us</button>
      </User>
    </Background>
  );
};