const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

c.fillRect(0, 0, canvas.width, canvas.height)

const gravidade = 0.7

class Sprite {
    constructor({position, velocidade, color = 'red', offset}) {
        this.position = position
        this.velocidade = velocidade
        this.width = 50
        this.height = 150
        this.lastKey
        this.caixaAtaque = {
            position: {
                x: this.position.x,
                y: this.position.y
            } ,
            offset,
            width: 100,
            height: 50
        }
        this.color = color
        this.isAtacando
    }

    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        //ataque
        if(this.isAtacando) {
            c.fillStyle = 'green'
            c.fillRect(
                this.caixaAtaque.position.x,
                this.caixaAtaque.position.y,
                this.caixaAtaque.width,
                this.caixaAtaque.height)
        }
    }

    update() {
        this.draw()
        this.caixaAtaque.position.x = this.position.x + this.caixaAtaque.offset.x
        this.caixaAtaque.position.y = this.position.y

        this.position.x += this.velocidade.x
        this.position.y += this.velocidade.y
        this.velocidade.y += gravidade
        if (this.position.y + this.height + this.velocidade.y >= canvas.height) {
            this.velocidade.y = 0   
        } else
        this.velocidade.y += gravidade

    }

    ataque(){
        this.isAtacando = true
        setTimeout(() => {
            this.isAtacando = false
        }, 100)
    }
}

const player = new Sprite({
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


const inimigo = new Sprite({
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
        console.log('go')
    }

     if(
        colisãoRetangulo({
            retangulo1: inimigo, 
            retangulo2: player
        })
        && inimigo.isAtacando
    ) {
        inimigo.isAtacando = false
        console.log('ataque inimigo')
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
            break
        case ' ':
            player.ataque()
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
            inimigo.velocidade.y = -20
            break
        case 'Shift':
            inimigo.isAtacando = true
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