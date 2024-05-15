# Sử dụng hình ảnh Node.js phiên bản 14.17 chính thức
FROM node:14.17

# Thiết lập thư mục làm việc trong container
WORKDIR /usr/src/app

# Sao chép file package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các phụ thuộc của ứng dụng
RUN npm install

# Sao chép mã nguồn của ứng dụng vào thư mục làm việc
COPY . .

# Expose cổng mà ứng dụng sẽ chạy
EXPOSE 3003

# Lệnh để chạy ứng dụng
CMD ["npm", "start"]