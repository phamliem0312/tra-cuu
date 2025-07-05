const xlsx = require('xlsx');
const path = require('path');

// Sample data according to new structure: SV002 format
const sampleData = [
    {
        'STT': 1,
        'Mã sinh viên': 'SV001',
        'Họ và tên': 'Nguyễn Văn A',
        'Ngày sinh': new Date(2003, 2, 15), // March 15, 2003
        'Lớp': 'TX01/21.01HN01',
        'Nơi sinh': 'Hà Nội',
        'Đối tượng': '2.5 năm',
        'Điểm 1': 8.5,
        'Điểm 2': 'CT1',
        'Điểm 3': 'CT2',
        'Điểm 4': 7.8,
        'Điểm 5': '2.5A',
        'Điểm 6': 'N/A',
        'Điểm 7': 'N/A',
        'Điểm 8': 'N/A',
        'Điểm 9': 'N/A',
        'Điểm 10': 'N/A',
        'Kết quả': 'Đạt',
        'Ghi chú 1': 'Sinh viên học tập tốt, có thái độ học tập nghiêm túc',
        'Ghi chú 2': 'Cần cải thiện kỹ năng thuyết trình (https://example.com/guide)',
        'Ghi chú 3': 'Đề xuất tham gia hoạt động ngoại khóa'
    },
    {
        'STT': 2,
        'Mã sinh viên': 'SV002',
        'Họ và tên': 'Nguyễn Bá Bình',
        'Ngày sinh': new Date(2003, 0, 20), // January 20, 2003
        'Lớp': 'TX01/21.01HN01',
        'Nơi sinh': 'Hà Nội',
        'Đối tượng': '2.5 năm',
        'Điểm 1': 6.2,
        'Điểm 2': 'CT1',
        'Điểm 3': 'CT2',
        'Điểm 4': 'N/A',
        'Điểm 5': 'N/A',
        'Điểm 6': 'N/A',
        'Điểm 7': 'N/A',
        'Điểm 8': 'N/A',
        'Điểm 9': 'N/A',
        'Điểm 10': '2.5A',
        'Kết quả': 'Đạt',
        'Ghi chú 1': 'note1(có thể gán được link url)',
        'Ghi chú 2': 'note2(có thể gán được link url)',
        'Ghi chú 3': 'note3(có thể gán được link url)'
    },
    {
        'STT': 3,
        'Mã sinh viên': 'SV003',
        'Họ và tên': 'Trần Thị C',
        'Ngày sinh': new Date(2003, 4, 10), // May 10, 2003
        'Lớp': 'TX02/21.01HN02',
        'Nơi sinh': 'Hải Phòng',
        'Đối tượng': '3 năm',
        'Điểm 1': 9.2,
        'Điểm 2': 'A',
        'Điểm 3': 'A+',
        'Điểm 4': 8.8,
        'Điểm 5': '3.5A',
        'Điểm 6': 9.0,
        'Điểm 7': 'N/A',
        'Điểm 8': 'N/A',
        'Điểm 9': 'N/A',
        'Điểm 10': 'N/A',
        'Kết quả': 'Giỏi',
        'Ghi chú 1': 'Sinh viên xuất sắc, đạt nhiều thành tích cao',
        'Ghi chú 2': 'Được đề xuất học bổng (https://scholarship.edu.vn)',
        'Ghi chú 3': 'Tham gia nghiên cứu khoa học'
    },
    {
        'STT': 4,
        'Mã sinh viên': 'SV004',
        'Họ và tên': 'Lê Minh D',
        'Ngày sinh': new Date(2003, 6, 25), // July 25, 2003
        'Lớp': 'TX03/21.01HN03',
        'Nơi sinh': 'Đà Nẵng',
        'Đối tượng': '2.5 năm',
        'Điểm 1': 7.5,
        'Điểm 2': 'B+',
        'Điểm 3': 'B',
        'Điểm 4': 8.0,
        'Điểm 5': 'N/A',
        'Điểm 6': 'N/A',
        'Điểm 7': 'N/A',
        'Điểm 8': 'N/A',
        'Điểm 9': 'N/A',
        'Điểm 10': 'N/A',
        'Kết quả': 'Khá',
        'Ghi chú 1': 'Sinh viên có tinh thần học tập tốt',
        'Ghi chú 2': 'Cần theo dõi thêm về kết quả học tập (https://portal.edu.vn/student)',
        'Ghi chú 3': 'Khuyến khích tham gia các hoạt động nhóm'
    }
];

// Create workbook and worksheet
const workbook = xlsx.utils.book_new();
const worksheet = xlsx.utils.json_to_sheet(sampleData);

