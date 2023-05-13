import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import CreateQuote from './components/CreateQuote';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import NotFound from './components/NotFound';

export const routes = [
    {path:"/",element:<Home />},
    {path:"/create",element:<CreateQuote />},
    {path:"/login",element:<Login />},
    {path:"/signup",element:<Signup />},
    {path:"/profile",element:<Profile />},
    {path:"/profile/:userid",element:<UserProfile />},
    {path:"*",element:<NotFound />},
]