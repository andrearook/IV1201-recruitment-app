/**
 * A reusable header.
 * 
 * @returns A Header view.
 */
function HeaderView({name, surname}) {
    return (
        <h1 className="header">Welcome {name} {surname}</h1>
    );
}

export default HeaderView;