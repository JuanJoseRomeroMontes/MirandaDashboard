import styled from "styled-components";
import { LiaHotelSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

const Background = styled.div`
  height: calc(100% - 60px);
  width: ${(props) => (props.$closed ? 0 : 15)}%;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
  background-color: grey;
  box-shadow: 13px 3px 40px #00000005;
`;

export const LeftMenu = ({ leftMenuClosed }) => {
  return (
    <Background $closed={leftMenuClosed}>
      <LiaHotelSolid />
      <ul>
        <li><Link to='/'>Dashboard</Link></li>
        <li><Link to='/booking'>Booking</Link></li>
        <li><Link to='/room'>Room</Link></li>
        <li><Link to='/employee'>Employee</Link></li>
      </ul>
    </Background>
  );
};