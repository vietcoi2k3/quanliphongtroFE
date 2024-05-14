import React from 'react'

const QuyDinhDangTin = () => {
  return (
    <div className="max-w-3xl mx-auto font-sans">
    <div className="bg-gray-200 p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Quy định đăng tin</h2>
      <ol className="list-decimal list-inside">
        <li className="mb-4">
          <h3 className="font-bold">Nội dung tin đăng</h3>
          <p>
            Tin đăng phải cung cấp thông tin chính xác, đầy đủ và minh bạch về phòng trọ. Không được đăng tin với nội dung gây hiểu lầm, lừa đảo hoặc quảng cáo sai sự thật.
          </p>
        </li>
        <li className="mb-4">
          <h3 className="font-bold">Hình ảnh minh họa</h3>
          <p>
            Hình ảnh minh họa phải phản ánh đúng thực tế phòng trọ. Không được sử dụng hình ảnh giả tạo hoặc hình ảnh không liên quan đến phòng trọ.
          </p>
        </li>
        <li className="mb-4">
          <h3 className="font-bold">Thông tin liên hệ</h3>
          <p>
            Tin đăng phải cung cấp thông tin liên hệ chính xác và hợp pháp của người đăng tin để người thuê có thể liên hệ trực tiếp.
          </p>
        </li>
        <li className="mb-4">
          <h3 className="font-bold">Không đăng tin lặp lại</h3>
          <p>
            Không được đăng nhiều tin về cùng một phòng trọ. Nếu tin đăng đã hết hạn, người dùng có thể gia hạn tin đăng thay vì đăng tin mới.
          </p>
        </li>
        <li>
          <h3 className="font-bold">Tuân thủ pháp luật và đạo đức</h3>
          <p>
            Tất cả tin đăng phải tuân thủ pháp luật và đạo đức. Tin đăng có nội dung xấu, vi phạm pháp luật sẽ bị xóa và tài khoản có thể bị khóa.
          </p>
        </li>
      </ol>
    </div>
  </div>
  )
}

export default QuyDinhDangTin