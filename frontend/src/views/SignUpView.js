function SignUpView ({signup_lang, setInput, getData, returnedData}) {
    return (
        <div className="App">
          <h1>{signup_lang.pagename}</h1>
          <input type="text" name="name" placeholder={signup_lang.name} onChange={setInput}></input>
          <input type="text" name="surname" placeholder={signup_lang.surname} onChange={setInput}></input>
          <input type="number" name="pnr" placeholder={signup_lang.ssn} onChange={setInput}></input>
          <input type="email" name="email" placeholder={signup_lang.email} onChange={setInput}></input>
          <input type="text" name="username" placeholder={signup_lang.username} onChange={setInput}></input>
          <input type="password" name="password" placeholder={signup_lang.password} onChange={setInput}></input>
          <button onClick={() => getData()}>{signup_lang.signup}</button>
    
          <p>{returnedData ? returnedData : ''}</p>
          
        </div>
    );
}

export default SignUpView;