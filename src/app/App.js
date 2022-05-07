import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import NavBar from "./components/navBar";

import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import UserPage from "./components/userPage";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route
                    path="/users/:userId"
                    render={(props) => <UserPage {...props} />}
                />
                <Route path="/users" component={Users} />
                <Route path="/login" component={Login} />
                <Route path="/" exact component={Main} />
                <Redirect to="/" />
            </Switch>
        </>
    );
}

export default App;
