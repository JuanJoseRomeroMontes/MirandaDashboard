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

export const Button = styled.div<{$width:string; $padding:string; $margin:string;}>`
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

export const GreenButton = styled.div<{$width:string; $padding:string; $margin:string;}>`
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

export const DivImg = styled.div<{$paddingTop:number; $width:number; $url:string;}>`
    padding-top: ${(props) => (props.$paddingTop)}%;
    width: ${(props) => (props.$width)}%;
    background-image: url(${(props) => (props.$url)});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
`