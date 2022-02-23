function SignUpView ({setInput, getData, returnedData}) {
    return (
        <div className="App">
          <h1>Sign up</h1>
          <input type="text" name="name" placeholder="Name" onChange={setInput}></input>
          <input type="text" name="surname" placeholder="Surname" onChange={setInput}></input>
          <input type="number" name="pnr" placeholder="SSN" onChange={setInput}></input>
          <input type="email" name="email" placeholder="Email" onChange={setInput}></input>
          <input type="text" name="username" placeholder="Username" onChange={setInput}></input>
          <input type="password" name="password" placeholder="Password" onChange={setInput}></input>
          <button onClick={() => getData()}>Sign up</button>
    
          <p>{returnedData ? returnedData : ''}</p>
          
        </div>
    );
}

export default SignUpView;