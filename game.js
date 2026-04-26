<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Open Box Game</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="game-container">
        <!-- Header -->
        <header class="header">
            <div class="logo">
                <h2>🃏 Open Box Game</h2>
            </div>
            <div class="user-info">
                <span id="playerName">Jogador</span>
                <span class="coins">💰 <span id="playerCoins">1000</span></span>
                <button class="btn-logout" id="logoutBtn">Sair</button>
            </div>
        </header>

        <!-- Sidebar -->
        <nav class="sidebar">
            <ul>
                <li><a href="#dashboard" class="nav-active">🏠 Dashboard</a></li>
                <li><a href="#catalog" onclick="showSection('catalog')">📋 Catálogo</a></li>
                <li><a href="#shop" onclick="showSection('shop')">🏪 Loja</a></li>
                <li><a href="#duels" onclick="showSection('duels')">⚔️ Duelos</a></li>
                <li><a href="#codes" onclick="showSection('codes')">🎫 Códigos</a></li>
                <li><a href="#profile" onclick="showSection('profile')">👤 Perfil</a></li>
            </ul>
        </nav>

        <!-- Main Content -->
        <main class="main-content">
            <!-- Dashboard -->
            <section id="dashboard" class="section active">
                <h2>Bem-vindo, <span id="welcomeName">Jogador!</span></h2>
                <div class="stats-grid">
                    <div class="stat-card">
                        <h3>💰 Moedas</h3>
                        <span class="stat-value" id="statCoins">1.000</span>
                    </div>
                    <div class="stat-card">
                        <h3>📦 Boxes Abertas</h3>
                        <span class="stat-value" id="statBoxes">5</span>
                    </div>
                    <div class="stat-card">
                        <h3>⚔️ Vitórias</h3>
                        <span class="stat-value" id="statWins">12</span>
                    </div>
                    <div class="stat-card">
                        <h3>🏆 Rank</h3>
                        <span class="stat-value rank-gold">#247</span>
                    </div>
                </div>
                <div class="quick-actions">
                    <button class="btn-primary" onclick="showSection('shop')">Abrir Box</button>
                    <button class="btn-secondary" onclick="showSection('duels')">Desafiar Jogador</button>
                </div>
            </section>

            <!-- Catálogo -->
            <section id="catalog" class="section">
                <h2>📋 Catálogo de Cartas</h2>
                <div class="filter-bar">
                    <select id="rarityFilter">
                        <option value="all">Todas</option>
                        <option value="comum">Comum</option>
                        <option value="rara">Rara</option>
                        <option value="epic">Épica</option>
                        <option value="mitica">Mítica</option>
                        <option value="lendaria">Lendária</option>
                        <option value="ultra">Ultra</option>
                    </select>
                </div>
                <div class="cards-grid" id="catalogGrid">
                    <!-- Cartas serão carregadas aqui -->
                </div>
            </section>

            <!-- Loja -->
            <section id="shop" class="section">
                <h2>🏪 Loja</h2>
                <div class="shop-grid">
                    <div class="shop-item">
                        <div class="box-image">📦</div>
                        <h4>Box Comum</h4>
                        <p>5 cartas comuns</p>
                        <div class="price">💰 100</div>
                        <button class="btn-buy">Comprar</button>
                    </div>
                    <div class="shop-item">
                        <div class="box-image">📦✨</div>
                        <h4>Box Rara</h4>
                        <p>3 raras + 2 comuns</p>
                        <div class="price">💰 500</div>
                        <button class="btn-buy">Comprar</button>
                    </div>
                </div>
            </section>

            <!-- Códigos -->
            <section id="codes" class="section">
                <h2>🎫 Resgatar Códigos</h2>
                <div class="code-input">
                    <input type="text" id="codeInput" placeholder="Digite o código aqui">
                    <button class="btn-primary" onclick="redeemCode()">Resgatar</button>
                </div>
                <div id="codeMessage"></div>
            </section>
        </main>
    </div>
    <script src="script.js"></script>
</body>
</html>