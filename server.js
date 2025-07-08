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

function loadStudentData(fileName = null) {
    try {
        const file = fileName || 'students.xlsx';
        const workbook = xlsx.readFile(path.join(__dirname, 'data', file));
        const targetSheetName = workbook.SheetNames[0];
        
        if (!workbook.SheetNames.includes(targetSheetName)) {
            console.error(`Sheet "${targetSheetName}" not found`);
            return {};
        }
        
        const worksheet = workbook.Sheets[targetSheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);
        
        // Process data with new structure
        let studentsData = {};
        data.forEach(row => {
            let studentId = '';
            let idType = '';
            
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
                if (key.startsWith('[ID]')) {
                    studentId = row[key].toString().trim();
                    idType = key.replace('[ID]', '').trim();
                }

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
                    const noteKey = key.replace('[Ghi chú]', '').trim();
                    if (row[key]) {
                        notes.push({
                            name: noteKey,
                            value: row[key]
                        });
                    }
                }
            }

            if (!studentId) {
                return;
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

function getXlsxFiles() {
    try {
        const dataFolderPath = path.join(__dirname, 'data');
        
        // Check if data folder exists
        if (!fs.existsSync(dataFolderPath)) {
            console.error('Data folder not found');
            return [];
        }
        
        // Read all files in data folder
        const files = fs.readdirSync(dataFolderPath);
        
        // Filter only xlsx files
        const xlsxFiles = files.filter(file => {
            return path.extname(file).toLowerCase() === '.xlsx';
        });
        
        return xlsxFiles.map(file => {
            const filePath = path.join(dataFolderPath, file);
            const stats = fs.statSync(filePath);
            
            return {
                name: file,
                displayName: path.basename(file, '.xlsx'), // Tên file không có extension
                fullPath: filePath,
                size: stats.size,
                modified: stats.mtime
            };
        });
    } catch (error) {
        console.error('Error reading xlsx files:', error);
        return [];
    }
}

// Routes
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Tra cứu điểm sinh viên - Học viện Tài chính'
    });
});

// API to get list of sheets (exam periods)
app.get('/api/exam-periods', (req, res) => {
    try {

        const fileList = getXlsxFiles();
        const sheets = fileList.map(file => ({
            value: file.name,
            label: file.displayName
        }));
        
        res.json({
            success: true,
            data: sheets
        });
    } catch (error) {
        console.error('Error reading exam periods:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi khi đọc danh sách kỳ thi'
        });
    }
});

// API to get student information
app.get('/api/student/:id', (req, res) => {
    const studentId = req.params.id;
    const examPeriod = req.query.examPeriod; // Get exam period from query parameter
    
    const studentsData = loadStudentData(examPeriod);
    const student = studentsData[studentId];
    
    if (!student) {
        return res.status(404).json({
            success: false,
            message: 'Không tìm thấy thông tin sinh viên!'
        });
    }
    
    res.json({
        success: true,
        data: student
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
