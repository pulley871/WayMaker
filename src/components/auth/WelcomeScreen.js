import ModalExample from "./Login"
import SelectUserType from "./SelectUserType"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useHistory } from "react-router";
import "./login.css"
import Logo from "../../images/Logo.png"
export const WelcomeScreen = () => {
    const history = useHistory()
    return (<>
        <section className="welcomescreen">
            <div className="welcomescreen_img">

                <img src={Logo}/>
            </div>
            <div className="loginButtons">
                <div>
                    <ModalExample buttonLabel="Login"/>

                </div>
                <div>

                    <SelectUserType buttonLabel="Register" />
                </div>

            </div>
        </section>




           
    </>)
}