const getEmployees = () => JSON.parse(localStorage.getItem('employees')) || [];
const saveEmployees = (employees) => localStorage.setItem('employees', JSON.stringify(employees));

const displayEmployees = () => {
    const employees = getEmployees();
    const employeeList = document.getElementById('list');
    if (employeeList) {
        employeeList.innerHTML = ''; // Очистка списка сотрудников

        employees.forEach((employee, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${employee.name}, ${employee.position}, ${employee.department}</span>
                <div>
                    <button class="edit-button" data-index="${index}">Редактировать</button>
                    <button class="delete-button" data-index="${index}">Удалить</button>
                </div>
            `;
            employeeList.appendChild(li);
        });
    }
};

// Функция для добавления сотрудника
const addEmployee = (employee) => {
    const employees = getEmployees();
    employees.push(employee);
    saveEmployees(employees);
};

// Проверка текущего документа
if (document.getElementById('employeeForm')) {
    document.getElementById('employeeForm').addEventListener('submit', (event) => {

        event.preventDefault(); // Предотвращаем стандартное поведение формы

        const name = document.getElementById('name').value;
        const position = document.getElementById('position').value;
        const department = document.getElementById('department').value;

        const employee = { name, position, department };
        addEmployee(employee);
        
        // Очистка формы
        document.getElementById('employeeForm').reset();

        // Перенаправление на страницу со списком сотрудников
        window.location.href = 'employees.html';
    });
}

// Начальная загрузка списка сотрудников
document.addEventListener('DOMContentLoaded', displayEmployees);

// Обработка кликов по кнопкам "Редактировать" и "Удалить"
document.getElementById('list')?.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button')) {
        const index = event.target.dataset.index;
        deleteEmployee(index);
    } else if (event.target.classList.contains('edit-button')) {
        const index = event.target.dataset.index;
        editEmployee(index);
    }
});

// Функции удаления и редактирования
const deleteEmployee = (index) => {
    const employees = getEmployees();
    employees.splice(index, 1);
    saveEmployees(employees);
    displayEmployees();
};

const editEmployee = (index) => {
    const employees = getEmployees();
    const employee = employees[index];

    // Заполнение формы данными сотрудника (нужно реализовать)
    // ...
    deleteEmployee(index);
};
