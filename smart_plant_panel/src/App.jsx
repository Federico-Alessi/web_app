import reactLogo from "./assets/react.svg";
import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import MyNursery from "./pages/MyNursery";
import BrowsePlants from "./pages/BrowsePlants";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Layout from "./Layout/Layout";
import { Provider } from "react-redux";
import store from "./redux/store";
import PlantDetails from "./pages/PlantDetails";

function App() {
  // Define the routes for the application
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/nursery" element={<MyNursery />}></Route>
            <Route path="/browse" element={<BrowsePlants />}></Route>
            <Route path="/admin" element={<AdminDashboard />}></Route>
            <Route path="/browse/:plantId" element={<PlantDetails />}></Route>
          </Route>
          <Route path="Login" element={<Login />}></Route>
          <Route path="*" element={<NotFound />}></Route>
          // TODO add 404 page
        </Routes>
      </Provider>
    </>
  );
}

export default App;
