import React from 'react'

const Quyche = () => {
  return (
    <div className="max-w-3xl mx-auto font-sans">
    <div className="bg-gray-200 p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Quy chế hoạt động</h2>
      <ol className="list-decimal list-inside">
        <li className="mb-4">
          <h3 className="font-bold">Đăng tin cho thuê phòng trọ</h3>
          <p>
            Người dùng có thể đăng tin cho thuê phòng trọ miễn phí trên website. Tin đăng phải cung cấp thông tin chi tiết về phòng trọ, địa chỉ, giá thuê, tiện nghi và hình ảnh minh họa.
          </p>
        </li>
        <li className="mb-4">
          <h3 className="font-bold">Tìm kiếm phòng trọ</h3>
          <p>
            Người dùng có thể tìm kiếm phòng trọ theo nhiều tiêu chí như địa điểm, khoảng giá, diện tích, tiện nghi, v.v. Kết quả tìm kiếm sẽ hiển thị danh sách tin đăng phù hợp với yêu cầu.
          </p>
        </li>
        <li className="mb-4">
          <h3 className="font-bold">Liên hệ và giao dịch</h3>
          <p>
            Người dùng có thể liên hệ trực tiếp với người đăng tin thông qua thông tin liên hệ được cung cấp trong tin đăng. Website không tham gia vào quá trình giao dịch giữa người thuê và người cho thuê.
          </p>
        </li>
        <li className="mb-4">
          <h3 className="font-bold">Quản lý tài khoản</h3>
          <p>
            Người dùng có thể đăng ký tài khoản để quản lý tin đăng, theo dõi lịch sử tìm kiếm và nhận thông báo về phòng trọ phù hợp.
          </p>
        </li>
        <li>
          <h3 className="font-bold">Tuân thủ pháp luật và đạo đức</h3>
          <p>
            Tất cả hoạt động trên website phải tuân thủ pháp luật và đạo đức. Tin đăng có nội dung xấu, vi phạm pháp luật sẽ bị xóa và tài khoản có thể bị khóa.
          </p>
        </li>
      </ol>
    </div>
  </div>
  )
}

export default Quyche