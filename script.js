// Constants
const MAX_MARKS_PER_SUBJECT = 100;
const PASSING_PERCENTAGE = 40;
const MINIMUM_SUBJECT_MARKS = 33;

// Sample student data
const studentsData = [
    {
        name: "John Smith",
        rollNumber: "2024001",
        class: "10",
        subjects: [
            { name: "Mathematics", marks: 85 },
            { name: "Science", marks: 78 },
            { name: "English", marks: 92 },
            { name: "Social Studies", marks: 88 },
            { name: "Hindi", marks: 75 }
        ]
    },
    {
        name: "Emma Johnson",
        rollNumber: "2024002",
        class: "10",
        subjects: [
            { name: "Mathematics", marks: 92 },
            { name: "Science", marks: 88 },
            { name: "English", marks: 95 },
            { name: "Social Studies", marks: 90 },
            { name: "Hindi", marks: 85 }
        ]
    },
    {
        name: "Michael Brown",
        rollNumber: "2024003",
        class: "11",
        subjects: [
            { name: "Physics", marks: 80 },
            { name: "Chemistry", marks: 76 },
            { name: "Mathematics", marks: 88 },
            { name: "English", marks: 82 },
            { name: "Computer Science", marks: 90 }
        ]
    },
    {
        name: "Sarah Davis",
        rollNumber: "2024004",
        class: "12",
        subjects: [
            { name: "Physics", marks: 91 },
            { name: "Chemistry", marks: 89 },
            { name: "Mathematics", marks: 95 },
            { name: "English", marks: 87 },
            { name: "Computer Science", marks: 93 }
        ]
    },
    {
        name: "Raj Kumar",
        rollNumber: "2024005",
        class: "10",
        subjects: [
            { name: "Mathematics", marks: 45 },
            { name: "Science", marks: 58 },
            { name: "English", marks: 62 },
            { name: "Social Studies", marks: 55 },
            { name: "Hindi", marks: 68 }
        ]
    }
];

// Get form and result elements
const resultForm = document.getElementById('resultForm');
const resultContainer = document.getElementById('resultContainer');
const resultContent = document.getElementById('resultContent');
const errorMessage = document.getElementById('errorMessage');

// Form submit event listener
resultForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const studentName = document.getElementById('studentName').value.trim();
    const rollNumber = document.getElementById('rollNumber').value.trim();
    const studentClass = document.getElementById('class').value;
    
    // Find student in data
    const student = findStudent(studentName, rollNumber, studentClass);
    
    if (student) {
        displayResult(student);
        hideError();
    } else {
        showError('Student not found. Please check your details and try again.');
        hideResult();
    }
});

// Find student in database
function findStudent(name, roll, studentClass) {
    return studentsData.find(student => 
        student.name.toLowerCase() === name.toLowerCase() && 
        student.rollNumber === roll && 
        student.class === studentClass
    );
}

// Display result
function displayResult(student) {
    const totalMarks = student.subjects.reduce((sum, subject) => sum + subject.marks, 0);
    const maxMarks = student.subjects.length * MAX_MARKS_PER_SUBJECT;
    const percentage = ((totalMarks / maxMarks) * 100).toFixed(2);
    const isPassed = percentage >= PASSING_PERCENTAGE && student.subjects.every(subject => subject.marks >= MINIMUM_SUBJECT_MARKS);
    
    let html = `
        <div class="result-info">
            <p><strong>Name:</strong> ${student.name}</p>
            <p><strong>Roll Number:</strong> ${student.rollNumber}</p>
            <p><strong>Class:</strong> ${student.class}</p>
        </div>
        
        <table class="subject-table">
            <thead>
                <tr>
                    <th>Subject</th>
                    <th>Marks Obtained</th>
                    <th>Maximum Marks</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    student.subjects.forEach(subject => {
        html += `
            <tr>
                <td>${subject.name}</td>
                <td>${subject.marks}</td>
                <td>${MAX_MARKS_PER_SUBJECT}</td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
        </table>
        
        <div class="total-marks">
            Total: ${totalMarks}/${maxMarks} (${percentage}%)
        </div>
        
        <div class="text-center">
            <span class="status ${isPassed ? 'pass' : 'fail'}">
                ${isPassed ? 'PASSED' : 'FAILED'}
            </span>
        </div>
    `;
    
    resultContent.innerHTML = html;
    resultContainer.classList.remove('hidden');
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

// Hide error message
function hideError() {
    errorMessage.classList.add('hidden');
}

// Hide result
function hideResult() {
    resultContainer.classList.add('hidden');
}
