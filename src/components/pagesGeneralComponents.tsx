import styled from "styled-components";

export const MenuChild = styled.div`
    padding: 15px;
    height: calc(100% - 140px);
`;

export const TabsContainer = styled.div`
    display: inline-flex;
`;

export const DivImg = styled.div<{$paddingTop:number; $width:number; $url:string;}>`
    padding-top: ${(props) => (props.$paddingTop)}%;
    width: ${(props) => (props.$width)}%;
    background-image: url(${(props) => (props.$url)});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
`