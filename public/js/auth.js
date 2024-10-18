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
document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/auth/login', {
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
});
