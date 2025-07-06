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

function loadStudentData() {
    try {
        const workbook = xlsx.readFile(path.join(__dirname, 'data', 'students.xlsx'));
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);
        
        // Process data with new structure
        studentsData = {};
        data.forEach(row => {
            let studentId = row['Mã sinh viên']?.toString();
            if (!studentId) return;
            
            let idType = 'Mã sinh viên'; // Default to 'SV' if not specifie

            if (studentId.startsWith('[masv]')) {
                studentId = studentId.replace('[masv]', '').trim();
            }

            if (studentId.startsWith('[cccd]')) {
                idType = 'Số CCCD';
                studentId = studentId.replace('[cccd]', '').trim();
            }
            
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
            let notes = [];

            for (const key in row) {
                if (key.startsWith('[Điểm]')) {
                    const scoreName = key.replace('[Điểm]', '').trim();

                    if (row[key] && row[key] !== 'N/A') {
                        scores.push({
                            name: scoreName,
                            value: row[key]
                        });
                    }
                }
                
                if (key.startsWith('[Ghi chú]')) {
                    if (row[key]) {
                        notes.push(row[key]);
                    }
                }
            }
            
            studentsData[studentId] = {
                stt: row['STT'] || '',
                idType: idType,
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
        
        return studentsData;
    } catch (error) {
        console.error('Error loading student data:', error);

        return {};
    }
}

// Routes
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Tra cứu điểm sinh viên - Học viện Tài chính'
    });
});

// API to get student information
app.get('/api/student/:id', (req, res) => {
    const studentsData = loadStudentData();
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
    const studentsData = loadStudentData();
    
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
    const studentsData = loadStudentData();
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
