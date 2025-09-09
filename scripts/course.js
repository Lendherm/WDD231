// scripts/course.js
document.addEventListener('DOMContentLoaded', () => {
    const courses = [
        { code: "CSE 110", title: "Introduction to Programming", credits: 2, completed: true },
        { code: "WDD 130", title: "Web Fundamentals", credits: 2, completed: true },
        { code: "CSE 111", title: "Programming with Functions", credits: 2, completed: false },
        { code: "CSE 210", title: "Programming with Classes", credits: 2, completed: false },
        { code: "WDD 131", title: "Dynamic Web Fundamentals", credits: 2, completed: true },
        { code: "WDD 231", title: "Web Frontend Development I", credits: 2, completed: false },
        { code: "CSE 121B", title: "JavaScript Language", credits: 2, completed: false },
        { code: "CSE 121C", title: "Python Language", credits: 2, completed: false }
    ];

    const courseList = document.getElementById('courseList');
    const totalCredits = document.getElementById('totalCredits');
    const allBtn = document.getElementById('allBtn');
    const cseBtn = document.getElementById('cseBtn');
    const wddBtn = document.getElementById('wddBtn');

    function displayCourses(filteredCourses) {
        courseList.innerHTML = '';
        let credits = 0;
        
        filteredCourses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.classList.add('course-card');
            if (course.completed) {
                courseCard.classList.add('completed');
            }
            
            courseCard.innerHTML = `
                <h3>${course.code}</h3>
                <p>${course.title}</p>
                <p>Credits: ${course.credits}</p>
                <p>Status: ${course.completed ? 'Completed' : 'Not Completed'}</p>
            `;
            
            courseList.appendChild(courseCard);
            credits += course.credits;
        });
        
        totalCredits.textContent = credits;
    }

    function filterCourses(type) {
        if (type === 'all') {
            return courses;
        } else if (type === 'cse') {
            return courses.filter(course => course.code.startsWith('CSE'));
        } else if (type === 'wdd') {
            return courses.filter(course => course.code.startsWith('WDD'));
        }
    }

    allBtn.addEventListener('click', () => {
        displayCourses(filterCourses('all'));
        setActiveButton(allBtn);
    });

    cseBtn.addEventListener('click', () => {
        displayCourses(filterCourses('cse'));
        setActiveButton(cseBtn);
    });

    wddBtn.addEventListener('click', () => {
        displayCourses(filterCourses('wdd'));
        setActiveButton(wddBtn);
    });

    function setActiveButton(activeBtn) {
        [allBtn, cseBtn, wddBtn].forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }

    // Display all courses by default
    displayCourses(courses);
});