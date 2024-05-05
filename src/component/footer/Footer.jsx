import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div class="grid gap-x-16 grid-cols-4 px-[250px] pb-[50px] bg-[#205597] bottom-0 right-0 top-0">
      <div>
        <h3 class="text-left text-amber-300 py-4 font-bold text-[15px]">
          Về chúng tôi
        </h3>
        <ul class="list-none text-left">
          <li>
            Website cho thuê phòng trọ, nhà <br /> trọ nhanh chóng và hiệu quả
          </li>
          <li>
            {" "}
            <i class="fa-solid fa-location-dot mr-[6px]"></i>{" "}
            <a href="">P.Đakao, Quận 1, TP.HCM</a>
          </li>
          <li>
            {" "}
            <i class="fa-solid fa-phone mr-[6px]"></i>
            <a href="">0967833378</a>
          </li>
          <li>
            {" "}
            <i class="fa-solid fa-envelope mr-[6px]"></i>
            <a href="">nhatroviet@gmail.com</a>
          </li>
        </ul>
      </div>
      <div class="grid-cols-4">
        <h3 class="text-left text-amber-300 py-4 font-bold text-[15px]">
          Giới thiệu
        </h3>
        <ul class="list-none text-left">
          <li>
            <a href="">Giới thiệu</a>
          </li>
          <li>
            <a href="">Quy chế hoạt động</a>
          </li>
          <li>
            <a href="">Chính sách bảo mật</a>
          </li>
          <li>
            <a href="">Quy định sử dụng</a>
          </li>
          <li>
            <a href="">Liên hệ</a>
          </li>
        </ul>
      </div>
      <div class="grid-cols-4">
        <h3 class="text-left text-amber-300 py-4 font-bold text-[15px]">Hỗ trợ</h3>
        <ul class="list-none text-left">
          <li>Hướng dẫn đăng tin</li>
          <li>Quy định đăng tin</li>
          <li>Cơ chế giải quyết tranh chấp</li>
          <li>Tin tức</li>
        </ul>
      </div>
      <div class="grid-cols-4">
        <h3 class="text-left text-amber-300 py-4 font-bold text-[15px]">
          {" "}
          Phương thức thanh toán
        </h3>
      </div>
    </div>
  );
};

export default Footer;
