let API_BASE_URL = ''; // Variável para armazenar a URL base da API

// Função para buscar a URL da API a partir do backend
async function fetchConfig() {
    try {
        const response = await fetch('/config'); // Busca a configuração no backend
        const data = await response.json();
        API_BASE_URL = data.API_BASE_URL; // Define a URL base da API
    } catch (error) {
        console.error('Erro ao buscar configuração:', error);
    }
}

// Função para manipular o registro de usuário
async function registerUser(event) {
    event.preventDefault();

    const REGISTER_URL = `${API_BASE_URL}/auth/register`; // Define a URL para registro
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(REGISTER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();
        
        if (response.ok) {
            alert('Usuário registrado com sucesso!');
            window.location.href = 'login.html'; // Redireciona para a tela de login
        } else {
            alert(result.error || 'Erro ao registrar');
        }
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
    }
}

// Função para manipular o login de usuário
async function loginUser(event) {
    event.preventDefault();

    const LOGIN_URL = `${API_BASE_URL}/auth/login`; // Define a URL para login
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('username', data.username);  // Armazena o nome do usuário
            localStorage.setItem('token', data.token);  // Armazena o token JWT
            window.location.href = 'taskManager.html';  // Redireciona para a página de tarefas
        } else {
            alert('Falha no login');
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao conectar ao servidor. Tente novamente.');
    }
}

// Associa os eventos aos formulários de registro e login
document.getElementById('register-form')?.addEventListener('submit', registerUser);
document.getElementById('login-form')?.addEventListener('submit', loginUser);

// Busca a configuração e inicia o processo
fetchConfig();
