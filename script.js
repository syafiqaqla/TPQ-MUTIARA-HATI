        // Initialize data
        let students = JSON.parse(localStorage.getItem('students')) || [
            { id: 1, name: 'Ahmad Fauzi', gender: 'Male', birthdate: '2015-03-12', phone: '081234567890', address: 'Jl. Merdeka No. 123', class: 'Tahfidz A', level: 'Intermediate' },
            { id: 2, name: 'Siti Aminah', gender: 'Female', birthdate: '2016-07-21', phone: '082345678901', address: 'Jl. Pahlawan No. 45', class: 'Tahsin B', level: 'Beginner' },
            { id: 3, name: 'Muhammad Rizky', gender: 'Male', birthdate: '2014-11-05', phone: '083456789012', address: 'Jl. Diponegoro No. 67', class: 'Tahfidz B', level: 'Advanced' },
            { id: 4, name: 'Nurul Huda', gender: 'Female', birthdate: '2015-09-15', phone: '084567890123', address: 'Jl. Sudirman No. 89', class: 'Tilawah', level: 'Intermediate' }
        ];

        let teachers = JSON.parse(localStorage.getItem('teachers')) || [
            { id: 1, name: 'Ustadz Abdullah', gender: 'Male', phone: '085678901234', email: 'abdullah@tpq.edu', address: 'Jl. Pendidikan No. 10', classes: ['Tahfidz A', 'Tahfidz B'], schedule: 'Monday 08:00-10:00, Wednesday 13:00-15:00', status: 'Active' },
            { id: 2, name: 'Ustadzah Fatimah', gender: 'Female', phone: '086789012345', email: 'fatimah@tpq.edu', address: 'Jl. Ilmu No. 20', classes: ['Tahsin A', 'Tahsin B'], schedule: 'Tuesday 09:00-11:00, Thursday 14:00-16:00', status: 'Active' }
        ];

        let progress = JSON.parse(localStorage.getItem('progress')) || [
            { id: 1, studentId: 1, date: '2023-05-10', surah: 'Al-Fatihah', ayahFrom: 1, ayahTo: 7, status: 'Memorized', notes: 'Excellent memorization' },
            { id: 2, studentId: 2, date: '2023-05-12', surah: 'Al-Baqarah', ayahFrom: 1, ayahTo: 5, status: 'Reading', notes: 'Needs improvement in tajweed' },
            { id: 3, studentId: 3, date: '2023-05-15', surah: 'Al-Ikhlas', ayahFrom: 1, ayahTo: 4, status: 'Memorized', notes: 'Perfect recitation' },
            { id: 4, studentId: 1, date: '2023-05-18', surah: 'Al-Baqarah', ayahFrom: 255, ayahTo: 255, status: 'Memorized', notes: 'Ayatul Kursi memorized' }
        ];

        let surahs = JSON.parse(localStorage.getItem('surahs')) || [
            { id: 1, number: 1, name: 'Al-Fatihah', arabic: 'الفاتحة', ayat: 7, type: 'Meccan', juz: '1' },
            { id: 2, number: 2, name: 'Al-Baqarah', arabic: 'البقرة', ayat: 286, type: 'Medinan', juz: '1-3' },
            { id: 3, number: 112, name: 'Al-Ikhlas', arabic: 'الإخلاص', ayat: 4, type: 'Meccan', juz: '30' },
            { id: 4, number: 114, name: 'An-Nas', arabic: 'الناس', ayat: 6, type: 'Meccan', juz: '30' }
        ];

        // Save data to localStorage
        function saveData() {
            localStorage.setItem('students', JSON.stringify(students));
            localStorage.setItem('teachers', JSON.stringify(teachers));
            localStorage.setItem('progress', JSON.stringify(progress));
            localStorage.setItem('surahs', JSON.stringify(surahs));
        }

        // Show toast notification
        function showToast(message) {
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toast-message');
            
            toastMessage.textContent = message;
            toast.classList.remove('hidden');
            
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 3000);
        }

        // Show confirmation modal
        let currentAction = null;
        function showConfirmationModal(title, message, action) {
            const modal = document.getElementById('confirmation-modal');
            const modalTitle = document.getElementById('confirmation-title');
            const modalMessage = document.getElementById('confirmation-message');
            const modalAction = document.getElementById('confirmation-action');
            
            modalTitle.textContent = title;
            modalMessage.textContent = message;
            currentAction = action;
            
            modal.classList.remove('hidden');
        }

        // Hide confirmation modal
        function hideConfirmationModal() {
            const modal = document.getElementById('confirmation-modal');
            modal.classList.add('hidden');
        }

        // Execute confirmed action
        document.getElementById('confirmation-action').addEventListener('click', function() {
            if (currentAction) {
                currentAction();
                hideConfirmationModal();
            }
        });

        // Navigation functions
        function showSection(sectionId) {
            // Hide all sections
            document.querySelectorAll('.section-content').forEach(section => {
                section.classList.add('hidden');
                section.classList.remove('fade-in');
            });
            
            // Show selected section
            const section = document.getElementById(`${sectionId}-section`);
            section.classList.remove('hidden');
            setTimeout(() => {
                section.classList.add('fade-in');
            }, 10);
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            // For mobile and desktop nav
            if (sectionId === 'dashboard') {
                document.querySelectorAll('.nav-link')[0].classList.add('active');
            } else if (sectionId === 'students') {
                document.querySelectorAll('.nav-link')[1].classList.add('active');
            } else if (sectionId === 'teachers') {
                document.querySelectorAll('.nav-link')[2].classList.add('active');
            } else if (sectionId === 'progress') {
                document.querySelectorAll('.nav-link')[3].classList.add('active');
            } else if (sectionId === 'quran') {
                document.querySelectorAll('.nav-link')[4].classList.add('active');
            }
            
            // Load data for the section
            if (sectionId === 'dashboard') {
                loadDashboard();
            } else if (sectionId === 'students') {
                loadStudents();
            } else if (sectionId === 'teachers') {
                loadTeachers();
            } else if (sectionId === 'progress') {
                loadProgress();
            } else if (sectionId === 'quran') {
                loadSurahs();
            }
        }

        // Calculate age from birthdate
        function calculateAge(birthdate) {
            const birthDate = new Date(birthdate);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            return age;
        }

        // Dashboard functions
        function loadDashboard() {
            // Update stats
            document.getElementById('total-students').textContent = students.length;
            document.getElementById('total-teachers').textContent = teachers.length;
            
            const uniqueClasses = [...new Set(students.map(student => student.class))];
            document.getElementById('total-classes').textContent = uniqueClasses.length;
            
            const memorizedAyahs = progress.filter(p => p.status === 'Memorized').length;
            document.getElementById('total-ayahs').textContent = memorizedAyahs;
            
            // Recent students
            const recentStudentsTable = document.getElementById('recent-students');
            recentStudentsTable.innerHTML = '';
            
            const recentStudents = students.slice(0, 5).map(student => {
                return `
                    <tr>
                        <td class="p-2">${student.name}</td>
                        <td class="p-2">${student.class}</td>
                        <td class="p-2">${student.level}</td>
                    </tr>
                `;
            }).join('');
            
            recentStudentsTable.innerHTML = recentStudents;
            
            // Recent progress
            const recentProgressTable = document.getElementById('recent-progress');
            recentProgressTable.innerHTML = '';
            
            const recentProgress = progress.slice(0, 5).map(p => {
                const student = students.find(s => s.id === p.studentId);
                return `
                    <tr>
                        <td class="p-2">${student ? student.name : 'Unknown'}</td>
                        <td class="p-2">${p.surah}</td>
                        <td class="p-2">
                            <span class="px-2 py-1 rounded-full text-xs ${p.status === 'Memorized' ? 'bg-green-100 text-green-800' : 
                                p.status === 'Reading' ? 'bg-blue-100 text-blue-800' : 
                                p.status === 'Review' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}">
                                ${p.status}
                            </span>
                        </td>
                    </tr>
                `;
            }).join('');
            
            recentProgressTable.innerHTML = recentProgress;
        }

        // Student functions
        function loadStudents() {
            const tableBody = document.getElementById('students-table-body');
            tableBody.innerHTML = '';
            
            students.forEach(student => {
                const age = calculateAge(student.birthdate);
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="p-3">${student.name}</td>
                    <td class="p-3">${student.class}</td>
                    <td class="p-3">${student.level}</td>
                    <td class="p-3">${student.gender}</td>
                    <td class="p-3">${age}</td>
                    <td class="p-3 text-right">
                        <button onclick="editStudent(${student.id})" class="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-lg mr-2">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteStudentPrompt(${student.id})" class="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded-lg">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
            
            // Populate student filter in progress section
            const studentFilter = document.getElementById('filter-student');
            const progressStudent = document.getElementById('progress-student');
            
            studentFilter.innerHTML = '<option value="">All Students</option>';
            progressStudent.innerHTML = '<option value="">Select Student</option>';
            
            students.forEach(student => {
                studentFilter.innerHTML += `<option value="${student.id}">${student.name} (${student.class})</option>`;
                progressStudent.innerHTML += `<option value="${student.id}">${student.name} (${student.class})</option>`;
            });
        }

        function showStudentForm() {
            document.getElementById('student-form-container').classList.remove('hidden');
            document.getElementById('student-form-title').textContent = 'Add New Student';
            document.getElementById('student-form').reset();
            document.getElementById('student-id').value = '';
        }

        function hideStudentForm() {
            document.getElementById('student-form-container').classList.add('hidden');
        }

        function editStudent(id) {
            const student = students.find(s => s.id === id);
            if (student) {
                document.getElementById('student-form-container').classList.remove('hidden');
                document.getElementById('student-form-title').textContent = 'Edit Student';
                
                document.getElementById('student-id').value = student.id;
                document.getElementById('student-name').value = student.name;
                document.getElementById('student-gender').value = student.gender;
                document.getElementById('student-birthdate').value = student.birthdate;
                document.getElementById('student-phone').value = student.phone;
                document.getElementById('student-address').value = student.address;
                document.getElementById('student-class').value = student.class;
                document.getElementById('student-level').value = student.level;
            }
        }

        function deleteStudentPrompt(id) {
            const student = students.find(s => s.id === id);
            if (student) {
                showConfirmationModal(
                    'Delete Student',
                    `Are you sure you want to delete ${student.name}? This action cannot be undone.`,
                    () => deleteStudent(id)
                );
            }
        }

        function deleteStudent(id) {
            students = students.filter(s => s.id !== id);
            saveData();
            loadStudents();
            showToast('Student deleted successfully');
        }

        document.getElementById('student-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const id = document.getElementById('student-id').value;
            const name = document.getElementById('student-name').value;
            const gender = document.getElementById('student-gender').value;
            const birthdate = document.getElementById('student-birthdate').value;
            const phone = document.getElementById('student-phone').value;
            const address = document.getElementById('student-address').value;
            const studentClass = document.getElementById('student-class').value;
            const level = document.getElementById('student-level').value;
            
            if (id) {
                // Update existing student
                const index = students.findIndex(s => s.id === parseInt(id));
                if (index !== -1) {
                    students[index] = {
                        id: parseInt(id),
                        name,
                        gender,
                        birthdate,
                        phone,
                        address,
                        class: studentClass,
                        level
                    };
                    
                    showToast('Student updated successfully');
                }
            } else {
                // Add new student
                const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
                students.push({
                    id: newId,
                    name,
                    gender,
                    birthdate,
                    phone,
                    address,
                    class: studentClass,
                    level
                });
                
                showToast('Student added successfully');
            }
            
            saveData();
            loadStudents();
            hideStudentForm();
        });

        // Teacher functions
        function loadTeachers() {
            const tableBody = document.getElementById('teachers-table-body');
            tableBody.innerHTML = '';
            
            teachers.forEach(teacher => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="p-3">${teacher.name}</td>
                    <td class="p-3">${teacher.phone}</td>
                    <td class="p-3">${Array.isArray(teacher.classes) ? teacher.classes.join(', ') : teacher.classes}</td>
                    <td class="p-3">
                        <span class="px-2 py-1 rounded-full text-xs ${teacher.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">
                            ${teacher.status}
                        </span>
                    </td>
                    <td class="p-3 text-right">
                        <button onclick="editTeacher(${teacher.id})" class="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-lg mr-2">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteTeacherPrompt(${teacher.id})" class="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded-lg">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        }

        function showTeacherForm() {
            document.getElementById('teacher-form-container').classList.remove('hidden');
            document.getElementById('teacher-form-title').textContent = 'Add New Teacher';
            document.getElementById('teacher-form').reset();
            document.getElementById('teacher-id').value = '';
        }

        function hideTeacherForm() {
            document.getElementById('teacher-form-container').classList.add('hidden');
        }

        function editTeacher(id) {
            const teacher = teachers.find(t => t.id === id);
            if (teacher) {
                document.getElementById('teacher-form-container').classList.remove('hidden');
                document.getElementById('teacher-form-title').textContent = 'Edit Teacher';
                
                document.getElementById('teacher-id').value = teacher.id;
                document.getElementById('teacher-name').value = teacher.name;
                document.getElementById('teacher-gender').value = teacher.gender;
                document.getElementById('teacher-phone').value = teacher.phone;
                document.getElementById('teacher-email').value = teacher.email || '';
                document.getElementById('teacher-address').value = teacher.address || '';
                
                // Set selected classes
                const classesSelect = document.getElementById('teacher-classes');
                Array.from(classesSelect.options).forEach(option => {
                    option.selected = teacher.classes.includes(option.value);
                });
                
                document.getElementById('teacher-schedule').value = teacher.schedule || '';
                document.getElementById('teacher-status').value = teacher.status || 'Active';
            }
        }

        function deleteTeacherPrompt(id) {
            const teacher = teachers.find(t => t.id === id);
            if (teacher) {
                showConfirmationModal(
                    'Delete Teacher',
                    `Are you sure you want to delete ${teacher.name}? This action cannot be undone.`,
                    () => deleteTeacher(id)
                );
            }
        }

        function deleteTeacher(id) {
            teachers = teachers.filter(t => t.id !== id);
            saveData();
            loadTeachers();
            showToast('Teacher deleted successfully');
        }

        document.getElementById('teacher-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const id = document.getElementById('teacher-id').value;
            const name = document.getElementById('teacher-name').value;
            const gender = document.getElementById('teacher-gender').value;
            const phone = document.getElementById('teacher-phone').value;
            const email = document.getElementById('teacher-email').value;
            const address = document.getElementById('teacher-address').value;
            
            const classesSelect = document.getElementById('teacher-classes');
            const classes = Array.from(classesSelect.selectedOptions).map(option => option.value);
            
            const schedule = document.getElementById('teacher-schedule').value;
            const status = document.getElementById('teacher-status').value;
            
            if (id) {
                // Update existing teacher
                const index = teachers.findIndex(t => t.id === parseInt(id));
                if (index !== -1) {
                    teachers[index] = {
                        id: parseInt(id),
                        name,
                        gender,
                        phone,
                        email,
                        address,
                        classes,
                        schedule,
                        status
                    };
                    
                    showToast('Teacher updated successfully');
                }
            } else {
                // Add new teacher
                const newId = teachers.length > 0 ? Math.max(...teachers.map(t => t.id)) + 1 : 1;
                teachers.push({
                    id: newId,
                    name,
                    gender,
                    phone,
                    email,
                    address,
                    classes,
                    schedule,
                    status
                });
                
                showToast('Teacher added successfully');
            }
            
            saveData();
            loadTeachers();
            hideTeacherForm();
        });

        // Progress functions
        function loadProgress() {
            const tableBody = document.getElementById('progress-table-body');
            tableBody.innerHTML = '';
            
            const filterStudent = document.getElementById('filter-student').value;
            const filterClass = document.getElementById('filter-class').value;
            const filterSurah = document.getElementById('filter-surah').value;
            const filterStatus = document.getElementById('filter-status').value;
            
            let filteredProgress = [...progress];
            
            if (filterStudent) {
                filteredProgress = filteredProgress.filter(p => p.studentId === parseInt(filterStudent));
            }
            
            if (filterClass) {
                filteredProgress = filteredProgress.filter(p => {
                    const student = students.find(s => s.id === p.studentId);
                    return student && student.class === filterClass;
                });
            }
            
            if (filterSurah) {
                filteredProgress = filteredProgress.filter(p => p.surah === filterSurah);
            }
            
            if (filterStatus) {
                filteredProgress = filteredProgress.filter(p => p.status === filterStatus);
            }
            
            filteredProgress.forEach(p => {
                const student = students.find(s => s.id === p.studentId);
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="p-3">${student ? student.name : 'Unknown'}</td>
                    <td class="p-3">${p.surah}</td>
                    <td class="p-3">${p.ayahFrom}${p.ayahTo !== p.ayahFrom ? `-${p.ayahTo}` : ''}</td>
                    <td class="p-3">
                        <span class="px-2 py-1 rounded-full text-xs ${p.status === 'Memorized' ? 'bg-green-100 text-green-800' : 
                            p.status === 'Reading' ? 'bg-blue-100 text-blue-800' : 
                            p.status === 'Review' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}">
                            ${p.status}
                        </span>
                    </td>
                    <td class="p-3">${p.date}</td>
                    <td class="p-3 text-right">
                        <button onclick="editProgress(${p.id})" class="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-lg mr-2">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteProgressPrompt(${p.id})" class="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded-lg">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        }

        function showProgressForm() {
            document.getElementById('progress-form-container').classList.remove('hidden');
            document.getElementById('progress-form-title').textContent = 'Add New Progress';
            document.getElementById('progress-form').reset();
            document.getElementById('progress-id').value = '';
            document.getElementById('progress-date').value = new Date().toISOString().split('T')[0];
            
            // Populate surah dropdown
            const surahSelect = document.getElementById('progress-surah');
            surahSelect.innerHTML = '<option value="">Select Surah</option>';
            surahs.forEach(surah => {
                surahSelect.innerHTML += `<option value="${surah.name}">${surah.number}. ${surah.name}</option>`;
            });
        }

        function hideProgressForm() {
            document.getElementById('progress-form-container').classList.add('hidden');
        }

        function editProgress(id) {
            const prog = progress.find(p => p.id === id);
            if (prog) {
                document.getElementById('progress-form-container').classList.remove('hidden');
                document.getElementById('progress-form-title').textContent = 'Edit Progress';
                
                document.getElementById('progress-id').value = prog.id;
                document.getElementById('progress-student').value = prog.studentId;
                document.getElementById('progress-date').value = prog.date;
                
                // Populate surah dropdown and set selected value
                const surahSelect = document.getElementById('progress-surah');
                surahSelect.innerHTML = '<option value="">Select Surah</option>';
                surahs.forEach(surah => {
                    surahSelect.innerHTML += `<option value="${surah.name}" ${surah.name === prog.surah ? 'selected' : ''}>${surah.number}. ${surah.name}</option>`;
                });
                
                document.getElementById('progress-ayah-from').value = prog.ayahFrom;
                document.getElementById('progress-ayah-to').value = prog.ayahTo;
                document.getElementById('progress-status').value = prog.status;
                document.getElementById('progress-notes').value = prog.notes || '';
            }
        }

        function deleteProgressPrompt(id) {
            const prog = progress.find(p => p.id === id);
            if (prog) {
                const student = students.find(s => s.id === prog.studentId);
                showConfirmationModal(
                    'Delete Progress',
                    `Are you sure you want to delete progress record for ${student ? student.name : 'student'} (${prog.surah} ${prog.ayahFrom}-${prog.ayahTo})?`,
                    () => deleteProgress(id)
                );
            }
        }

        function deleteProgress(id) {
            progress = progress.filter(p => p.id !== id);
            saveData();
            loadProgress();
            showToast('Progress record deleted successfully');
        }

        document.getElementById('progress-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const id = document.getElementById('progress-id').value;
            const studentId = document.getElementById('progress-student').value;
            const date = document.getElementById('progress-date').value;
            const surah = document.getElementById('progress-surah').value;
            const ayahFrom = document.getElementById('progress-ayah-from').value;
            const ayahTo = document.getElementById('progress-ayah-to').value;
            const status = document.getElementById('progress-status').value;
            const notes = document.getElementById('progress-notes').value;
            
            if (id) {
                // Update existing progress
                const index = progress.findIndex(p => p.id === parseInt(id));
                if (index !== -1) {
                    progress[index] = {
                        id: parseInt(id),
                        studentId: parseInt(studentId),
                        date,
                        surah,
                        ayahFrom: parseInt(ayahFrom),
                        ayahTo: parseInt(ayahTo),
                        status,
                        notes
                    };
                    
                    showToast('Progress updated successfully');
                }
            } else {
                // Add new progress
                const newId = progress.length > 0 ? Math.max(...progress.map(p => p.id)) + 1 : 1;
                progress.push({
                    id: newId,
                    studentId: parseInt(studentId),
                    date,
                    surah,
                    ayahFrom: parseInt(ayahFrom),
                    ayahTo: parseInt(ayahTo),
                    status,
                    notes
                });
                
                showToast('Progress added successfully');
            }
            
            saveData();
            loadProgress();
            hideProgressForm();
        });

        // Surah functions
        function loadSurahs() {
            const tableBody = document.getElementById('surahs-table-body');
            tableBody.innerHTML = '';
            
            surahs.forEach(surah => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="p-3">${surah.number}</td>
                    <td class="p-3">${surah.name}</td>
                    <td class="p-3 text-right font-arabic text-xl">${surah.arabic}</td>
                    <td class="p-3">${surah.ayat}</td>
                    <td class="p-3">${surah.type}</td>
                    <td class="p-3 text-right">
                        <button onclick="editSurah(${surah.id})" class="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-lg mr-2">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteSurahPrompt(${surah.id})" class="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded-lg">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
            
            // Populate surah filter in progress section
            const surahFilter = document.getElementById('filter-surah');
            surahFilter.innerHTML = '<option value="">All Surahs</option>';
            surahs.forEach(surah => {
                surahFilter.innerHTML += `<option value="${surah.name}">${surah.number}. ${surah.name}</option>`;
            });
        }

        function showSurahForm() {
            document.getElementById('surah-form-container').classList.remove('hidden');
            document.getElementById('surah-form-title').textContent = 'Add New Surah';
            document.getElementById('surah-form').reset();
            document.getElementById('surah-id').value = '';
        }

        function hideSurahForm() {
            document.getElementById('surah-form-container').classList.add('hidden');
        }

        function editSurah(id) {
            const surah = surahs.find(s => s.id === id);
            if (surah) {
                document.getElementById('surah-form-container').classList.remove('hidden');
                document.getElementById('surah-form-title').textContent = 'Edit Surah';
                
                document.getElementById('surah-id').value = surah.id;
                document.getElementById('surah-number').value = surah.number;
                document.getElementById('surah-name').value = surah.name;
                document.getElementById('surah-arabic').value = surah.arabic;
                document.getElementById('surah-ayat').value = surah.ayat;
                document.getElementById('surah-type').value = surah.type;
                document.getElementById('surah-juz').value = surah.juz || '';
            }
        }

        function deleteSurahPrompt(id) {
            const surah = surahs.find(s => s.id === id);
            if (surah) {
                showConfirmationModal(
                    'Delete Surah',
                    `Are you sure you want to delete ${surah.name}? This will also remove all related progress records.`,
                    () => deleteSurah(id)
                );
            }
        }

        function deleteSurah(id) {
            // Remove surah
            surahs = surahs.filter(s => s.id !== id);
            
            // Remove progress records for this surah
            const surahName = surahs.find(s => s.id === id)?.name;
            if (surahName) {
                progress = progress.filter(p => p.surah !== surahName);
            }
            
            saveData();
            loadSurahs();
            loadProgress();
            showToast('Surah deleted successfully');
        }

        document.getElementById('surah-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const id = document.getElementById('surah-id').value;
            const number = document.getElementById('surah-number').value;
            const name = document.getElementById('surah-name').value;
            const arabic = document.getElementById('surah-arabic').value;
            const ayat = document.getElementById('surah-ayat').value;
            const type = document.getElementById('surah-type').value;
            const juz = document.getElementById('surah-juz').value;
            
            if (id) {
                // Update existing surah
                const index = surahs.findIndex(s => s.id === parseInt(id));
                if (index !== -1) {
                    surahs[index] = {
                        id: parseInt(id),
                        number: parseInt(number),
                        name,
                        arabic,
                        ayat: parseInt(ayat),
                        type,
                        juz
                    };
                    
                    showToast('Surah updated successfully');
                }
            } else {
                // Add new surah
                const newId = surahs.length > 0 ? Math.max(...surahs.map(s => s.id)) + 1 : 1;
                surahs.push({
                    id: newId,
                    number: parseInt(number),
                    name,
                    arabic,
                    ayat: parseInt(ayat),
                    type,
                    juz
                });
                
                showToast('Surah added successfully');
            }
            
            saveData();
            loadSurahs();
            hideSurahForm();
        });

        // Search functionality
        document.getElementById('student-search').addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('#students-table-body tr');
            
            rows.forEach(row => {
                const name = row.querySelector('td:first-child').textContent.toLowerCase();
                if (name.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });

        document.getElementById('teacher-search').addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('#teachers-table-body tr');
            
            rows.forEach(row => {
                const name = row.querySelector('td:first-child').textContent.toLowerCase();
                if (name.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });

        document.getElementById('progress-search').addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('#progress-table-body tr');
            
            rows.forEach(row => {
                const student = row.querySelector('td:first-child').textContent.toLowerCase();
                const surah = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
                if (student.includes(searchTerm) || surah.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });

        document.getElementById('surah-search').addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('#surahs-table-body tr');
            
            rows.forEach(row => {
                const number   = row.querySelector('td:first-child').textContent.toLowerCase();
                const nameEng  = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
                const nameArab = row.querySelector('td:nth-child(3)').textContent.trim().toLowerCase();
                if (
                    number.includes(searchTerm) ||
                    nameEng.includes(searchTerm) ||
                    nameArab.includes(searchTerm)
                ) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });

        // Initialize current date and default view
        document.addEventListener('DOMContentLoaded', () => {
            const today = new Date();
            document.getElementById('current-date').textContent = today.toLocaleDateString('id-ID', {
                day:   'numeric',
                month: 'long',
                year:  'numeric'
            });
            // Show Dashboard by default
            showSection('dashboard');
        });