// Add worksheet to workbook
xlsx.utils.book_append_sheet(workbook, worksheet, 'Students');

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname);
const filePath = path.join(dataDir, 'students.xlsx');
    },
    
    // Student 2
    {
        'Mã sinh viên': '21522002',
        'Họ tên': 'Trần Thị B',
        'Lớp': 'KTPM2021-2',
        'Khoa': 'Công nghệ Thông tin',
        'Năm học': '2023-2024',
        'Học kỳ': 'Học kỳ 1',
        'Mã môn học': 'IT001',
        'Tên môn học': 'Nhập môn lập trình',
        'Số tín chỉ': 4,
        'Điểm quá trình': 9.0,
        'Điểm cuối kỳ': 8.0,
        'Điểm tổng kết': 8.4,
        'Xếp loại': 'A',
        'Ghi chú môn học': 'Rất tốt',
        'Điểm trung bình chung': 8.2,
        'Kết quả chung': 'Giỏi',
        'Ghi chú': 'Sinh viên xuất sắc, có thể tham gia nghiên cứu khoa học'
    },
    {
        'Mã sinh viên': '21522002',
        'Họ tên': 'Trần Thị B',
        'Lớp': 'KTPM2021-2',
        'Khoa': 'Công nghệ Thông tin',
        'Năm học': '2023-2024',
        'Học kỳ': 'Học kỳ 1',
        'Mã môn học': 'IT002',
        'Tên môn học': 'Lập trình hướng đối tượng',
        'Số tín chỉ': 4,
        'Điểm quá trình': 8.5,
        'Điểm cuối kỳ': 9.0,
        'Điểm tổng kết': 8.8,
        'Xếp loại': 'A',
        'Ghi chú môn học': 'Xuất sắc',
        'Điểm trung bình chung': 8.2,
        'Kết quả chung': 'Giỏi',
        'Ghi chú': 'Sinh viên xuất sắc, có thể tham gia nghiên cứu khoa học'
    },
    {
        'Mã sinh viên': '21522002',
        'Họ tên': 'Trần Thị B',
        'Lớp': 'KTPM2021-2',
        'Khoa': 'Công nghệ Thông tin',
        'Năm học': '2023-2024',
        'Học kỳ': 'Học kỳ 1',
        'Mã môn học': 'IT003',
        'Tên môn học': 'Cấu trúc dữ liệu và giải thuật',
        'Số tín chỉ': 4,
        'Điểm quá trình': 8.0,
        'Điểm cuối kỳ': 7.5,
        'Điểm tổng kết': 7.7,
        'Xếp loại': 'B+',
        'Ghi chú môn học': 'Tốt',
        'Điểm trung bình chung': 8.2,
        'Kết quả chung': 'Giỏi',
        'Ghi chú': 'Sinh viên xuất sắc, có thể tham gia nghiên cứu khoa học'
    },
    {
        'Mã sinh viên': '21522002',
        'Họ tên': 'Trần Thị B',
        'Lớp': 'KTPM2021-2',
        'Khoa': 'Công nghệ Thông tin',
        'Năm học': '2023-2024',
        'Học kỳ': 'Học kỳ 1',
        'Mã môn học': 'MA001',
        'Tên môn học': 'Toán cao cấp A1',
        'Số tín chỉ': 3,
        'Điểm quá trình': 9.0,
        'Điểm cuối kỳ': 8.5,
        'Điểm tổng kết': 8.7,
        'Xếp loại': 'A',
        'Ghi chú môn học': 'Xuất sắc',
        'Điểm trung bình chung': 8.2,
        'Kết quả chung': 'Giỏi',
        'Ghi chú': 'Sinh viên xuất sắc, có thể tham gia nghiên cứu khoa học'
    },

    // Student 3 - Economics student
    {
        'Mã sinh viên': '21522003',
        'Họ tên': 'Lê Văn C',
        'Lớp': 'KT2021-1',
        'Khoa': 'Kinh tế',
        'Năm học': '2023-2024',
        'Học kỳ': 'Học kỳ 1',
        'Mã môn học': 'KT001',
        'Tên môn học': 'Nguyên lý kinh tế vi mô',
        'Số tín chỉ': 3,
        'Điểm quá trình': 7.5,
        'Điểm cuối kỳ': 8.0,
        'Điểm tổng kết': 7.8,
        'Xếp loại': 'B+',
        'Ghi chú môn học': 'Hiểu bài tốt',
        'Điểm trung bình chung': 7.5,
        'Kết quả chung': 'Khá',
        'Ghi chú': 'Cần tăng cường thực hành'
    },
    {
        'Mã sinh viên': '21522003',
        'Họ tên': 'Lê Văn C',
        'Lớp': 'KT2021-1',
        'Khoa': 'Kinh tế',
        'Năm học': '2023-2024',
        'Học kỳ': 'Học kỳ 1',
        'Mã môn học': 'KT002',
        'Tên môn học': 'Nguyên lý kinh tế vĩ mô',
        'Số tín chỉ': 3,
        'Điểm quá trình': 8.0,
        'Điểm cuối kỳ': 7.0,
        'Điểm tổng kết': 7.4,
        'Xếp loại': 'B+',
        'Ghi chú môn học': 'Cần cải thiện phần lý thuyết',
        'Điểm trung bình chung': 7.5,
        'Kết quả chung': 'Khá',
        'Ghi chú': 'Cần tăng cường thực hành'
    },
    {
        'Mã sinh viên': '21522003',
        'Họ tên': 'Lê Văn C',
        'Lớp': 'KT2021-1',
        'Khoa': 'Kinh tế',
        'Năm học': '2023-2024',
        'Học kỳ': 'Học kỳ 1',
        'Mã môn học': 'TC001',
        'Tên môn học': 'Nguyên lý kế toán',
        'Số tín chỉ': 4,
        'Điểm quá trình': 6.5,
        'Điểm cuối kỳ': 7.5,
        'Điểm tổng kết': 7.1,
        'Xếp loại': 'B',
        'Ghi chú môn học': 'Cần thực hành thêm',
        'Điểm trung bình chung': 7.5,
        'Kết quả chung': 'Khá',
        'Ghi chú': 'Cần tăng cường thực hành'
    },

    // Student 4 - Finance student
    {
        'Mã sinh viên': '21522004',
        'Họ tên': 'Phạm Thị D',
        'Lớp': 'TC2021-1',
        'Khoa': 'Tài chính',
        'Năm học': '2023-2024',
        'Học kỳ': 'Học kỳ 1',
        'Mã môn học': 'TC001',
        'Tên môn học': 'Nguyên lý kế toán',
        'Số tín chỉ': 4,
        'Điểm quá trình': 9.0,
        'Điểm cuối kỳ': 8.5,
        'Điểm tổng kết': 8.7,
        'Xếp loại': 'A',
        'Ghi chú môn học': 'Xuất sắc',
        'Điểm trung bình chung': 8.5,
        'Kết quả chung': 'Giỏi',
        'Ghi chú': 'Sinh viên tiềm năng, nên phát triển kỹ năng lãnh đạo'
    },
    {
        'Mã sinh viên': '21522004',
        'Họ tên': 'Phạm Thị D',
        'Lớp': 'TC2021-1',
        'Khoa': 'Tài chính',
        'Năm học': '2023-2024',
        'Học kỳ': 'Học kỳ 1',
        'Mã môn học': 'TC002',
        'Tên môn học': 'Tài chính doanh nghiệp',
        'Số tín chỉ': 3,
        'Điểm quá trình': 8.5,
        'Điểm cuối kỳ': 9.0,
        'Điểm tổng kết': 8.8,
        'Xếp loại': 'A',
        'Ghi chú môn học': 'Hiểu sâu về lý thuyết',
        'Điểm trung bình chung': 8.5,
        'Kết quả chung': 'Giỏi',
        'Ghi chú': 'Sinh viên tiềm năng, nên phát triển kỹ năng lãnh đạo'
    },
    {
        'Mã sinh viên': '21522004',
        'Họ tên': 'Phạm Thị D',
        'Lớp': 'TC2021-1',
        'Khoa': 'Tài chính',
        'Năm học': '2023-2024',
        'Học kỳ': 'Học kỳ 1',
        'Mã môn học': 'TC003',
        'Tên môn học': 'Thị trường tài chính',
        'Số tín chỉ': 3,
        'Điểm quá trình': 8.0,
        'Điểm cuối kỳ': 8.0,
        'Điểm tổng kết': 8.0,
        'Xếp loại': 'A',
        'Ghi chú môn học': 'Ổn định',
        'Điểm trung bình chung': 8.5,
        'Kết quả chung': 'Giỏi',
        'Ghi chú': 'Sinh viên tiềm năng, nên phát triển kỹ năng lãnh đạo'
    }
];

// Create workbook and worksheet
const wb = xlsx.utils.book_new();
const ws = xlsx.utils.json_to_sheet(sampleData);

// Add worksheet to workbook
xlsx.utils.book_append_sheet(wb, ws, 'Students');

// Write to file
const filePath = path.join(__dirname, 'students.xlsx');
xlsx.writeFile(wb, filePath);

console.log('Excel file created successfully at:', filePath);
console.log('Sample data includes:');
console.log('- 4 students with multiple subjects each');
console.log('- Different faculties: IT, Economics, Finance');
console.log('- Complete grade information with notes');
