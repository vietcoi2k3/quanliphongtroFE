import logo from "./logo.svg";
import "./App.css";
import Header from "./component/header/Header";
import Footer from "./component/footer/Footer";
import Home from "./component/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListMotel from "./component/listMotel/ListMotel";
import { ConfigProvider } from 'antd'
import Login from "./component/login/Login";
import Register from "./component/register/Register";
import MenuUser from "./component/menu/MenuUser";
import ManagePostings from "./component/menu/ManagePostings";
import PostNews from "./component/menu/PostNews";
import PersonalInformation from "./component/menu/PersonalInformation";
import ChangePassword from "./component/menu/ChangePassword";
import PrivateRoute from "./component/PrivateRoute";
import { AuthProvider } from "./AuthContext";
function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: 16
        }
      }}
    >
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/listMotel" element={<ListMotel />} />
            <Route path="/user" element={<PrivateRoute component={MenuUser} />}>
              <Route path="quan-ly-tin" element={<ManagePostings />} />
              <Route path="dang-tin-moi" element={<PostNews />} />
              <Route path="thong-tin-ca-nhan" element={<PersonalInformation />} />
              <Route path="doi-mat-khau" element={<ChangePassword />} />
            </Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </ConfigProvider>

  );
}

export default App;
