// URL da API de autenticação
const REGISTER_URL = 'http://localhost:3000/auth/register';
const LOGIN_URL = 'http://localhost:3000/auth/login';

// Manipular o registro de usuário
document.getElementById('register-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

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
        window.location.href = 'login.html'; // Redirecionar para a tela de login
    } else {
        alert(result.error || 'Erro ao registrar');
    }
});

// Manipular o login de usuário
document.getElementById('login-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    
    if (response.ok) {
        localStorage.setItem('token', result.token); // Armazenar o token JWT no localStorage
        alert('Login bem-sucedido!');
        window.location.href = 'taskManager.html'; // Redirecionar para a tela principal
    } else {
        alert(result.error || 'Erro ao fazer login');
    }
});
