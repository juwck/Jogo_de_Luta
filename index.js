const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const somPulo = document.querySelector('#somPulo')
const somAtaque = document.querySelector('#somAtaque')


canvas.width = innerWidth
canvas.height = innerHeight

c.fillRect(0, 0, canvas.width, canvas.height)

const gravidade = 0.7

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png',
    escala: 1.25
})

const player = new Lutador({
    position: {
        x: 0,
        y: 0
    },
    velocidade: {
        x: 0,
        y: 0
    },
    imageSrc: './img/player/Idle.png',
    framesMax: 8,
    escala: 2.5,
    offset: {
        x: 215,
        y: 157
    },

    sprites: {
        idle: {
            imageSrc: './img/player/Idle.png',
            framesMax: 8,
            image: new Image()
        },
        andar: {
            imageSrc: './img/player/Andar.png',
            framesMax: 8
        },
        pular: {
            imageSrc: './img/player/Pulando.png',
            framesMax: 2
        },
        cair: {
            imageSrc: './img/player/Caindo.png',
            framesMax: 2
        },
        atacar1: {
            imageSrc: './img/player/ataque.player.png',
            framesMax: 6
        },
        serAtacado: {
            imageSrc: './img/player/Atacado.png',
            framesMax: 4
        },
        morte: {
            imageSrc: './img/player/morte.player.png',
            framesMax: 6
        },
    },
    caixaAtaque: {
        offset: {
            x: 100,
            y: 50
        },
        width: 160,
        height: 50
    }
})

const inimigo = new Lutador({
    position: {
        x: 400,
        y: 100
    },
    velocidade: {
        x: 0,
        y: 0
    },
    color: 'blue',
    imageSrc: './img/inimigo/Idle.png',
    framesMax: 8,
    escala: 2.5,
    offset: {
        x: 215,
        y: 157
    },

    sprites: {
        idle: {
            imageSrc: './img/inimigo/Idle.png',
            framesMax: 8,
            image: new Image()
        },
        andar: {
            imageSrc: './img/inimigo/Andar.inimigo.png',
            framesMax: 8
        },
        pular: {
            imageSrc: './img/inimigo/Pulando.png',
            framesMax: 2
        },
        cair: {
            imageSrc: './img/inimigo/Caindo.png',
            framesMax: 2
        },
        atacar1: {
            imageSrc: './img/inimigo/ataque.player.png',
            framesMax: 6
        },
        serAtacado: {
            imageSrc: './img/inimigo/Atacado.png',
            framesMax: 4
        },
        morte: {
            imageSrc: './img/inimigo/morte.player.png',
            framesMax: 6
        },
    },
    caixaAtaque: {
        offset: {
            x: -200,
            y: 50
        },
        width: 160,
        height: 50
    }
})

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

contagemRegressiva()

function animacao() {
    window.requestAnimationFrame(animacao)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

    // Ajustar background ao tamanho do canvas
    if (background.image.complete) {
        const escalaX = canvas.width / background.image.width
        const escalaY = canvas.height / background.image.height

        background.escala = Math.max(escalaX, escalaY)

        background.position.x =
            (canvas.width - background.image.width * background.escala) / 2

        background.position.y =
            (canvas.height - background.image.height * background.escala) / 2
    }

    background.update()
    c.fillStyle = 'rgba(255, 255, 255, 0.1)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    inimigo.update()

    player.velocidade.x = 0

    inimigo.velocidade.x = 0

    // Movimentação do player
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocidade.x = -5
        player.trocaSprite('andar')
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocidade.x = 5
        player.trocaSprite('andar')
    } else {
        player.trocaSprite('idle')
    }
    //pulo
    if (player.velocidade.y < 0) {
        player.trocaSprite('pular')
    } else if (player.velocidade.y > 0) {
        player.trocaSprite('cair')
    }

    // Movimentação do inimigo
    if (keys.ArrowLeft.pressed && inimigo.lastKey === 'ArrowLeft') {
        inimigo.velocidade.x = -5
        inimigo.trocaSprite('andar')
    } else if (keys.ArrowRight.pressed && inimigo.lastKey === 'ArrowRight') {
        inimigo.velocidade.x = 5
        inimigo.trocaSprite('andar')
    } else {
        inimigo.trocaSprite('idle')
    }
    //pulo
    if (inimigo.velocidade.y < 0) {
        inimigo.trocaSprite('pular')
    } else if (inimigo.velocidade.y > 0) {
        inimigo.trocaSprite('cair')
    }


    //detectar colisão
    if (
        colisãoRetangulo({
            retangulo1: player,
            retangulo2: inimigo
        }) &&
        player.isAtacando &&
        player.frameAtual === 4
    ) {
        inimigo.serAtacado()
        player.isAtacando = false

        document.querySelector('#inimigoVida').style.width = inimigo.vida + '%'
    }

    //if player errar o ataque
    if (player.isAtacando && player.frameAtual === 4) {
        player.isAtacando = false
    }


    if (
        colisãoRetangulo({
            retangulo1: inimigo,
            retangulo2: player
        })
        && inimigo.isAtacando &&
        inimigo.frameAtual === 4
    ) {
        player.serAtacado()
        inimigo.isAtacando = false
        document.querySelector('#playerVida').style.width = player.vida + '%'
    }

    if (inimigo.isAtacando && inimigo.frameAtual === 4) {
        inimigo.isAtacando = false
    }

    //fim de jogo
    if (inimigo.vida <= 0 || player.vida <= 0) {
        ganhador({ player, inimigo, timerId })
    }
}

animacao()

window.addEventListener('keydown', (event) => {
    if (!player.morto) {
        switch (event.key) {
            //player1
            case 'd':
                keys.d.pressed = true
                player.lastKey = 'd'
                break
            case 'a':
                keys.a.pressed = true
                player.lastKey = 'a'
                break
            case 'w':
                player.velocidade.y = -20
                somPulo.play()
                somPulo.currentTime = 0
                break
            case ' ':
                player.ataque()
                somAtaque.play()
                somAtaque.currentTime = 0
                break
        }
    }

    if (!inimigo.morto) {
        switch (event.key) {
            //player2
            case 'ArrowRight':
                keys.ArrowRight.pressed = true
                inimigo.lastKey = 'ArrowRight'
                break
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true
                inimigo.lastKey = 'ArrowLeft'
                break
            case 'ArrowUp':
                somPulo.play()
                somPulo.currentTime = 0
                inimigo.velocidade.y = -20
                break
            case 'Shift':
                inimigo.ataque()
                somAtaque.play()
                somAtaque.currentTime = 0
                break
        }
    }

    console.log(event.key)
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 'w':
            keys.w.pressed = false
            break
    }

    // Inimigo
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break
    }
    console.log(event.key)
})
