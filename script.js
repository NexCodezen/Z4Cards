// ===== SISTEMA COMPLETO - VERSÃO CORRIGIDA =====
let currentUser = null;
let users = {};
let cardsDB = [];
let codesDB = [];

// ADMIN
const ADMIN_USER = 'Good_adm';
const ADMIN_PASS = '200526';

// INICIALIZAÇÃO IMEDIATA
window.addEventListener('load', function() {
    loadAllData();
    checkAuth();
    bindAllEvents();
});

function loadAllData() {
    users = JSON.parse(localStorage.getItem('users')) || {};
    cardsDB = JSON.parse(localStorage.getItem('cardsDB')) || [];
    codesDB = JSON.parse(localStorage.getItem('codesDB')) || [];
    
    // Dados iniciais
    if (Object.keys(users).length === 0) {
        createTestUser();
    }
    if (cardsDB.length === 0) {
        createSampleCards();
    }
    if (codesDB.length === 0) {
        createSampleCodes();
    }
}

function createTestUser() {
    users['teste'] = {
        password: '123456',
        email: 'teste@email.com',
        coins: 1000,
        boxesOpened: 0,
        wins: 0,
        rank: 1000,
        cards: []
    };
    saveUsers();
}

function createSampleCards() {
    cardsDB = [
        { id: 1, name: 'Guerreiro', attack: 50, defense: 40, rarity: 'comum', icon: '🗡️' },
        { id: 2, name: 'Dragão', attack: 120, defense: 100, rarity: 'lendaria', icon: '🐉' },
        { id: 3, name: 'Mago', attack: 80, defense: 30, rarity: 'rara', icon: '🔮' }
    ];
    localStorage.setItem('cardsDB', JSON.stringify(cardsDB));
}

function createSampleCodes() {
    codesDB = [
        { code: 'TESTE2024', value: 5000, used: false, usedBy: null, createdAt: new Date().toLocaleString() }
    ];
    localStorage.setItem('codesDB', JSON.stringify(codesDB));
}

// ===== AUTENTICAÇÃO =====
function bindAllEvents() {
    // Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) loginForm.onsubmit = handleLogin;

    // Register
    const registerForm = document.getElementById('registerForm');
    if (registerForm) registerForm.onsubmit = handleRegister;

    // Show Register
    const showRegisterBtn = document.getElementById('showRegister');
    if (showRegisterBtn) showRegisterBtn.onclick = showRegisterForm;

    // Game Page
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.onclick = logout;

    // Coins Redeem
    const redeemBtn = document.querySelector('.btn-primary[onclick="redeemCode()"]');
    if (redeemBtn) redeemBtn.onclick = redeemCode;
}

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username')?.value || '';
    const password = document.getElementById('password')?.value || '';

    console.log('Tentando login:', username); // DEBUG

    // ADMIN
    if (username === ADMIN_USER && password === ADMIN_PASS) {
        currentUser = username;
        localStorage.setItem('currentUser', username);
        alert('✅ Admin logado!');
        window.location.href = 'game.html';
        return;
    }

    // USUÁRIO NORMAL
    if (users[username] && users[username].password === password) {
        currentUser = username;
        localStorage.setItem('currentUser', username);
        alert(`✅ Bem-vindo, ${username}!`);
        window.location.href = 'game.html';
    } else {
        alert('❌ Usuário ou senha incorretos!\n\n💡 Teste: teste / 123456');
    }
}

function handleRegister(e) {
    e.preventDefault();
    
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    if (users[username]) {
        alert('❌ Este usuário já existe!');
        return;
    }

    users[username] = {
        password,
        email,
        coins: 1000,
        boxesOpened: 0,
        wins: 0,
        rank: 1000,
        cards: []
    };

    saveUsers();
    alert('✅ Conta criada! Faça login agora.');
    
    // Voltar para login
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
}

function showRegisterForm() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
}

function checkAuth() {
    currentUser = localStorage.getItem('currentUser');
    
    if (window.location.pathname.includes('game.html')) {
        if (!currentUser) {
            alert('❌ Faça login primeiro!');
            window.location.href = 'login.html';
        } else {
            loadPlayerData();
        }
    }
}

function logout() {
    if (confirm('Sair da conta?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
}

// ===== DADOS DO JOGADOR =====
function loadPlayerData() {
    if (!currentUser || !users[currentUser]) return;

    // Header
    document.getElementById('playerName').textContent = currentUser;
    document.getElementById('welcomeName').textContent = currentUser;
    
    // Stats
    const user = users[currentUser];
    document.getElementById('playerCoins').textContent = user.coins;
    document.getElementById('statCoins').textContent = user.coins.toLocaleString();
    document.getElementById('statBoxes').textContent = user.boxesOpened;
    document.getElementById('statWins').textContent = user.wins;

    // Admin
    if (currentUser === ADMIN_USER) {
        setTimeout(showAdminPanel, 500);
    }
}

// ===== CÓDIGOS =====
function redeemCode() {
    const codeInput = document.getElementById('codeInput');
    const code = codeInput.value.trim().toUpperCase();
    const messageEl = document.getElementById('codeMessage') || document.createElement('div');

    const codeData = codesDB.find(c => c.code === code && !c.used);
    
    if (!currentUser) {
        alert('❌ Faça login primeiro!');
        return;
    }

    if (codeData) {
        users[currentUser].coins += codeData.value;
        codeData.used = true;
        codeData.usedBy = currentUser;
        
        saveAllData();
        loadPlayerData();
        
        messageEl.innerHTML = `✅ +${codeData.value} moedas!`;
        messageEl.style.color = 'green';
        codeInput.value = '';
        
        alert(`✅ ${codeData.value} moedas adicionadas!`);
    } else {
        alert('❌ Código inválido ou já usado!\n💡 Teste: TESTE2024');
    }
}

// ===== SALVAR DADOS =====
function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

function saveAllData() {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('codesDB', JSON.stringify(codesDB));
    localStorage.setItem('cardsDB', JSON.stringify(cardsDB));
}

// ===== ADMIN PANEL (SIMPLIFICADO PRIMEIRO) =====
function showAdminPanel() {
    // Botão Admin no Header
    if (!document.querySelector('.btn-admin')) {
        const userInfo = document.querySelector('.user-info');
        const adminBtn = document.createElement('button');
        adminBtn.className = 'btn-admin';
        adminBtn.innerHTML = '⚙️ ADMIN';
        adminBtn.onclick = () => showSection('admin');
        userInfo.appendChild(adminBtn);
    }
    
    alert('🔧 PAINEL ADMIN ATIVO!\nLogin: Good_adm / 200526\nClique em ADMIN no topo!');
}

// ===== NAVEGAÇÃO =====
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('a[href]').forEach(a => a.classList.remove('nav-active'));
    
    const section = document.getElementById(sectionId);
    if (