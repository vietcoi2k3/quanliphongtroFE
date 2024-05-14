import React from 'react'

const Gioithieu = () => {
  return (
   <div>
    <header className="bg-gray-800 text-white py-4">
      <nav>
        <ul className="flex justify-center space-x-8">
          <li><a href="#" className="hover:text-gray-400 text-xl">Giới thiệu</a></li>
        </ul>
      </nav>
    </header>
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Giới thiệu</h1>
      <p className="mb-4">PhongTroVN là kênh thông tin về phòng trọ, nhà trọ hàng đầu tại Việt Nam. Website được thành lập vào tháng 09/2023 - là website đầu tiên hỗ trợ riêng biệt cho người muốn đăng tin cho thuê phòng trọ cũng như người tìm phòng trọ một cách nhanh nhất và chính xác nhất.</p>

      <p className="mb-4">Mục tiêu mà chúng tôi là hướng tới là xây dựng kênh thông tin về phòng trọ hiệu quả nhất, phổ biến nhất, thỏa mãn tốt nhất mọi nhu cầu về cho thuê phòng trọ, là câu nối thượng mại giữa người thuê - cho thuê.</p>
    </main>
    <footer className="bg-gray-800 text-white py-4 text-center">
      <p>&copy; Thuephongtro.com</p>
    </footer>
   </div>
  )
}

export default Gioithieu