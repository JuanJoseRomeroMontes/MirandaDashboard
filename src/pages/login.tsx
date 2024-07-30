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

        const method:RequestMethods = 'POST'
        const body = {email: email, password: password} //Como enviar datos al body
        const APIResponse = await fetch(`${process.env.API_URL}/login`, {
            method,
            body: body ?? undefined,
        });

        if(APIResponse.ok)
        {
            const token = await APIResponse.json();
            auth.authDispatch({type: 'logIn', payload: {email: email, name: 'TEMP', photo:"", token:""}})
            navigate("/")
        }
        else
        {
            toast.error('Invalid credentials')
        }
    }

    return(
        <>
            <h2>Karla7@yahoo.com | Password:pari</h2>
            <br/><br/><br/><br/>
            <form onSubmit={validateLogin}>
                <label htmlFor="email">Email: </label>
                <input type="text" id="email" placeholder="Enter user here..."/>
                <br/><br/>
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" placeholder="Enter password here..."/>
                <br/><br/>
                <input type="submit" value="Log in" />
            </form>
        </>
    )
};