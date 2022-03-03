import ApplicantHomepageView from "../views/ApplicantHomepageView";
import { useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

/**
 * This is a React functional component which is responsible for the frontend logic
 * for the applicants homepage and presenting the corresponding user interface.
 * 
 * @returns A view, a user interface, to display in the browser.
 */
function ApplicantHomepage() {

    const [result, setResult] = useState("");
    const [authorized, setAuthorized] = useState(false);
    const [competence, setCompetence] = useState([{ id: "", experience: ""}]);
    const [availability, setAvailability] = useState([{ from: "", to: ""}]);
    const [competenceList, setCompetenceList] = useState([{id: "", name: ""}]);
    const navigate = useNavigate();

    const reduxPerson = useSelector(state => state.auth.person);

    /**
     * These next two lines is for react localization 
     * to be able to switch between enlish and swedish.
     * returnObjects:true is needed so we can handle our translation.JSON 
     * as an object.
     * name: reduxPerson.name is loaded in the translation.json file at applicant.header : {{name}}
     */
     const {t} = useTranslation('translation');
     const applicant_lang = t("app.applicant", {framework:'React', returnObjects:true, name: reduxPerson.name});

    /**
     * Creates a GET-request for fetching the competences to display
     * in ApplicantHomepageView. 
     * 
     * @returns The response containing the competences from the server.
     */
    const getCompetences = async () => {
        let status;
        return await fetch('/applicant/', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            }
        }).then(res => {
            status = res.status;
            return res.json();
        }).then(data => {
            return {status, data};
        }).catch(err => {
            return {status, data: {error: applicant_lang.servererror}};
        });
    }

    /**
     * Handles the changed input for competence.
     * 
     * @param {index} i: The index.
     * @param {Event} e: The event. 
     */
    const handleChangeCompetence = (i, e) => {
        let newInput = [...competence];
        newInput[i][e.target.name] = e.target.value;
        setCompetence(newInput);
    }

    /**
     * For adding another field to input competence.
     */
    const handleAddCompetence = () => {
        setCompetence([...competence, { id: "", experience: ""}])
    }

    /**
     * Handles the changed input for availability.
     * 
     * @param {index} i: The index
     * @param {Event} e: The event 
     */
    const handleChangeAvailability = (i, e) => {
        let newInput = [...availability];
        newInput[i][e.target.name] = e.target.value;
        setAvailability(newInput);
    }

    /**
     * For adding another field to input availability.
     */
    const handleAddAvailability = () => {
        setAvailability([...availability, { from: "", to: ""}])
    }

    /**
     * Handles the submitting of the application.
     * Checks the response from the server. If the response from the server returns
     *      status 200:     sets the result.
     *      status 401:     informs the user about being unauthorized, and gets redirected
     *                      to the sign in page.
     *      status XXX:     default, sets an error message.
     * 
     * @param {Event} e The event from click on button.
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        performApply().then(res => {
            switch(res.status){
                case 200:   
                    setResult(res.data.result);
                    setAuthorized(true);
                    handleReset();
                    break;
                case 401:   
                    window.alert(applicant_lang.unauthorized);
                    navigate('/');
                    break;
                default:    
                    setResult(res.data.error);
                    setAuthorized(true);
                    break;
            }
        });
    }

    /**
     * Creates a POST-request containing the persons username, the filled in competence
     * and availability.
     * 
     * @returns the response from the server.
     */
    const performApply = async () => {
        let status;
        return await fetch('/applicant/apply/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                username: reduxPerson.username,
                competences: competence,
                availabilities: availability,
            })
        }).then(res => {
            status = res.status;
            return res.json();
        }).then(data => {
            return { status, data };
        }).catch(err => {
            return { status, data: { error: applicant_lang.servererror }};
        });
    }

    /**
     * Resets the input and select fields to their default value. Also
     * resets the state for competence and availability.
     */
    const handleReset = () => {
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        );

        Array.from(document.querySelectorAll("select")).forEach(
            select => (select.value = "")
        );

        setCompetence([{ id: "", experience: ""}]);
        setAvailability([{ from: "", to: ""}]);
    }

    /**
     * This method runs on the initial render, and any time the dependency value
     * navigate changes.
     * 
     * Gets the competences from the server and sets the competence list. 
     * If the response from the server returns
     *      status 200:     sets the competence list.
     *      status 401:     informs the user about being unauthorized, and gets redirected
     *                      to the sign in page.
     *      status XXX:     default, sets an error message.
     */
    useEffect(() => {
        getCompetences().then((res) => {
            if(res.status === 200) {
                setCompetenceList(res.data.competences);
                setAuthorized(true);
            } else if(res.status === 401) {
                window.alert(applicant_lang.unauthorized);
                navigate('/', {message: applicant_lang.unauthorized});
            } else {
                setResult(res.data.error);
                setAuthorized(true);
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);

    if(authorized) {
        return (
            ApplicantHomepageView({
                applicant_lang,
                competenceList,
                competence,
                availability,
                reduxPerson,
                handleAddCompetence, 
                handleChangeCompetence,
                handleAddAvailability,
                handleChangeAvailability,
                handleSubmit,
                handleReset,
                result
            })
        )
    } 
    return <div className="App"></div>
}

export default ApplicantHomepage;