<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Duck Hunt Game</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Duck Hunt Game</h1>
    <canvas id="gameCanvas"></canvas>
    <p>Pontuação: <span id="score">0</span></p>
    
    <form id="scoreForm" style="display: none;">
        <input type="hidden" name="score" id="finalScore">
        <button type="button" id="saveButton">Salvar Pontuação</button>
        <button type="button" id="continueButton">Continuar Sem Salvar</button>
    </form>
    
    <div id="message"></div>
    
    <script src="game.js"></script>
</body>
</html>
