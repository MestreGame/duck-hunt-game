<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $score = intval($_POST['score']);

    $host = 'localhost';
    $db = 'duck_hunt';
    $user = 'root';
    $pass = '';

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $pdo->prepare("INSERT INTO scores (score) VALUES (:score)");
        $stmt->bindParam(':score', $score);
        $stmt->execute();

        echo "Pontuação salva com sucesso!";
    } catch (PDOException $e) {
        echo "Erro ao salvar a pontuação: " . $e->getMessage();
    }
} else {
    echo "Método de requisição inválido.";
}
?>

