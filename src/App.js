import logo from "./logo.svg";
import "./App.css";
import Header from "./component/header/Header";
import Footer from "./component/footer/Footer";
import Home from "./component/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListMotel from "./component/listMotel/ListMotel";
function App() {
  return (
    <BrowserRouter>
      <Header /> 
      <Routes>
        <Route index element={<Home />} />
        <Route path="/listMotel-:id" element={<ListMotel />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
