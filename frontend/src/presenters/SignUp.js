import {useState} from 'react';
import SignUpView from '../views/SignUpView';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setCurrentPerson } from '../store/actions/Actions';
import { useTranslation } from 'react-i18next';

/**
 * This is the basic frontend to sign up a user. 
 */
function SignUp() {

    const [result, setResult] = useState();
    const [person, setPerson] = useState({name: '', surname: '', pnr: '', email: '', password: '', username: ''});

    /**
     * These next two lines is for react localization 
     * to be able to switch between english and swedish.
     * returnObjects:true is needed so we can handle our translation.JSON 
     * as an object.
     */
    const {t, i18n} = useTranslation('translation');
    const signup_lang = t("app.signup", {framework:'React', returnObjects:true});

    const setInput = (e) => {
        const {name, value} = e.target;
        setPerson(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    /**
     * useDispatch() will dispatch actions to the reducer.
     */
    const dispatch = useDispatch();

    // Used to redirect to another page
    const navigate = useNavigate();

    /**
     * Creates a POST-request with the data filled in by the user in the client. 
     * Receives the response from the server and sets the state variable "result".
     */
    const signup = async () => {
        let status;
        const newData = await fetch('/signup/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'accept-language': i18n.language
            },
            body: JSON.stringify({
                name: person.name,
                surname: person.surname,
                pnr: person.pnr,
                email: person.email,
                password: person.password,
                username: person.username
            })
        }).then(res => {
            status = res.status;
            return res.json();
        }).catch(err => {
            return { error: signup_lang.servererror };
        });

        if(status === 200) {
            dispatch(setCurrentPerson(newData.person));
            setResult(newData.result);
            navigate("/applicanthomepage");
        } else {
            setResult(newData.error);
        }
    }

    return SignUpView({
        signup_lang,
        setInput, 
        signup, 
        result
    });
}

export default SignUp;