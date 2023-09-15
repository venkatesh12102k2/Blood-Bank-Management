import { userLogin, userRegister } from "../redux/features/auth/authActions";
import store from "../redux/store";

export const handleLogin = (e, email, password, role) => {
    e.preventDefault();
    try {
        if (!role || !email || !password) {
            return alert("Please fill out all the fields");
        }
        // console.log("login ", e, email, password, role)
        store.dispatch(userLogin({ email, password, role }));
    } catch (error) {
        console.log(error)
    }
}

export const handleRegister = (e, email, password, role, organisationName, hospitalName, website, address, phone, name) => {
    e.preventDefault();
    try {
        // console.log("Register ", e, email, password, role, organisationName, hospitalName, website, address, phone, name)
        store.dispatch(userRegister({ email, password, role, organisationName, hospitalName, website, address, phone, name }));
    } catch (error) {
        console.log(error)
    }
}