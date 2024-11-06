
import { Route, Switch, BrowserRouter} from "react-router-dom";




// different routes
import Home from "../screens/Home";

import CreatePost from "../screens/CreatePost.js";
import Profile from "../screens/Profile";
import UserProfile from "../screens/UserProfile";
import SubscribePost from "../screens/SubscribePosts";


const Routing = () => {
	return (
		<BrowserRouter>
			<Switch>
				{/* Public routes */}
				

				{/* Separate the protected routes from public ones */}
				<Route exact path="/" component={Home} />
				<Route exact path="/explore" component={SubscribePost} />
				<Route exact path="/create" component={CreatePost} />
				<Route exact path="/profile" component={Profile} />
				<Route exact path="/profile/:userid" component={UserProfile} />

				{/* in case we want to handle the 404 page not found */}
				{/* <Route component={NotFound} /> */}
			</Switch>
		</BrowserRouter>
	);
};

export default Routing;
