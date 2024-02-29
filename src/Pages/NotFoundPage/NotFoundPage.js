import nexus_logo from "../../Images/nexus_logo.png";
import Center from "../../Components/Utils/Center";

import "./NotFoundPage.css";

const NotFoundPage = () => {
    return (
        <Center>
            <div className="not-found-container">
                <img src={nexus_logo} className="not-found-logo" alt="A 404 Page"/>
                <p>404! Looks like we're currently building that page right now! </p>
            </div>
        </Center>
    )
}

export default NotFoundPage;