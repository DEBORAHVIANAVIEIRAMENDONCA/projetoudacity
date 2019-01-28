'use strict'

//Classe do inimigo, com um construtor passando seus paramentros.
class Enemy {
    constructor(sprite, x, y, speed) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.speed = speed;
    }
    //atualiza a posição do inimigo, e chama o metódo colisao.
    update(dt) {
        this.x += this.speed * dt;

        if (this.x >= 505) {
            this.x = 0
        }
        this.checkCollisions();
    }
    /*metodo checa a colisão entre o inimigo e o jogador, 
     o if caucula a distancia e reseta o jogador para sua posição inicial.
     o score pontua negativamente, quando o jogador colide tira pontos*/
    checkCollisions() {
        var dx = this.x - player.x;
        var dy = this.y - player.y;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 70) {
            player.x = 202;
            player.y = 415;

            const score = document.getElementById('score');
            player.score -= 1;
            score.innerHTML = player.score;
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }
}

//classe do jogador, com um construtor passando seus paramentros
class Player {
    constructor(sprite, x, y, speed) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.speed;
        this.score = 0;
    }
    //atualiza a posição do jogador, o score pontua quando o jogador chega na agua
    update(dt) {

        if (this.y <= -50) {
            this.x = 202;
            this.y = 415;
            const score = document.getElementById('score');
            this.score += 1;
            score.innerHTML = this.score;
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /*Metodo para entrada de teclado que movimenta o jogador, para esquerda,
    direita, para cima e cima e embaixo*/
    handleInput(key) {

        if (key === 'left' && this.x > 0) {
            this.x -= 101;
        }

        if (key === 'right' && this.x < 400) {
            this.x += 101;
        }

        if (key === 'up' && this.y > 0) {
            this.y -= 93;
        }

        if (key === 'down' && this.y < 400) {
            this.y += 93;
        }

    }

}


//Criando o inimigo com paramentros da classe construtora de enemy
const allEnemies = [new Enemy('images/enemy-bug.png', 40, 230, 250), new Enemy('images/enemy-bug.png', 40, 150, 350), new Enemy('images/enemy-bug.png', 40, 60, 300)];

//Criando o jogador com paramentros da classe construtora de player
const player = new Player('images/char-boy.png', 202, 415, 200);

//capturando os eventos do teclado do metodo handleInput
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };


    player.handleInput(allowedKeys[e.keyCode]);


});
