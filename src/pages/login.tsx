import { FormEvent, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../components/authProvider";
import { toast } from "react-toastify";
import { RequestMethods } from "../utils";

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
        const APIResponse = await fetch(`${import.meta.env.VITE_API_URL}login`, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
        });

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
            <h2> Correo: miranda@gmail.com | Password: mirapass</h2>
            <br/><br/><br/><br/>
            <form onSubmit={validateLogin}>
                <label htmlFor="email">Email: </label>
                <input type="text" id="email" placeholder="Enter user here..." autoComplete="email"/>
                <br/><br/>
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" placeholder="Enter password here..." autoComplete="current-password"/>
                <br/><br/>
                <input type="submit" value="Log in" />
            </form>
        </>
    )
};