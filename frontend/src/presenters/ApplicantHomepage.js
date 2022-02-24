import ApplicantHomepageView from "../views/ApplicantHomepageView";
import { useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * This is a React functional component which is responsible for the frontend logic
 * for the applicants homepage and presenting the corresponding user interface.
 * 
 * @returns A view, a user interface, to display in the browser.
 */
function ApplicantHomepage() {

    const [result, setResult] = useState("");
    const [competence, setCompetence] = useState([{ id: "", experience: ""}]);
    const [availability, setAvailability] = useState([{ from: "", to: ""}]);
    const [competenceList, setCompetenceList] = useState([{id: "", name: ""}]);
    const navigate = useNavigate();

    const reduxPerson = useSelector(state => state.auth.person);

    /**
     * Creates a GET-request fot fetching the competences to display
     * in ApplicantHomepageView. 
     * 
     * @returns The response containing the competences from the server.
     */
    const getCompetences = async () => {
        let status;
        let statusText;
        return await fetch('/applicant/', {
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
            return {status, data};
        }).catch(err => {
            return {status, data: {error: statusText}};
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

    /**
     * Creates a POST-request containing the persons username, the filled in competence
     * and availability.
     * 
     * @returns the response from the server.
     */
    const performApply = async () => {
        let status;
        let statusText;
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
            statusText = res.statusText;
            return res.json();
        }).then(data => {
            return { status, data };
        }).catch(err => {
            return { status, data: { error: statusText }};
        });
    }

    /**
     * This method runs at the initial render.
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
            } else if(res.status === 401) {
                window.alert('Unauthorized. You will be redirected to signin');
                navigate('/');
            } else {
                setResult(res.data.error);
            }
        })
    }, []);

    return (
        ApplicantHomepageView({
            competenceList,
            competence,
            availability,
            reduxPerson,
            handleAddCompetence, 
            handleChangeCompetence,
            handleAddAvailability,
            handleChangeAvailability,
            handleSubmit,
            result,
        })
    );
}

export default ApplicantHomepage;