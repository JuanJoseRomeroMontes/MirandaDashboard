import styled from 'styled-components';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";

export const FilterTab = styled.div<{$selected: boolean;}>`
    padding: 15px;
    border: none;
    border-bottom: 1px solid ${(props) => (props.$selected ? "#135846" : "#D4D4D4")};
    color: ${(props) => (props.$selected ? "#135846" : "#6E6E6E")};
`;

export const Pagination = styled.div`
    display: inline-flex;
    align-items: center;
`;

export const ManageDataDiv = styled.div`
    width: fit-content;
    margin: 0 auto;

    .padding-left{
        margin-left: 7px;
    }

    svg:hover{
        cursor: pointer;
    }
`;

export const Image = styled.img<{$src:string;}>`
    height: 0;
    width: 100%;
    padding-bottom: 56%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${(props) => props.$src}); 
`;

export const RequestPopUp = styled.div<{$display:boolean;}>`
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

interface ManageDataProps {
    id: number;
    editFunc?: (id: number) => void;
    deleteFunc: (id: number) => void;
}

export const ManageData: React.FC<ManageDataProps> = ({id, editFunc, deleteFunc}) => 
    <ManageDataDiv >
        <RiDeleteBin6Fill onClick={() => {deleteFunc(id)}}/>
        {editFunc && (
        <FaPencilAlt className='padding-left' onClick={() => editFunc(id)} />
        )}
    </ManageDataDiv>;