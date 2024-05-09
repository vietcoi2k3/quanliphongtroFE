import logo from "./logo.svg";
import "./App.css";
import Header from "./component/header/Header";
import Footer from "./component/footer/Footer";
import HomeBody from "./component/home/HomeBody";
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
import DetailMotel from "./component/detailMotel/DetailMotel";
import Hompage from "./component/home/Hompage";
import RechargeSuccess from "./component/menu/RechargeSuccess";
import NotFound from "./component/NotFound";
function App() {
  return (
    // Sử dụng ConfigProvider của Ant Design để cấu hình theme
    <ConfigProvider
      theme={{
        token: {
          fontSize: 14
        }
      }}
    >
      {/* Sử dụng AuthProvider để quản lý xác thực */}
      <AuthProvider>
        <BrowserRouter>
        {/* Sử dụng Routes để định nghĩa các route */}
          <Routes>
             {/* Route chính */}
            <Route path="/" element={<Hompage />} >
              <Route index element={<HomeBody />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/listMotel" element={<ListMotel />} />
              <Route path="/motel/:idMotel" element={<DetailMotel />} />
            </Route>
            {/* Route cho người dùng đã đăng nhập*/}
            <Route path="/user" element={<PrivateRoute component={MenuUser} />}>
              <Route path="quan-ly-tin" element={<ManagePostings />} />
              <Route path="dang-tin-moi" element={<PostNews />} />
              <Route path="thong-tin-ca-nhan" element={<PersonalInformation />} />
              <Route path="doi-mat-khau" element={<ChangePassword />} />
              <Route path="nap-tai-khoan-thanh-cong" element={<RechargeSuccess />} />
            </Route>
            {/* Route mặc định nếu không tìm thấy */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ConfigProvider>

  );
}

export default App;
