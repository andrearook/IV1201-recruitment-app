/**
 * This is a React function component without logic, it relies on any
 * callback functions and values provided by its presenter RecruiterHomepage.
 * 
 * @returns A view, a user interface, to display in the browser.
 */
function ApplicantHomepageView({competences, reduxPerson, handleClick, result}) {
    return (
        <div className="App">
            <h1>Welcome {reduxPerson.name} to the recruitment application!</h1>
            <h2>Do you want to apply for a job?</h2>
            <button onClick={handleClick}>Click me for auth</button>
            <p>{result}</p>
            {/*For testing purposes */}
            <ul>{competences.map((competence) => 
                <li key={competence.id}>{competence.name}</li>
            )}
            </ul>
        </div>
    );
}

export default ApplicantHomepageView;