import { FormEvent, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../components/authProvider";
import { toast } from "react-toastify";
import { RequestMethods } from "../utils";
import styled from "styled-components";
import { Form } from "../components/form";
import { Input } from "../components/pagesGeneralComponents";

const LoginContainer = styled.div`
    margin: 30px auto 0 auto;
    width: 70%;
    color: #135846;

    h2{
        text-align: center;
        font-weight: bold;
        font-size: 3em;
    }
`

const InputContainer = styled.div`
    margin: 30px auto 0 auto;
    width: 35%;
    display: flex;
    justify-content: right;
    align-items: center;
    margin-bottom: 20px;

    label{
        font-weight: bold;
        font-size: 1.5em;
        margin-right: 5px;
    }
`

export const LoginPage = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext)

    const validateLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;

        if(email=="" && password=="")
        {
            toast.info('Please fill the credentials!')
            return;
        }

        const method:RequestMethods = 'POST'
        const body = JSON.stringify({email: email, password: password});
        let APIResponse;
        try {
            APIResponse = await fetch(`${import.meta.env.VITE_API_URL}login`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            });
        } catch (error) {
            toast.error('Connection error, please check your internet conection and try again.');
            return;
        }
        
        if(APIResponse.ok)
        {
            const verification = await APIResponse.json();
            auth.authDispatch({type: 'logIn', payload: {email: email, name: verification.name, photo:verification.photo, token:verification.token}})
            navigate("/")
        }
        else
        {
            toast.error('Invalid credentials')
        }
    }

    return(
        <>
        <LoginContainer>
            <h2>Correo: miranda@gmail.com</h2>
            <h2>Password: mirapass</h2>
            <Form onSubmit={validateLogin}>
                <InputContainer>
                    <label htmlFor="email">Email: </label>
                    <Input $width={"auto"} $padding={"8px 10px"} $margin={"0 15px"} type="text" id="email" placeholder="Enter user here..." autoComplete="email"></Input>
                </InputContainer>
                <InputContainer>
                    <label htmlFor="password">Password: </label>
                    <Input $width={"auto"} $padding={"8px 10px"} $margin={"0 15px"} type="password" id="password" placeholder="Enter password here..." autoComplete="current-password"></Input>
                </InputContainer>
                <button type="submit" style={{marginTop:"35px", fontSize: "2em"}}>Log in</button>
            </Form>
        </LoginContainer>
        </>
    )
};