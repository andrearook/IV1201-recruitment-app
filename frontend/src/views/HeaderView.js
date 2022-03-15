
/**
 * A reusable header.
 * 
 * @returns A Header view.
 */
function HeaderView({greeting, changeLang, supportedLngs, name, surname}) {
    return (
        <h1 className="header">{greeting} {name} {surname}
            <div className="button">{supportedLngs.map((lang) => 
                <button name={lang} key={lang} onClick = {(e) => changeLang(e)}>{lang}</button>
            )}
            </div>
        </h1>
    );
}

export default HeaderView;