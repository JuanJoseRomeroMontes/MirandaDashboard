import styled from "styled-components";

export const MenuChild = styled.div`
    padding: 15px;
    height: calc(100% - 140px);
`;

export const TabsContainer = styled.div`
    display: inline-flex;
`;

export const Container = styled.div<{$width:string; $margin:string; $justifyContent:string;}>`
    width: ${(props) => (props.$width)};
    margin: ${(props) => (props.$margin)};
    justify-content: ${(props) => (props.$justifyContent)};
    display: inline-flex;
    align-items: center;
    position: relative;
    float: right;
    margin-top: 12px;
`

export const ContainerInfo = styled.div`
    margin: 30px 5% 0 20%;
    b{
        color: #135846;
    }
`

export const Button = styled.button<{$width:string; $padding:string; $margin:string;}>`
    width: ${(props) => (props.$width)};
    padding: ${(props) => (props.$padding)};
    margin: ${(props) => (props.$margin)};
    border: 1px solid #135846;
    display: inline-block;
    border-radius: 12px;
    background-color: transparent;
    color: #135846;
    cursor: pointer; 
`

export const GreenButton = styled.button<{$width:string; $padding:string; $margin:string;}>`
    width: ${(props) => (props.$width)};
    padding: ${(props) => (props.$padding)};
    margin: ${(props) => (props.$margin)};
    border: 1px solid #135846;
    display: inline-block;
    border-radius: 12px;
    background-color: #135846;
    color: white;
    cursor: pointer;
`

export const Select = styled.select<{$width:string; $padding:string; $margin:string;}>`
    width: ${(props) => (props.$width)};
    padding: ${(props) => (props.$padding)};
    margin: ${(props) => (props.$margin)};
    display: inline-block;
    background: #135846 0% 0% no-repeat padding-box;
    border-radius: 12px;
    color: white;
`

export const Input = styled.input<{$width:string; $padding:string; $margin:string;}>`
    width: ${(props) => (props.$width)};
    padding: ${(props) => (props.$padding)};
    margin: ${(props) => (props.$margin)};
    border: 1px solid #135846;
    display: inline-block;
    border-radius: 12px;
    background-color: transparent;
    color: #135846;
    font-size: 1em;
`

export const TextArea = styled.textarea<{$width:string; $padding:string; $margin:string;}>`
    width: ${(props) => (props.$width)};
    padding: ${(props) => (props.$padding)};
    margin: ${(props) => (props.$margin)};
    border: 1px solid #135846;
    display: inline-block;
    border-radius: 12px;
    background-color: transparent;
    color: #135846;
    font-size: 1em;
    position: relative;
    top: 18px;
`

export const DivImg = styled.div<{$paddingTop:number; $width:number; $url:string;}>`
    padding-top: ${(props) => (props.$paddingTop)}%;
    width: ${(props) => (props.$width)}%;
    background-image: url(${(props) => (props.$url)});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
`

//----------------------//

export const KpiContainer = styled.section`
    display: flex;
    justify-content: space-between;
    margin: 50px; 

        .icon {
            width: 28px;
            height: 28px;
        }
    }
`;

export const Kpi = styled.div`
    width: 18%;
    display: flex;
    align-items: center;
    padding: 30px;
    border-radius: 12px;
    background-color: white;
`;

export const KpiData = styled.div`
    h6{
        color: black;
        font: normal normal 600 30px/46px Poppins;
        letter-spacing: 0px;
        color: #393939;
        margin: 0;
    }

    p{
        color: gray;
        text-align: left;
        font: normal normal 300 14px/21px Poppins;
        letter-spacing: 0px;
        color: #787878;
        margin: 0;
    }
`

export const IconContainer = styled.div<{$selected:boolean;}>`
    width: 65px;
    height: 65px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 22px;
    background-color: ${(props) => (props.$selected ? '#E23428' : '#FFEDEC')};
    color: ${(props) => (props.$selected ? 'white' : '#E23428')};
`;

export const CommentList = styled.div`
    margin: 0 50px;
    background-color: white;
    border-radius: 20px;
    padding: 30px;
    h3 {
        font-size: 20px;
        margin:0;
        margin-bottom: 30px;
        font-weight: 400;
    }
    div {
        display: flex;
        justify-content: space-between;
        gap: 5%;
        @media only screen and (min-width: 1920px) {
            justify-content: unset;
        }
    }
    `;