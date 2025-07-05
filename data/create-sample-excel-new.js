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

// Write to file
const filePath = path.join(__dirname, 'students.xlsx');
xlsx.writeFile(workbook, filePath);

console.log('Excel file created successfully at:', filePath);
console.log('Sample data includes:');
console.log('- 4 students with different scores and notes');
console.log('- Structure: STT, Mã sinh viên, Họ và tên, Ngày sinh, Lớp, Nơi sinh, Đối tượng, Điểm 1-10, Kết quả, Ghi chú 1-3');
console.log('- Notes with potential URL links');
