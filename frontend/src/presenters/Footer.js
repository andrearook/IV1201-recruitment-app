import { useTranslation } from "react-i18next";
import FooterView from "../views/FooterView";

/**
 * Functional component that returns the view for the footer.
 * 
 * @returns A reusable Footer view.
 */
function Footer() {

    const {t} = useTranslation('translation');

    const footer = t("app.footer.info", {framework:'React'});

    return (
        FooterView({
            footer: footer
        })
    );
}

export default Footer;