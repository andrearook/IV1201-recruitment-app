import {useState} from 'react';
import SignUpView from '../views/SignUpView';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setCurrentPerson } from '../store/actions/Actions';

/**
 * This is the basic frontend to sign up a user. 
 */
function SignUp() {

    const [returnedData, setReturnedData] = useState();
    const [person, setPerson] = useState({name: '', surname: '', pnr: '', email: '', password: '', username: ''});

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
     * Receives the response from the server and sets the state variable "returnedData".
     */
    const getData = async () => {
        let status;
        let statusText;
        const newData = await fetch('/signup/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
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
            statusText = res.statusText;
            return res.json();
        }).catch(err => {
            return { error: statusText };
        });

        if(status === 200) {
            dispatch(setCurrentPerson(newData.person));
            setReturnedData(newData.result);
            navigate("/applicanthomepage");
        } else {
            setReturnedData(newData.error);
        }
    }

    return SignUpView({
        setInput: setInput, 
        getData: getData, 
        returnedData: returnedData
    });
}

export default SignUp;