import { useEffect, useState } from "react";
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
    const [authorized, setAuthorized] = useState(false);
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
     * to be able to switch between english and swedish.
     * returnObjects:true is needed so we can handle our translation.JSON 
     * as an object.
     * name: reduxPerson.name is loaded in the translation.json file at recruiter.header : {{name}}
     */
      const {t, i18n} = useTranslation('translation');
      const recruiter_lang = t("app.recruiter", {framework:'React', returnObjects:true, name: reduxPerson.name});

    /**
     * Creates a GET-request to authorize the user.
     * 
     * @returns The response from the server.
     */
    const performAuth = async () => {
        let status;
        return await fetch('/recruiter/', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json',
                'accept-language': i18n.language
            }
        }).then(res => {
            status = res.status;
            return res.json();
        }).then(data => {
            return { status, data };
        }).catch(err => {
            return { status, data: { error: recruiter_lang.servererror }};
        });
    }
    
    /**
     * This method runs on the initial render, and any time the dependency value
     * navigate changes.
     * 
     * Gets the recruiter page from the server and authorizes the user. 
     * If the response from the server returns
     *      status 200:     sets the state variable authorized to true.
     *      status 401:     informs the user about being unauthorized, and gets redirected
     *                      to the sign in page.
     *      status XXX:     default, sets an error message and sets the state variable authorized to true.
     */
     useEffect(() => {
        performAuth().then((res) => {
            if(res.status === 200) {
                setAuthorized(true);
            } else if(res.status === 401) {
                window.alert(recruiter_lang.unauthorized);
                navigate('/');
            } else {
                setAuthorized(true);
                setResult(res.data.error);
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);

    if(authorized) {
        return (
            RecruiterHomepageView({
                recruiter_lang,
                authorized, 
                result        
            })
        );
    } 
    return <div className="App"></div>
}

export default RecruiterHomepage;