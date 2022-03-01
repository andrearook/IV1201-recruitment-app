import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RecruiterHomepageView from "../views/RecruiterHomepageView";

/**
 * This is a React function component responsible for the frontend logic
 * when an recruiter is signed in and presenting that user interface.
 * 
 * @returns A view, a user interface, to display in the browser.
 */
function RecruiterHomepage() {
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
     * These next two lines is for react localization 
     * to be able to switch between enlish and swedish.
     * returnObjects:true is needed so we can handle our translation.JSON 
     * as an object.
     * name: reduxPerson.name is loaded in the translation.json file at recruiter.header : {{name}}
     */
     const {t} = useTranslation('translation');
     const recruiter_lang = t("app.recruiter", {framework:'React', returnObjects:true, name: reduxPerson.name});
      
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
        return await fetch('/recruiter/', {
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
        RecruiterHomepageView({
            recruiter_lang,
            handleClick,
            result
        })
    );
}

export default RecruiterHomepage;