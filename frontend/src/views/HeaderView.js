
/**
 * A reusable header.
 * 
 * @returns A Header view.
 */
function HeaderView({greeting, changeLang,name, surname}) {
    return (
        <h1 className="header">{greeting} {name} {surname}
            <div className="button">
                <button name = 'sv' onClick = {(e) => changeLang(e)}>Svenska</button>
                <button name = 'en' onClick = {(e) => changeLang(e)}>English</button>
            </div>
        </h1>
    );
}

export default HeaderView;