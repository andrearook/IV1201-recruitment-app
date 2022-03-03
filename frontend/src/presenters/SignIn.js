import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setCurrentPerson } from '../store/actions/Actions';
import SignInView from '../views/SignInView';

/**
 * This is a React function component responsible for the frontend logic of
 * signing in and presenting the user interface to enter credentials.
 * 
 * @returns A view, a user interface, to display in the browser.
 */
function SignIn() {

    const [credentials, setCredentials] = useState({username: '', password: ''});
    // Result could be an error message to show if and why the sign in failed
    const [result, setResult] = useState("");

    /**
     * These next two lines is for react localization 
     * to be able to switch between enlish and swedish.
     * returnObjects:true is needed so we can handle our translation.JSON 
     * as an object.
     */
    const {t} = useTranslation('translation');
    const signin_lang = t("app.signin", {framework:'React', returnObjects:true});
     
    /**
     * useDispatch() will dispatch actions to the reducer.
     */
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setCredentials(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value, 
        }));
    }

    // Used to redirect to another page
    const navigate = useNavigate();

    const goToSignUp = () => {
        navigate("/signup");
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        performSignIn().then(res => {
            if(res.status === 200) {
                dispatch(setCurrentPerson(res.data.person));
                setResult(res.data.result);
                if(res.data.role === 'recruiter') {
                    navigate("/recruiterhomepage");
                } else {
                    navigate("/applicanthomepage");
                }
            } else {
                setResult(res.data.error);
            }
        });
    }

    // credentials: 'include' is a header that should probably 
    // be included later for auth
    const performSignIn = async () => {
        let status;
        return await fetch('/signin/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(res => {
            status = res.status;
            return res.json();
        }).then(data => {
            return { status, data };
        }).catch(err => {
            return { status, data: { error: signin_lang.servererror }};
        });
    }

    return SignInView({
        signin_lang,
        handleSubmit, 
        handleChange, 
        result, 
        goToSignUp 
    });
}

export default SignIn;