import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import AdminDashboard from "./components/admin-dash";
import WaiterDashboard from "./components/WaiterDashboard";
import Orders from "./components/user-components/Orders";
import CookingPage from "./components/user-components/CookingPage";
import ClientDash from "./components/user-components/clientDash";
import PaymentPage from "./components/user-components/paymentPage";
import AdminNav from "./components/AdminNav";
import Logo from './components/Logo';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
	  <Logo />
          <Login/>
        </Route>
        <Route path="/register">
	  <Logo />
          <AdminNav />
          <Register/>
        </Route>
        <Route path="/dashboard">
          <Navbar show={true} />
	  <Logo />
          <Dashboard/>
        </Route>
	<Route path="/admin-dash">
	  <AdminNav />
	  <Logo />
	  <AdminDashboard show={false}/>
	</Route>
	<Route path="/waiter-dash">
	  <Navbar />
	  <Logo />
	  <WaiterDashboard show={false}/>
	</Route>
	<Route path="/orders">
	  <Navbar show={true}/>
	  <Logo />
	  <Orders />
	</Route>
	<Route path="/cooking-page">
	  <Navbar show={false}/>
	  <Logo />
	  <CookingPage />
	</Route>
	<Route path="/client-dash">
	  <Navbar show={true}/>
	  <Logo />
	  <ClientDash />
	</Route>
	<Route path="/payment-page">
	  <Navbar show={true}/>
	  <PaymentPage />
	</Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
