import React, { useState, useEffect, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
// import { themeProvider } from '@material-ui/styles';
// from apollo boost
// import ApolloClient, { InMemoryCache, HttpLink } from 'apollo-boost';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloProvider } from '@apollo/react-hooks';
import { ToastContainer } from 'react-toastify';
// import components
import Nav from './components/Nav';
import Header from './components/header/Header';
import Users from './pages/Users';
import Register from './pages/auth/Register';
import PasswordUpdate from './pages/auth/PasswordUpdate';
import PasswordForgot from './pages/auth/PasswordForgot';
import Profile from './pages/auth/Profile';
import Login from './pages/auth/Login';
import Home from './pages/Home/Home';
import HomeMobile from './pages/Home/HomeMobile';
import Gains from './pages/Gains/Gains';
import Calculator from './pages/Calculator/Calculator';
import Calendar from './pages/Calendar/Calendar';
import Breakdown from './pages/Breakdown/Breakdown';
import Input from './pages/Input/Input';
import CompleteRegistration from './pages/auth/CompleteRegistration';
import { AuthContext } from './context/authContext';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Post from './pages/post/Post';
import PostUpdate from './pages/post/PostUpdate';
import SinglePost from './pages/post/SinglePost';
import SingleUser from './pages/SingleUser';
import SearchResult from './components/SearchResult';
import { useMediaQuery } from 'react-responsive'

const App = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [value, setValue] = useState(0);
    const isPhone = useMediaQuery({
        query: '(max-width: 580px)'
      })

    const { state } = useContext(AuthContext);
    const { user } = state;

    // 1. create websocket link
    const wsLink = new WebSocketLink({
        uri: process.env.REACT_APP_GRAPHQL_WS_ENDPOINT,
        options: {
            reconnect: true
        }
    });

    // 2. create http link
    const httpLink = new HttpLink({
        uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
    });

    // 3. setContext for authtoken
    const authLink = setContext(() => {
        return {
            headers: {
                authtoken: user ? user.token : ''
            }
        };
    });

    // 4. concat http and authtoken link
    const httpAuthLink = authLink.concat(httpLink);

    // 5. use split to split http link or websocket link
    const link = split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
        },
        wsLink,
        httpAuthLink
    );

    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link
    });

    return (
        <ApolloProvider client={client}>
            {/* <Nav /> */}
            <Header 
                value={value}
                setValue={setValue}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
            />
            <ToastContainer />
            <Switch>
                <Route exact path="/" component={isPhone ? HomeMobile : Home} />
                <Route exact path="/users" component={Users} />
                <PublicRoute exact path="/register" component={Register} />
                <PublicRoute exact path="/login" component={Login} />
                <Route exact path="/complete-registration" component={CompleteRegistration} />
                <Route exact path="/password/forgot" component={PasswordForgot} />
                <PrivateRoute exact path="/password/update" component={PasswordUpdate} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute exact path="/post/create" component={Post} />
                <PrivateRoute exact path="/post/update/:postid" component={PostUpdate} />
                <Route exact path="/user/:username" component={SingleUser} />
                <Route exact path="/post/:postid" component={SinglePost} />
                <Route exact path="/search/:query" component={SearchResult} />
                <Route exact path="/gains" component={Gains} />
                <Route exact path="/input" component={Input} />
                <Route exact path="/calculator" component={Calculator} />
                <Route exact path="/Calendar" component={Calendar} />
                <Route exact path="/breakdown" component={Breakdown} />
            </Switch>
        </ApolloProvider>
    );
};

export default App;
