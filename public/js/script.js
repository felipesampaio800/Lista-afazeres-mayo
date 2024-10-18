// URL da API para interação com as rotas do backend
const API_URL = 'http://localhost:3000/api/tasks';
const token = localStorage.getItem('token'); 

function redirectToLogin() {
    alert('Acesso não autorizado! Faça login novamente.');
    window.location.href = 'login.html';
}

// escapar caracteres especiais e evitar injeção de scripts
function escapeHTML(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
}

async function loadTasks() {
    if (!token) {
        redirectToLogin();
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.status === 401 || response.status === 403) {
            redirectToLogin();
            return;
        }

        const tasks = await response.json();
        console.log('Resposta da API:', tasks);  // Adiciona um log da resposta recebida

        // Certifique-se de que a resposta é uma lista de tarefas
        if (Array.isArray(tasks)) {
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = '';  // Limpa a lista antes de renderizar

            tasks.forEach(task => {
                const taskItem = document.createElement('li');

                if (task.status) {
                    taskItem.classList.add('completed');
                }

                taskItem.innerHTML = `
                    <input type="checkbox" ${task.status ? 'checked' : ''} onchange="toggleTask(${task.id}, ${!task.status})">
                    <span>${escapeHTML(task.title)}</span>
                    <button onclick="deleteTask(${task.id})">Excluir</button>
                `;
                taskList.appendChild(taskItem);
            });
        } else {
            console.error('O formato de resposta não é uma lista de tarefas:', tasks);
        }
    } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
    }
}


// Função para adicionar uma nova tarefa
async function addTask() {
    const taskInput = document.getElementById('new-task');
    const title = taskInput.value.trim();

    if (!title) {
        alert('O título da tarefa é obrigatório!');
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
            body: JSON.stringify({ title }),
        });

        
        if (response.status === 401 || response.status === 403) {
            redirectToLogin();
            return;
        }

        taskInput.value = ''; 
        loadTasks(); 
    } catch (error) {
        console.error('Erro ao adicionar tarefa:', error);
    }
}


async function toggleTask(id, status) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
            body: JSON.stringify({ status }),
        });

        
        if (response.status === 401 || response.status === 403) {
            redirectToLogin();
            return;
        }

        loadTasks(); 
    } catch (error) {
        console.error('Erro ao alternar o status da tarefa:', error);
    }
}


async function deleteTask(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`, 
            },
        });

        
        if (response.status === 401 || response.status === 403) {
            redirectToLogin();
            return;
        }

        loadTasks(); 
    } catch (error) {
        console.error('Erro ao excluir tarefa:', error);
    }
}


loadTasks();
