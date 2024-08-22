import styled from "styled-components";

export const Form = styled.form`
  width: auto;
  height: 100%;
  padding: 20px;
  margin: auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  button{
      width: auto;
      padding: 10px 30px;
      margin: 20px 0 0 0;
      border: 1px solid #135846;
      display: inline-block;
      border-radius: 12px;
      background-color: #135846;
      color: white;
      cursor: pointer;
      font-size: 1.5rem;
      font-weight: bold;
  }
`;

export const Label = styled.label`
    width: 60%;
    margin: 20px 0 20px 30%;
    input, select{
        margin: 0 15px;
    }
`