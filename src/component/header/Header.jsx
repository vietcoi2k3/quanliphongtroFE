import React from "react";
import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <div
        className="section-1"
        class="flex justify-between py-2.5 px-8 border-b-[1px]"
      >
        <div class="flex">
          <div className="listItem">Cho thuê phòng trọ</div>
          <div className="listItem">Cho thuê nhà ở</div>
          <div className="listItem">Cho thuê căn hộ</div>
          <div className="listItem">Tìm người ở ghép</div>
        </div>
        <div class="flex">
          <div className="listItem">
            <i class="fa-regular fa-bell"></i>
          </div>
          <div className="listItem">
            <i class="fa-solid fa-user-plus"></i>
            <a href="" class="mx-1.5">
              Đăng kí
            </a>
          </div>
          <div className="listItem">
            <i class="fa-solid fa-right-to-bracket"></i>
            <a href="" class="mx-1.5">
              Đăng nhập
            </a>
          </div>
          <div
            className=""
            class="px-[10px] py-[5px] text-lg bg-[var(--red-color-)] text-white rounded-lg"
          >
            <i class="fa-regular fa-pen-to-square"></i>
            <a href="" class="mx-1.5">
              Đăng tin
            </a>
          </div>
        </div>
      </div>
      <div className="section-2" class="flex justify-center shadow">
        <div className="listSelect">
          <span class="text-slate-500 text-sm font-medium">Loại nhà đất <i class="fa-solid fa-chevron-down"></i></span>
          <span>Tất cả</span>
        </div>
        <div className="listSelect">
          <span class="text-slate-500 text-sm font-medium">khu vực <i class="fa-solid fa-chevron-down"></i></span>
          <span>Tất cả</span>
        </div>
        <div className="listSelect">
          <span class="text-slate-500 text-sm font-medium">Khoảng giá <i class="fa-solid fa-chevron-down"></i></span>
          <span>Tất cả</span>
        </div>
        <div className="listSelect">
          <span class="text-slate-500 text-sm font-medium">Diện tích <i class="fa-solid fa-chevron-down"></i></span>
          <span>Tất cả</span>
        </div>
   
        <div class="my-[10px] text-center flex items-center border-[1px] px-[16px] text-lg rounded-lg cursor-pointer"><i class="fa-solid fa-arrows-rotate mr-1"></i><a>Đặt lại</a></div>
      </div>
    </div>
  );
};

export default Header;
