import ApplicantHomepageView from "../views/ApplicantHomepageView";
import { useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * This is a React function component responsible for the frontend logic
 * when an applicant is signed in and presenting that user interface.
 * 
 * @returns A view, a user interface, to display in the browser.
 */
function ApplicantHomepage() {

    const [result, setResult] = useState("");
    const navigate = useNavigate();

    /**
     * useSelector() will look in the index.js file after Provider.
     * Provider will provide useSelector with the store state which
     * is the state parameter. reduxPerson is an object with 
     * the store state's parameters.
     */
    const reduxPerson = useSelector(state => state.auth.person);

    /**
     * Helper function to verify that JWT is working.
     * This method might change futher on.
     * 
     * @param {Event} e The event from click on button
     */
    const handleClick = (e) => {
        e.preventDefault();

        performAuth().then(res => {
            switch(res.status){
                case 200:   
                    setResult(res.data.result);
                    break;
                case 401:   
                    window.alert('Unauthorized. You will be redirected to signin');
                    navigate('/');
                    break;
                default:    
                    setResult(res.data.error);
                    break;
            }
        });
    }

    // credentials: 'include' is a header that should probably 
    // be included later for auth
    const performAuth = async () => {
        let status;
        let statusText;
        return await fetch('/applicant/apply', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            }
        }).then(res => {
            status = res.status;
            statusText = res.statusText;
            return res.json();
        }).then(data => {
            return { status, data };
        }).catch(err => {
            return { status, data: { error: statusText }};
        });
    }

    return (
        ApplicantHomepageView({
            reduxPerson,
            handleClick, 
            result
        })
    );
}

export default ApplicantHomepage;