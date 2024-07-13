import styled from "styled-components";

interface GuestProps {
    fullName: string;
    bookingId: number;
    viewFunc: (bookingId: number) => void;
}

export const Guest: React.FC<GuestProps> = ({fullName, bookingId, viewFunc}) => 
    <div onClick={() => {viewFunc(bookingId)}}>
        <p>{fullName}</p>
        <p>#{bookingId}</p>
    </div>;

export const StatusDiv = styled.div<{$status:string}>`
    background-color:  ${(props) => (getStatusColor(props.$status))};
`;

export const RoomStatus: React.FC<{status:string}> = ({status}) => 
    <StatusDiv $status={status}>
        <p>{status}</p>
    </StatusDiv>;

function getStatusColor(status:string):string{
    let color = "white";

    if(status === "In progress")
        color = "yellow";
    else if(status === "Check out")
        color = "red";
    else if(status === "Check in")
        color = "green";

    return color;
}

const ViewNotes = styled.button<{$message:string}>`
    background-color:  ${(props) => (props.$message === "" ? "grey" : "green")};
`;

interface SpecialRequestProps {
    message: string;
    handlePopUp: (message: string) => void;
}

export const SpecialRequest: React.FC<SpecialRequestProps> = ({message, handlePopUp}) => 
    <div >
        <ViewNotes $message={message} onClick={() => {handlePopUp(message)}}>View Notes</ViewNotes>
    </div>;