import styled from "styled-components";
import { RiDeleteBin6Fill } from "react-icons/ri";

export const Guest = ({fullName, bookingId}) => 
    <div>
        <p>{fullName}</p>
        <p>#{bookingId}</p>
    </div>;

export const RoomStatus = ({status}) => 
    <div>
        <div style={{backgroundColor: getStatusColor(status)}}>
            <p>{status}</p>
        </div>
    </div>;

function getStatusColor(status){
    let color = "white";

    if(status === "In progress")
        color = "yellow";
    else if(status === "Check out")
        color = "red";
    else if(status === "Check in")
        color = "green";

    return color;
}

const ViewNotes = styled.button`
    background-color:  ${(props) => (props.$message === "" ? "grey" : "green")};
`;

export const SpecialRequest = ({message, showPopUp}) => 
    <div >
        <ViewNotes $message={message} onClick={() => {showPopUp(message)}}>View Notes</ViewNotes>
    </div>;

export const DeleteBookingData = ({id, deleteFunc}) => 
    <div >
        <RiDeleteBin6Fill onClick={() => {deleteFunc(id)}}/>
    </div>;
