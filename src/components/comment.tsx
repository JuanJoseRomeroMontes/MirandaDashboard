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
    padding: 5px 30px;
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
    width:100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
        width: 56px;
        border-radius: 8px;
        margin-right: 20px;
    }
    div:first-of-type {
        display: block;

        p:first-child {
            font-size: 16px;
            font-weight: 600;
        }
    }
`;

const ReviewInfo = styled.div`
    display: flex !important;
    align-items: center;
    margin:0;

    p{
        font-size: 14px;
        color: var(--ocher-green);
        width: 50%;
        margin:0;
    }

    img{
        width: 25px;
        height: 25px;
        display: inline-block;
        margin: 0;
    }

    div{
        display: flex !important;
        justify-content: space-evenly;
    }
`

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
                    <img alt="" src="https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"/>
                    <div style={{flex: "1"}}>
                        <p>{comment.userName}</p>
                        <ReviewInfo>
                            <p>{timeAgo} ago</p>
                            <div style={{flex: "1"}}>
                                <img alt="" src="https://static.vecteezy.com/system/resources/previews/010/147/759/non_2x/tick-icon-accept-approve-sign-design-free-png.png"/>
                                <img alt="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJAtgsy9WaCUW1e1971SB5HK2H5mdJaxCj3nor37kDmh3rkNfSlZ0B64hC0txVorcz6AU&usqp=CAU"/>
                            </div>
                        </ReviewInfo>
                    </div>
                </UserContainer>
            </BottomContainer>
        </CommentContainer>
    )
}

export default Comment;