import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import {
    Box,
} from "@material-ui/core";

import Navigation from "../components/Navigation";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Header from "../components/Header";
import StreetViewMap from '../components/StreetViewMap'
import ScreenShot from "../components/ScreenShot";

const MyContainer = styled.div`
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    justify-content:space-between;
`;

const Routes = (props)=>{
    const [user, updateUser] = useState(null);
    useEffect(() => {
        const userToken = localStorage.getItem("user");
        updateUser(userToken);
    }, []);
    return (
        <MyContainer>
            <Router>
            <Header/>
            <Box mt={20} flex={1} flexDirection="column" display="flex">
                <Switch>
                    <Route
                        path="/signin"
                        render={(props) => <SignIn {...props} user={user}/>}
                    />
                    <Route
                        path="/signup"
                        render={(props) => <SignUp {...props} user={user}/>}
                    />
                    <Route 
                        path="/"
                        render={(props)=> <><Navigation {...props}/><StreetViewMap></StreetViewMap><div>ddddddddd</div><ScreenShot></ScreenShot></>}
                    />
                </Switch>
            </Box>
            </Router>
        </MyContainer>
    )
}

export default Routes;