/**
 * This is a React function component without logic, it relies on any
 * callback functions and values provided by its presenter RecruiterHomepage.
 * 
 * @returns A view, a user interface, to display in the browser.
 */
function ApplicantHomepageView({handleClick, result}) {
    return (
        <div className="App">
            <h1>Welcome to the recruitment application!</h1>
            <h2>Do you want to apply for a job?</h2>
            <button onClick={handleClick}>Click me for auth</button>
            <p>{result}</p>
        </div>
    );
}

export default ApplicantHomepageView;