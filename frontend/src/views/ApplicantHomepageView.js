/**
 * This is a React function component without logic, it relies on any
 * callback functions and values provided by its presenter RecruiterHomepage.
 * 
 * @returns A view, a user interface, to display in the browser.
 */
 function ApplicantHomepageView({
    applicant_lang,
    competenceList,
    competence,
    availability,
    handleAddCompetence, 
    handleChangeCompetence,
    handleAddAvailability,
    handleChangeAvailability,
    handleSubmit,
    handleReset,
    result,
     
 }) {
    return (
        <div className="App">
            <h1>{applicant_lang.header}</h1>
            <h3>{applicant_lang.applytext}</h3>
            <p style={{color: "green"}}>{result}</p>

            <form onSubmit={e => handleSubmit(e)}>
                {competence.map((element, index) => (
                    <div key={index}>
                        <select name="id" onChange={e => handleChangeCompetence(index, e)}>
                        <option value="">{applicant_lang.competence}</option>
                        {competenceList.map(competence => (
                            <option key={competence.id} value={competence.id}>{competence.name}</option>
                        ))}
                        </select>
                                
                        <input type="number" min="0" step="0.1" name="experience" placeholder={applicant_lang.experience} onChange={e => handleChangeCompetence(index, e)} />
                    </div>
                ))}
                <button type="button" onClick={() => handleAddCompetence()}>{applicant_lang.addcompetence}</button>

                {availability.map((element, index) => (
                    <div key={index}>       
                        <input type="date" name="from" placeholder="From" onChange={e => handleChangeAvailability(index, e)} />
                        <input type="date" name="to" placeholder="To" onChange={e => handleChangeAvailability(index, e)} />
                    </div>
                ))}
                <button type="button" onClick={() => handleAddAvailability()}>{applicant_lang.addavailability}</button>
                <br />
                
                <br />
                <h4>{applicant_lang.enteredinformation}</h4>

                {competence.map((c, index) => (
                    (c.id && c.experience && competenceList) ? 
                    // eslint-disable-next-line eqeqeq
                    <p key={index}>{(competenceList.find(x => x.id == c.id)).name} {applicant_lang.with} {c.experience} {applicant_lang.exp}</p>
                    : null
                ))}

                {availability.map((a, index) => (
                    (a.from && a.to) ? 
                    <p key={index}>{applicant_lang.from} {a.from} {applicant_lang.to} {a.to}</p>
                    : null
                ))}

                <button>{applicant_lang.apply}</button>
            </form>
            < br />
            <div>
                <button onClick={() => handleReset()}>{applicant_lang.cancel}</button>
            </div>
        </div>
    );
}

export default ApplicantHomepageView;