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
function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: 16
        }
      }}
    >
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/listMotel-:id" element={<ListMotel />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
