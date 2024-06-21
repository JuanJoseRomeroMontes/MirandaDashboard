import { useNavigate } from "react-router";

export const LoginPage = () => {
    const navigate = useNavigate();
    const masterEmail = "miranda@gmail.com";
    const masterPassword = "mirapass";

    const validateLogin = (event) => {
        event.preventDefault();
        if(event.target.email.value == masterEmail && event.target.password.value == masterPassword)
        {
            localStorage.setItem("mirandaDashboardLogin", true);
            navigate("/")
        }
        else
        {
            localStorage.setItem("mirandaDashboardLogin", false);
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