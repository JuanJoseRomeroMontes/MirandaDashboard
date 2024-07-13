import { FormEvent, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../components/authProvider";

export const LoginPage = () => {
    const navigate = useNavigate();
    const masterEmail = "miranda@gmail.com";
    const masterPassword = "mirapass";
    const auth = useContext(AuthContext)

    const validateLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;

        if(email == masterEmail && password == masterPassword)
        {
            auth.authDispatch({type: 'logIn', payload: {email: email, name: 'TEMP'}})
            navigate("/")
        }
        else
        {
            //Display visual error in screen
        }
    }

    return(
        <>
            <h2>Email:{masterEmail} | Password:{masterPassword}</h2>
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