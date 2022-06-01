import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import NavBar from './components/ui/navBar';
import Main from './layouts/main';
import Login from './layouts/login';
import Users from './layouts/users';
import { ToastContainer } from 'react-toastify';
// import { QualProfProvider } from './hooks/useQualProf';
import { ProfessionProvider } from './hooks/useProfession';
import { QualitiesProvider } from './hooks/useQualities';

function App() {
    return (
        <>
            <NavBar/>
            
            <QualitiesProvider><ProfessionProvider>
                
                {/* <QualProfProvider> */}
                <Switch>
                    <Route path="/users/:userId?/:edit?" component={Users}/>
                    <Route path="/login/:type?" component={Login}/>
                    <Route path="/" exact component={Main}/>
                    <Redirect to="/"/>
                </Switch>
                {/* </QualProfProvider> */}
            
            </ProfessionProvider></QualitiesProvider>
            
            <ToastContainer/>
        </>
    );
}

export default App;
