import { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// Components
import Nav from '../Nav/Nav';
import NavAdmin from '../NavAdmin/NavAdmin';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import NewProfileContainer from '../NewProfileContainer/NewProfileContainer';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import ExploreView from '../ExploreView/ExploreView';
import SavedProviders from '../SavedProviders/SavedProviders';
import InterestedClients from '../InterestedClients/InterestedClients';
import EditClient from '../EditClient/EditClientRoot/EditClientRoot';
import EditProvider from '../EditProvider/EditProviderRoot/EditProviderRoot';
import HowItWorks from '../HowItWorks/HowItWorks';
import AdminPanel from '../AdminPanel/AdminPanel';
import ProviderDetails from '../ProviderDetails/ProviderDetails';
import AdminProviderQuestions from '../AdminProviderQuestions/AdminProviderQuestions';
import AdminUsersList from '../AdminUsersList/AdminUsersList';
import MessagingWidget from '../MessagingWidget/MessagingWidget';
import MessagingWindow from '../MessagingWindow/MessagingWindow';
// Mui imports and theme
import { ThemeProvider, CssBaseline } from '@material-ui/core/';
import theme from '../MuiTheme/MuiTheme';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { filled_out_form, user_type } = useSelector((store) => store.user);
  const { open } = useSelector((store) => store.messages.windowOpen);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div>
          {user_type === 'admin' ? <NavAdmin /> : <Nav />}
          {/* <Nav /> */}
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
            >
              <AboutPage />
            </Route>

            <Route
              // shows HowItWorks at all times (logged in or not)
              exact
              path="/how_it_works"
            >
              <HowItWorks />
            </Route>

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
            >
              {user_type === 'admin' ? (
                <AdminPanel />
              ) : user_type === 'client' ? (
                <ExploreView />
              ) : (
                <InterestedClients />
              )}
            </ProtectedRoute>
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/provider-details/:id"
            >
              <ProviderDetails />
            </ProtectedRoute>
            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/new-profile/:page"
            >
              <NewProfileContainer />
            </ProtectedRoute>

            {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LoginPage at /login
              exact
              path="/login"
              authRedirect="/user"
            >
              <LoginPage />
            </ProtectedRoute>

            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LandingPage at "/home"
              exact
              path="/home"
              authRedirect="/user"
            >
              <LandingPage />
            </ProtectedRoute>

            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows ExploreView at "/explore"
              exact
              path="/explore"
              // authRedirect="/user"
            >
              <ExploreView />
            </ProtectedRoute>

            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows SavedProviders at "/saved_providers"
              exact
              path="/saved_providers"
              // authRedirect="/user"
            >
              <SavedProviders />
            </ProtectedRoute>

            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows InterestedClients at "/interested_clients"
              exact
              path="/interested_clients"
              // authRedirect="/user"
            >
              <InterestedClients />
            </ProtectedRoute>

            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows EditProfile at "/edit_profile"
              exact
              path="/edit_profile"
              // authRedirect="/user"
            >
              {user_type === 'client' ? <EditClient /> : <EditProvider />}
            </ProtectedRoute>

            {user_type === 'admin' && (
              <>
                <ProtectedRoute
                  // with authRedirect:
                  // - if logged in, redirects to "/user"
                  // - else shows AdminPanel at "/admin"
                  exact
                  path="/admin"
                  // authRedirect="/user"
                >
                  <AdminPanel />
                </ProtectedRoute>

                <ProtectedRoute
                  // with authRedirect:
                  // - if logged in, redirects to "/user"
                  // - else shows AdminPanel at "/admin-questions"
                  exact
                  path="/admin-questions"
                  // authRedirect="/user"
                >
                  <AdminProviderQuestions />
                </ProtectedRoute>

                <ProtectedRoute
                  // with authRedirect:
                  // - if logged in, redirects to "/user"
                  // - else shows AdminPanel at "/admin-users"
                  exact
                  path="/admin-users"
                  // authRedirect="/user"
                >
                  <AdminUsersList />
                </ProtectedRoute>
              </>
            )}
            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
          {filled_out_form && <MessagingWidget />}
          {open && <MessagingWindow />}
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
