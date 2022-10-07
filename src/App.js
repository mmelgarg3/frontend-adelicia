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

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>
        <Route path="/register">
          <AdminNav />
          <Register/>
        </Route>
        <Route path="/dashboard">
          <Navbar show={true} />
          <Dashboard/>
        </Route>
	<Route path="/admin-dash">
	  <AdminNav />
	  <AdminDashboard show={false}/>
	</Route>
	<Route path="/waiter-dash">
	  <Navbar />
	  <WaiterDashboard show={false}/>
	</Route>
	<Route path="/orders">
	  <Navbar show={true}/>
	  <Orders />
	</Route>
	<Route path="/cooking-page">
	  <Navbar show={false}/>
	  <CookingPage />
	</Route>
	<Route path="/client-dash">
	  <Navbar show={true}/>
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
