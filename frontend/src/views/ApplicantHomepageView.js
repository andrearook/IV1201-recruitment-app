/**
 * This is a React function component without logic, it relies on any
 * callback functions and values provided by its presenter RecruiterHomepage.
 * 
 * @returns A view, a user interface, to display in the browser.
 */
 function ApplicantHomepageView({
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
     
 }) {
    return (
        <div className="App">
            <h1>Welcome {reduxPerson.name} to the recruitment application!</h1>
            <h3>Do you want to apply for a job? Fill in your application below.</h3>
            <p>{result}</p>

            <form onSubmit={handleSubmit}>
                {competence.map((element, index) => (
                    <div key={index}>
                        <select name="id" onChange={e => handleChangeCompetence(index, e)}>
                        <option value="">Select competence</option>
                        {competenceList.map(competence => (
                            <option key={competence.id} value={competence.id}>{competence.name}</option>
                        ))}
                        </select>
                                
                        <input type="number" name="experience" placeholder="Years of experience" onChange={e => handleChangeCompetence(index, e)} />
                    </div>
                ))}
                <button type="button" onClick={() => handleAddCompetence()}>Add Competence</button>

                {availability.map((element, index) => (
                    <div key={index}>       
                        <input type="date" name="from" placeholder="From" onChange={e => handleChangeAvailability(index, e)} />
                        <input type="date" name="to" placeholder="To" onChange={e => handleChangeAvailability(index, e)} />
                    </div>
                ))}
                <button type="button" onClick={() => handleAddAvailability()}>Add Availability</button>
                <br />
                
                <br />
                <h4>Entered information</h4>

                {competence.map((c) => (
                    (c.id && c.experience && competenceList) ? 
                    <p key={c.id}>{(competenceList.find(x => x.id == c.id)).name} with {c.experience} years experience</p>
                    : null
                ))}

                {availability.map((a, index) => (
                    (a.from && a.to) ? 
                        <p key={index}>Can work from {a.from} to {a.to}</p>
                    : null
                ))}

                <button>Apply</button>
            </form>

        </div>
    );
}

export default ApplicantHomepageView;