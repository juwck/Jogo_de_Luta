const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const somPulo = document.querySelector('#somPulo')
const somAtaque = document.querySelector('#somAtaque')


canvas.width = innerWidth
canvas.height = innerHeight

c.fillRect(0, 0, canvas.width, canvas.height)

const gravidade = 0.7

const player = new Lutador({
    position: {
        x: 0,
        y: 0
    },
    velocidade: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
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
    offset: {
        x: -50,
        y: 0
    }
})


console.log(player)

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

function colisãoRetangulo({ retangulo1, retangulo2 }) {
    return(
        retangulo1.caixaAtaque.position.x + retangulo1.caixaAtaque.width >= retangulo2.position.x && 
        retangulo1.caixaAtaque.position.x <= retangulo2.position.x + retangulo2.width &&
        retangulo1.caixaAtaque.position.y + retangulo1.caixaAtaque.height >= retangulo2.position.y &&
        retangulo1.caixaAtaque.position.y <= retangulo2.position.y + retangulo2.height 
    )
}

function ganhador({ player, inimigo, timerId}) {
    clearTimeout(timerId)
    document.querySelector('#textoDisplay').style.display = 'flex'
    if(player.vida === inimigo.vida) {
        document.querySelector('#textoDisplay').innerHTML = 'Empate'
    } else if (player.vida > inimigo.vida) {
        document.querySelector('#textoDisplay').innerHTML = 'Player 1 Venceu'
    } else if (inimigo.vida > player.vida) {
        document.querySelector('#textoDisplay').innerHTML = 'Player 2 Venceu'
    }
}

let timer = 60
let timerId 
function contagemRegressiva() {
    if(timer > 0) {
        timerId = setTimeout(contagemRegressiva, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }

    if(timer === 0) {
       ganhador({player, inimigo, timerId}) 
    }
}

contagemRegressiva()

function animacao() {
    window.requestAnimationFrame(animacao)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    inimigo.update()

    player.velocidade.x = 0

    inimigo.velocidade.x = 0

    // Movimentação do player
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocidade.x = -5
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocidade.x = 5
    }

    // Movimentação do inimigo
    if (keys.ArrowLeft.pressed && inimigo.lastKey === 'ArrowLeft') {
        inimigo.velocidade.x = -5
    } else if (keys.ArrowRight.pressed && inimigo.lastKey === 'ArrowRight') {
        inimigo.velocidade.x = 5
    }

    //detectar colisão
    if(
        colisãoRetangulo({
            retangulo1: player, 
            retangulo2: inimigo
        })
        && player.isAtacando
    ) {
        player.isAtacando = false
        inimigo.vida -= 20
        document.querySelector('#inimigoVida').style.width = inimigo.vida + '%'
    }

     if(
        colisãoRetangulo({
            retangulo1: inimigo, 
            retangulo2: player
        })
        && inimigo.isAtacando
    ) {
        inimigo.isAtacando = false
        player.vida -= 20
        document.querySelector('#playerVida').style.width = player.vida + '%'
    }

    //fim de jogo
    if(inimigo.vida <= 0 || player.vida <= 0) {
        ganhador({player, inimigo, timerId})
    } 
}

animacao()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
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
