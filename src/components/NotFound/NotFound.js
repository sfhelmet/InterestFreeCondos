import nexus_logo from "../../imgs/nexus_logo.png";
import Center from "../utils/Center";

import "./NotFound.css";

const NotFound = () => {
    return (
        <Center>
            <div className="not-found-container">
                <img src={nexus_logo} className="not-found-logo" alt="A 404 Page"/>
                <p>404! Looks like we're currently building that page right now! </p>
            </div>
        </Center>
    )
}

export default NotFound;