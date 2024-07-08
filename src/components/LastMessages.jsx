import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RequestPopUp } from '../../components/Tables/BookingTableComponents';


export const Divlist = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
`;

export const Comment = styled.div`
  background-color:  ${(property) => (getStatusColor(props.$property))};
`;

export const Subject = styled.h6`
  
`;

export const Content = styled.p`
  
`;

export const TextInline = styled.p`
  
`;

export const ClientData = styled.p`
  
`;

export const PrivateRoute = ({ children }) => {
    const [commentData, setcommentData] = useState([]);
    const [popUpMessage, setpopUpMessage] = useState("");

    const dispatch = useDispatch();
    const status = useSelector((state) => state.contactSlice.status);
    const contactSliceData = useSelector((state) => state.contactSlice.items);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchContactList());
        }
        else if (status === 'fulfilled') {
            setcommentData(contactSliceData);
        }
        else if (status === 'rejected') {
            console.log("rejectedPetition")
        }
    }, [status, contactSliceData, dispatch])

    const lastCommentList = useMemo(()=>{
        let unarchivedList = commentData.filter(comment => comment["archived"] == false);

        unarchivedList.sort((a,b) => {
            let value = 0;
            if(a["date"] < b["date"])
                value = 1;
            else if(a["date"] > b["date"])
                value = -1;
            
            if(order.inversed)
                value *= -1;

            return value;
        });

        return unarchivedList;
    }, [commentData])

    return(
        <>
            <Divlist>
            {lastCommentList.map(message => (
                <Comment $property={property} onClick={() => {setpopUpMessage(message.comment)}}>
                    <div>
                        <Subject>{message.subject}</Subject>
                        <Content>{message.comment}</Content>
                    </div>
                    <div>
                        <img/>photo
                        <ClientData>
                            <div>
                                <TextInline>{message.client.name}</TextInline>
                                <TextInline>{message.client.phone}</TextInline>
                            </div>
                            <div>
                                <TextInline>{message.client.email}</TextInline>
                                <TextInline>{message.archived ? "✓" : "X" }</TextInline>
                            </div>
                        </ClientData>
                    </div>
                </Comment>
            ))}
            </Divlist>
            <RequestPopUp $display={popUpMessage!==""} onClick={() => {setpopUpMessage("")}}><div>{popUpMessage}</div></RequestPopUp>
        </>
    )
}