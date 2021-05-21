import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import {
    Box,
    Container
  } from "@material-ui/core";

import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Header from "../components/Header";
import Maps from "../components/Maps";

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
            <Navigation {...props}/>
                <Box mt={20}  flex={1} flexDirection="column" display="flex">
                    <Switch>
                        <Route
                            path="/signin"
                            // render={(props) =>(
                            //     <SignIn {...props} user={user}/>
                            //     )
                            // }
                        />
                        <Route
                            path="/signup"
                            // render={(props) =>(
                            //     <SignUp {...props} user={user}/>
                            //     )
                            // }
                        />
                        
                        <Route 
                            path="/"
                            // render={(props)=>(<Maps/>)}
                        />
                    </Switch>
                </Box>
                {/* <Footer {...props}/> */}
            </Router>
        </MyContainer>
    )
}

export default Routes;