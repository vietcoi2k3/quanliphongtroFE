import React from 'react'

const Chinhsach = () => {
    return (
        <div className="max-w-3xl mx-auto font-sans">
    <div className="bg-gray-100 p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Chính sách bảo mật</h2>
      <div className="mb-6">
        <h3 className="font-bold">Thu thập thông tin</h3>
        <p>
          Chúng tôi thu thập các thông tin cơ bản như địa chỉ email, số điện thoại và địa chỉ khi người dùng đăng ký tài khoản hoặc đăng tin trên trang web. Những thông tin này chỉ được sử dụng để cải thiện trải nghiệm người dùng và không được chia sẻ với bên thứ ba.
        </p>
      </div>
      <div className="mb-6">
        <h3 className="font-bold">Bảo mật thông tin</h3>
        <p>
          Chúng tôi áp dụng các biện pháp bảo mật nghiêm ngặt để đảm bảo thông tin của người dùng được bảo vệ khỏi truy cập trái phép, sử dụng sai mục đích hoặc tiết lộ không đúng cách. Thông tin được mã hóa và lưu trữ trên máy chủ an toàn.
        </p>
      </div>
      <div className="mb-6">
        <h3 className="font-bold">Chia sẻ thông tin</h3>
        <p>
          Chúng tôi không bán, cho thuê hoặc chia sẻ thông tin cá nhân của người dùng với bất kỳ bên thứ ba nào, trừ khi được yêu cầu bởi pháp luật hoặc có sự đồng ý của người dùng.
        </p>
      </div>
      <div>
        <h3 className="font-bold">Quyền riêng tư của trẻ em</h3>
        <p>
          Trang web của chúng tôi không nhằm mục đích thu thập thông tin từ trẻ em dưới 13 tuổi. Nếu phát hiện có thông tin của trẻ em, chúng tôi sẽ xóa ngay lập tức.
        </p>
      </div>
    </div>
  </div>
    )
}

export default Chinhsach