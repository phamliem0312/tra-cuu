# Student Grade Lookup System

## Mô tả
Hệ thống tra cứu điểm sinh viên sử dụng ExpressJS, đọc dữ liệu từ file Excel và cung cấp giao diện web responsive.

## Tính năng
- ✅ Tra cứu thông tin sinh viên bằng mã sinh viên hoặc tên
- ✅ Hiển thị điểm các môn học với giao diện linh hoạt
- ✅ Autocomplete khi nhập mã sinh viên
- ✅ Responsive design cho cả web và mobile
- ✅ API RESTful để tra cứu dữ liệu
- ✅ Đọc dữ liệu từ file Excel
- ✅ Hiển thị thông tin tổng quan và ghi chú

## Cấu trúc dự án
```
tra-cuu/
├── server.js              # Main server file
├── package.json           # Dependencies
├── views/
│   └── index.ejs         # Main view template
├── data/
│   ├── students.xlsx     # Excel data file
│   └── create-sample-excel.js  # Script to create sample data
└── README.md
```

## Cài đặt và chạy

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Tạo file Excel mẫu (nếu chưa có)
```bash
cd data
node create-sample-excel.js
cd ..
```

### 3. Chạy server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### 4. Truy cập ứng dụng
Mở trình duyệt và vào: `http://localhost:3000`

## API Endpoints

### GET /
Hiển thị trang tra cứu chính

### GET /api/student/:id
Tra cứu thông tin sinh viên theo mã
- **Params**: `id` - Mã sinh viên
- **Response**: 
```json
{
  "success": true,
  "data": {
    "id": "21522001",
    "name": "Nguyễn Văn A",
    "class": "KTPM2021-1",
    "faculty": "Công nghệ Thông tin",
    "year": "2023-2024",
    "semester": "Học kỳ 1",
    "overallGPA": 7.8,
    "overallResult": "Khá",
    "note": "Sinh viên tích cực...",
    "subjects": [...]
  }
}
```

### GET /api/search?q=query
Tìm kiếm sinh viên (cho autocomplete)
- **Query**: `q` - Từ khóa tìm kiếm
- **Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "21522001",
      "name": "Nguyễn Văn A",
      "class": "KTPM2021-1"
    }
  ]
}
```

### GET /api/students
Lấy danh sách tất cả sinh viên

### POST /api/reload-data
Tải lại dữ liệu từ file Excel

## Cấu trúc dữ liệu Excel

File Excel cần có các cột sau:
- **Mã sinh viên**: Mã định danh sinh viên
- **Họ tên**: Tên đầy đủ của sinh viên
- **Lớp**: Lớp học
- **Khoa**: Khoa/Ngành học
- **Năm học**: Năm học (VD: 2023-2024)
- **Học kỳ**: Học kỳ (VD: Học kỳ 1)
- **Mã môn học**: Mã môn học
- **Tên môn học**: Tên đầy đủ môn học
- **Số tín chỉ**: Số tín chỉ của môn
- **Điểm quá trình**: Điểm quá trình
- **Điểm cuối kỳ**: Điểm thi cuối kỳ
- **Điểm tổng kết**: Điểm tổng kết môn học
- **Xếp loại**: Xếp loại môn học (A, B+, B, C+, C, D+, D, F)
- **Ghi chú môn học**: Ghi chú cho từng môn học
- **Điểm trung bình chung**: GPA tổng của sinh viên
- **Kết quả chung**: Kết quả học tập chung (Xuất sắc, Giỏi, Khá, Trung bình, Yếu)
- **Ghi chú**: Ghi chú chung cho sinh viên

## Dữ liệu mẫu

Hệ thống đi kèm với dữ liệu mẫu của 4 sinh viên:
- **21522001**: Nguyễn Văn A (KTPM2021-1)
- **21522002**: Trần Thị B (KTPM2021-2)
- **21522003**: Lê Văn C (KT2021-1)
- **21522004**: Phạm Thị D (TC2021-1)

## Tính năng giao diện

### Web Desktop
- Giao diện hiện đại với gradient background
- Table hiển thị điểm số với color coding
- Hover effects và animations
- Search với autocomplete dropdown

### Mobile
- Responsive design
- Card layout thay vì table
- Touch-friendly interface
- Optimized typography và spacing

## Customization

### Thay đổi màu sắc
Chỉnh sửa CSS variables trong file `views/index.ejs`:
- Primary color: `#1e6b5a`
- Secondary color: `#f4d03f`
- Background gradient

### Thêm môn học mới
Chỉ cần thêm dữ liệu vào file Excel với cấu trúc đã định nghĩa, hệ thống sẽ tự động hiển thị.

### Custom styling cho điểm số
Chỉnh sửa hàm `getScoreClass()` trong JavaScript để thay đổi logic phân loại điểm.

## Dependencies

- **express**: Web framework
- **xlsx**: Excel file processing
- **ejs**: Template engine
- **cors**: CORS middleware
- **path**: File path utilities

## Development

### Nodemon
Dự án đã được cấu hình để sử dụng nodemon cho development:
```bash
npm run dev
```

### Error Handling
- Graceful error handling cho file Excel không tồn tại
- API error responses
- Client-side error display

## Production Deployment

1. Set environment variables:
   ```bash
   NODE_ENV=production
   PORT=3000
   ```

2. Start server:
   ```bash
   npm start
   ```

## Troubleshooting

### File Excel không tìm thấy
- Kiểm tra đường dẫn file trong `data/students.xlsx`
- Chạy script tạo file mẫu: `node data/create-sample-excel.js`

### Port đã được sử dụng
- Thay đổi PORT trong environment variables
- Hoặc tắt service đang sử dụng port 3000

### Lỗi CORS
- Middleware CORS đã được cấu hình
- Kiểm tra origin settings nếu cần custom

## License
MIT License
