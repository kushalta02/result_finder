from flask import Flask, render_template, request, jsonify
import mysql.connector

app = Flask(__name__)

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="khushipushi",
        database="student_results"
    )

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/result')
def result_page():
    roll_no = request.args.get('roll_no')
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM results WHERE roll_no = %s", (roll_no,))
    result = cursor.fetchall()
    cursor.close()
    conn.close()

    if len(result) == 0:
        return render_template('result.html', error="No result found for this roll number")

    # Student info and stats
    student_name = result[0]['name']
    total_marks = sum(r['marks'] for r in result)
    subjects_count = len(result)
    percentage = round(total_marks / subjects_count, 2)
    overall_grade = (
        'A+' if percentage >= 90 else
        'A' if percentage >= 80 else
        'B+' if percentage >= 70 else
        'B' if percentage >= 60 else
        'C' if percentage >= 50 else 'D'
    )

    return render_template(
        'result.html',
        name=student_name,
        roll_no=roll_no,
        subjects=result,
        total=total_marks,
        percentage=percentage,
        grade=overall_grade
    )

if __name__ == '__main__':
    app.run(debug=True)
