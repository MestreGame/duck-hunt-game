-para criar um tabela para salvar a pontuação do jogo

CREATE TABLE scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    score INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
