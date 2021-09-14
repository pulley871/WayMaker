import { Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationView"
import { WelcomeScreen } from "./auth/WelcomeScreen"
import { NavBar } from "./nav/NavBar"
import { Route } from "react-router"
import { AuthProvider } from "./auth/AuthProvider"
import { RegisterUser } from "./auth/RegisterUser"
import { RegisterChurch } from "./auth/RegisterChurch"
export const WayMaker = () => {
    return (<>
            <Route
                render={() => {
                    if (localStorage.getItem("waymaker_user") || localStorage.getItem("waymaker_church")){
                        return (
                            <>
                            <NavBar />
                            <h1>WayMaker</h1>
                            <ApplicationViews />
                            </>
                        )
                    }else {
                        return (<Redirect to="/login" />)
                    }
                }}/>
        <AuthProvider>

            <Route path="/login">
                <WelcomeScreen />
            </Route>
            <Route path="/registeruser">
                <RegisterUser />
            </Route>
            <Route path="/registerchurch">
                <RegisterChurch />
            </Route>
        </AuthProvider>
                

        </>)
}