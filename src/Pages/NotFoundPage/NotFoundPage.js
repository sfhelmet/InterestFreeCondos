import nexus_logo from "../../Images/Logos/Nexus-clear-noText.png";
import Center from "../../components/utils/Center";

import "./NotFoundPage.css";

const NotFoundPage = () => {
    return (
        <div className="NotFound404">
        <Center>
            
            <div className="not-found-container">
                <img src={nexus_logo} className="not-found-logo" alt="A 404 Page"/>
                <h3 className='nexus' style={{fontFamily: 'telemarines', fontSize: '24px'}}>Nexus</h3>
                <p>404! Looks like we're currently building that page right now! </p>
            </div>
        </Center>
        </div>
    )
}

export default NotFoundPage;