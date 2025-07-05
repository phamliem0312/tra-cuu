const express = require('express');
const xlsx = require('xlsx');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Load student data from Excel file
let studentsData = {};

function loadStudentData() {
    try {
        const workbook = xlsx.readFile(path.join(__dirname, 'data', 'students.xlsx'));
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);
        
        // Process data with new structure
        studentsData = {};
        data.forEach(row => {
            const studentId = row['Mã sinh viên']?.toString();
            if (!studentId) return;
            
            // Convert Excel date number to JavaScript date
            let birthDate = '';
            if (row['Ngày sinh']) {
                if (typeof row['Ngày sinh'] === 'number') {
                    // Excel date number (days since 1900-01-01)
                    const excelDate = new Date((row['Ngày sinh'] - 25569) * 86400 * 1000);
                    birthDate = excelDate.toLocaleDateString('vi-VN');
                } else {
                    birthDate = row['Ngày sinh'].toString();
                }
            }

            let scores = [];

            for (const key in row) {
                if (key.startsWith('Điểm ')) {
                    const scoreName = key.replace('Điểm ', '');

                    if (row[key] && row[key] !== 'N/A') {
                        scores.push({
                            name: scoreName,
                            value: row[key]
                        });
                    }
                }
            }
            
            // Extract notes
            const notes = [];
            for (let i = 1; i <= 3; i++) {
                const noteKey = `Ghi chú ${i}`;
                if (row[noteKey]) {
                    notes.push(row[noteKey]);
                }
            }
            
            studentsData[studentId] = {
                stt: row['STT'] || '',
                id: studentId,
                name: row['Họ và tên'] || row['Họ tên'] || '',
                birthDate: birthDate,
                class: row['Lớp'] || '',
                birthPlace: row['Nơi sinh'] || '',
                category: row['Đối tượng'] || '',
                result: row['Kết quả'] || '',
                scores: scores,
                notes: notes
            };
        });
        
        console.log(`Loaded ${Object.keys(studentsData).length} students data`);
    } catch (error) {
        console.error('Error loading student data:', error);
        // Create sample data if file doesn't exist
        createSampleData();
    }
}

function createSampleData() {
    studentsData = {
        "SV001": {
            stt: 1,
            id: "SV001",
            name: "Nguyễn Văn A",
            birthDate: "15/03/2003",
            class: "TX01/21.01HN01",
            birthPlace: "Hà Nội",
            category: "2.5 năm",
            result: "Đạt",
            scores: [
                { name: "Môn 1", value: 8.5 },
                { name: "Môn 2", value: "CT1" },
                { name: "Môn 3", value: "CT2" },
                { name: "Môn 4", value: 7.8 },
                { name: "Môn 5", value: "2.5A" }
            ],
            notes: [
                "Sinh viên học tập tốt, có thái độ học tập nghiêm túc",
                "Cần cải thiện kỹ năng thuyết trình (https://example.com/guide)",
                "Đề xuất tham gia hoạt động ngoại khóa"
            ]
        },
        "SV002": {
            stt: 2,
            id: "SV002",
            name: "Nguyễn Bá Bình",
            birthDate: "20/01/2003",
            class: "TX01/21.01HN01",
            birthPlace: "Hà Nội",
            category: "2.5 năm",
            result: "Đạt",
            scores: [
                { name: "Môn 1", value: 6.2 },
                { name: "Môn 2", value: "CT1" },
                { name: "Môn 3", value: "CT2" },
                { name: "Môn 10", value: "2.5A" }
            ],
            notes: [
                "note1(có thể gán được link url)",
                "note2(có thể gán được link url)",
                "note3(có thể gán được link url)"
            ]
        },
        "SV003": {
            stt: 3,
            id: "SV003",
            name: "Trần Thị C",
            birthDate: "10/05/2003",
            class: "TX02/21.01HN02",
            birthPlace: "Hải Phòng",
            category: "3 năm",
            result: "Giỏi",
            scores: [
                { name: "Môn 1", value: 9.2 },
                { name: "Môn 2", value: "A" },
                { name: "Môn 3", value: "A+" },
                { name: "Môn 4", value: 8.8 },
                { name: "Môn 5", value: "3.5A" },
                { name: "Môn 6", value: 9.0 }
            ],
            notes: [
                "Sinh viên xuất sắc, đạt nhiều thành tích cao",
                "Được đề xuất học bổng (https://scholarship.edu.vn)",
                "Tham gia nghiên cứu khoa học"
            ]
        }
    };
}

// Load data on startup
loadStudentData();

// Routes
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Tra cứu điểm sinh viên - Học viện Tài chính'
    });
});

// API to get student information
app.get('/api/student/:id', (req, res) => {
    const studentId = req.params.id;
    const student = studentsData[studentId];
    
    if (!student) {
        return res.status(404).json({
            success: false,
            message: 'Không tìm thấy thông tin sinh viên với mã số này!'
        });
    }
    
    res.json({
        success: true,
        data: student
    });
});

// API to search students (for autocomplete)
app.get('/api/search', (req, res) => {
    const query = req.query.q?.toLowerCase() || '';
    
    if (!query || query.length < 2) {
        return res.json({ success: true, data: [] });
    }
    
    const results = Object.values(studentsData)
        .filter(student => 
            student.id.toLowerCase().includes(query) ||
            student.name.toLowerCase().includes(query)
        )
        .slice(0, 10) // Limit results
        .map(student => ({
            id: student.id,
            name: student.name,
            class: student.class
        }));
    
    res.json({
        success: true,
        data: results
    });
});

// API to get all students (for admin)
app.get('/api/students', (req, res) => {
    const students = Object.values(studentsData).map(student => ({
        id: student.id,
        name: student.name,
        class: student.class,
        faculty: student.faculty,
        overallGPA: student.overallGPA,
        overallResult: student.overallResult
    }));
    
    res.json({
        success: true,
        data: students,
        total: students.length
    });
});

// API to reload data from Excel
app.post('/api/reload-data', (req, res) => {
    try {
        loadStudentData();
        res.json({
            success: true,
            message: 'Dữ liệu đã được tải lại thành công'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi tải lại dữ liệu: ' + error.message
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra trên server'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Không tìm thấy trang yêu cầu'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Visit: http://localhost:${PORT}`);
});

module.exports = app;
