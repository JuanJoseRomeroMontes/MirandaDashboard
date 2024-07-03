import styled from "styled-components";

export const Guest = ({fullName, bookingId, viewFunc}) => 
    <div onClick={() => {viewFunc(bookingId)}}>
        <p>{fullName}</p>
        <p>#{bookingId}</p>
    </div>;

export const StatusDiv = styled.div`
    background-color:  ${(props) => (getStatusColor(props.$status))};
`;

export const RoomStatus = ({status}) => 
    <StatusDiv $status={status}>
        <p>{status}</p>
    </StatusDiv>;

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

export const SpecialRequest = ({message, handlePopUp}) => 
    <div >
        <ViewNotes $message={message} onClick={() => {handlePopUp(message)}}>View Notes</ViewNotes>
    </div>;

export const RequestPopUp = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 99;
    background-color: #80808050;
    display: ${(props) => (props.$display ? "flex" : "none")};
    align-items: center;
    justify-content: center;

    div{
        padding: 15px;
        width: fit-content;
        background-color: white;
        min-width: 250px;
        text-align: center;
    }
`;