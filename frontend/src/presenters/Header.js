import { useSelector } from "react-redux";
import HeaderView from "../views/HeaderView";

/**
 * Functional component that returns the view for the header.
 * 
 * @returns A reusable Header view.
 */
function Header() {

    const reduxPerson = useSelector(state => state.auth.person);

    return (
        HeaderView({
            name: reduxPerson.name,
            surname: reduxPerson.surname,
        })
    );
}

export default Header;