// scripts/course.js - Improved version
document.addEventListener('DOMContentLoaded', () => {
    const courses = [
        {
            subject: 'CSE',
            number: 110,
            title: 'Introduction to Programming',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce students to programming.',
            technology: ['Python'],
            completed: true
        },
        {
            subject: 'WDD',
            number: 130,
            title: 'Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course introduces students to the World Wide Web.',
            technology: ['HTML', 'CSS'],
            completed: true
        },
        {
            subject: 'CSE',
            number: 111,
            title: 'Programming with Functions',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'CSE 111 students become more organized programmers.',
            technology: ['Python'],
            completed: false
        },
        {
            subject: 'CSE',
            number: 210,
            title: 'Programming with Classes',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce classes and objects.',
            technology: ['C#'],
            completed: false
        },
        {
            subject: 'WDD',
            number: 131,
            title: 'Dynamic Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on Web Fundamentals.',
            technology: ['HTML', 'CSS', 'JavaScript'],
            completed: true
        },
        {
            subject: 'WDD',
            number: 231,
            title: 'Frontend Web Development I',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course focuses on user experience and accessibility.',
            technology: ['HTML', 'CSS', 'JavaScript'],
            completed: false
        }
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
            credits += course.credits;
            
            const courseCard = document.createElement('div');
            courseCard.classList.add('course-card');
            if (course.completed) {
                courseCard.classList.add('completed');
            }
            
            courseCard.innerHTML = `
                <h3>${course.subject} ${course.number}</h3>
                <p><strong>${course.title}</strong></p>
                <p>Credits: ${course.credits}</p>
                <p>Technologies: ${course.technology.join(', ')}</p>
                <p class="status ${course.completed ? 'completed-text' : 'not-completed-text'}">
                    ${course.completed ? '✅ Completed' : '⏳ In Progress'}
                </p>
            `;
            
            courseList.appendChild(courseCard);
        });
        
        totalCredits.textContent = credits;
    }

    function filterCourses(type) {
        if (type === 'all') return courses;
        if (type === 'cse') return courses.filter(course => course.subject === 'CSE');
        if (type === 'wdd') return courses.filter(course => course.subject === 'WDD');
        return courses;
    }

    function setActiveButton(activeBtn) {
        [allBtn, cseBtn, wddBtn].forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }

    // Event listeners
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

    // Initialize
    displayCourses(courses);
    setActiveButton(allBtn);
});