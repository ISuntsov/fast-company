import React from "react";
import NavBar from "./components/navBar";
import { Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import UsersLayout from "./layouts/usersLayout";
import UserPage from "./components/userPage";

function App() {
    return <>
        <NavBar />
        <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/users/:userId" render={
                (props) => (
                    <UserPage {...props} />
                    )
            }/>
            <Route path="/users" component={UsersLayout} />
        </Switch>
    </>;
}

export default App;
