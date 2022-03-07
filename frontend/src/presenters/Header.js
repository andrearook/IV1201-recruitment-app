import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import HeaderView from "../views/HeaderView";

/**
 * Functional component that returns the view for the header.
 * 
 * @returns A reusable Header view.
 */
function Header() {

    const reduxPerson = useSelector(state => state.auth.person);
    const {t, i18n} = useTranslation('translation');

    const greeting = t("app.header.greeting", {framework:'React'});

    const changeLang = (e) => {
        i18n.changeLanguage(e.target.name);
    }

    return (
        HeaderView({
            greeting: greeting,
            changeLang: changeLang,
            name: reduxPerson.name,
            surname: reduxPerson.surname,
        })
    );
}

export default Header;