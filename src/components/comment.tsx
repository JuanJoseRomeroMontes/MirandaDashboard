import styled from "styled-components";
import React from "react";
import { CommentInterface } from "../types";

const CommentContainer = styled.div`
    position: relative;
    background-color: white;
    width: 32%;
    max-width: 420px;
    min-height: 275px;
    border-radius: 20px;
    border: 1px solid #EBEBEB;
    padding: 30px;
    p {
        font-size: 16px;
        color: #4E4E4E;
        max-height: 135px;
        max-width: 
    }
`;

const BottomContainer = styled.div`
    position: absolute;
    bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
`

const UserContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
        width: 56px;
        border-radius: 8px;
        margin-right: 20px;
    }
    div {
        display: block !important;
        p:first-child {
            font-size: 16px;
            font-weight: 600;
        }
        p:last-child {
            font-size: 14px;
            color: var(--ocher-green);
        }
    }
`;

interface CommentProps {
    comment: CommentInterface;
    timeAgo: string;
}

const Comment: React.FC<CommentProps> = ({ comment, timeAgo }) => {
    return (
        <CommentContainer>
            <p>{comment.text}</p>
            <BottomContainer>
                <UserContainer>
                    <img src="/assets/Avatar.png" alt="User image"/>
                    <div>
                        <p>{comment.userName}</p>
                        <p>{Number(timeAgo) > 30 ? '+30' : timeAgo} minutes ago</p>
                    </div>
                </UserContainer>
            </BottomContainer>
        </CommentContainer>
    )
}

export default Comment;