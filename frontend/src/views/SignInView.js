/**
 * This is a React function component without logic, it relies on the
 * callback functions and values provided by its presenter SignIn.
 * 
 * @returns A view, a user interface, to display in the browser.
 */
function SignInView({ signin_lang, handleSubmit, handleChange, result, goToSignUp }) {
    return (
        <div className="App">
            <h1>{signin_lang.pagename}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" name="username" placeholder={signin_lang.username} onChange={handleChange}></input>
                </div>
                <div>
                    <input type="password" name="password" placeholder={signin_lang.password} onChange={handleChange}></input>
                </div>
                <div>
                    <br />
                    <button>{signin_lang.pagename}</button>
                </div>
            </form>
            <p>{result ? result : ''}</p>
            <div>
                <button onClick={goToSignUp}>{signin_lang.notregistered}</button>
            </div>
        </div>
    );
}

export default SignInView;
