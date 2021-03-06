/**
 * This is a React function component without logic, it relies on any
 * callback functions and values provided by its presenter RecruiterHomepage.
 * 
 * @returns A view, a user interface, to display in the browser.
 */
function RecruiterHomepageView({ recruiter_lang, result }) {
    return (
        <div className="App">
            <h1>{recruiter_lang.header}</h1>
            <h2>{recruiter_lang.applicationstext}</h2>
            <p>{result}</p>
        </div>
    );
}

export default RecruiterHomepageView;