import React from 'react'

const CoCheGiaQuyet = () => {
  return (
    <div className="max-w-3xl mx-auto font-sans">
      <div className="bg-gray-200 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Cơ chế giải quyết tranh chấp</h2>
        <ol className="list-decimal list-inside">
          <li className="mb-4">
            <h3 className="font-bold">Thương lượng trực tiếp</h3>
            <p>
              Trong trường hợp xảy ra tranh chấp, bên thuê và bên cho thuê phải cố gắng giải quyết vấn đề thông qua thương lượng trực tiếp và thỏa thuận hai bên. Đây là cách giải quyết nhanh chóng và hiệu quả nhất.
            </p>
          </li>
          <li className="mb-4">
            <h3 className="font-bold">Hòa giải</h3>
            <p>
              Nếu không đạt được thỏa thuận thông qua thương lượng trực tiếp, các bên có thể yêu cầu can thiệp của một bên thứ ba như tổ chức hòa giải để hỗ trợ giải quyết tranh chấp. Hòa giải là một quá trình không bắt buộc, nhưng có thể giúp đạt được giải pháp thỏa đáng cho cả hai bên.
            </p>
          </li>
          <li className="mb-4">
            <h3 className="font-bold">Trọng tài</h3>
            <p>
              Nếu hòa giải không thành công, các bên có thể lựa chọn giải quyết tranh chấp thông qua trọng tài. Trọng tài là một quá trình giải quyết tranh chấp ngoài tòa án, trong đó một bên thứ ba độc lập sẽ đưa ra quyết định cuối cùng sau khi xem xét các bằng chứng và lắng nghe lý lẽ của cả hai bên.
            </p>
          </li>
          <li>
            <h3 className="font-bold">Tòa án</h3>
            <p>
              Trong trường hợp tranh chấp không thể giải quyết bằng các phương thức khác, các bên có thể khởi kiện ra tòa án để giải quyết tranh chấp theo quy định của pháp luật.
            </p>
          </li>
        </ol>
      </div>    </div>
  )
}

export default CoCheGiaQuyet