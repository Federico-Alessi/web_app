import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./pages/home";
import MyNursery from "./pages/MyNursery";
import Calendar from "./pages/Calendar";
import BrowsePlants from "./pages/BrowsePlants";
import AdminDashboard from "./pages/AdminDashboard";
import Layout from "./Layout/Layout";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  // Define the routes for the application
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/nursery" element={<MyNursery />}></Route>
            <Route path="/calendar" element={<Calendar />}></Route>
            <Route path="/browse" element={<BrowsePlants />}></Route>
          </Route>
          <Route path="/admin" element={<AdminDashboard />}></Route>
          <Route path="Login" element={<Login />}></Route>
          <Route path="*" element={<NotFound/>}></Route>
          // TODO add 404 page
        </Routes>
      </Provider>
    </>
  );
}

export default App;
