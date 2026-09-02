
class Sprite {
    constructor({
        position,
        imageSrc,
        escala = 1,
        framesMax = 1,
        offset = {x: 0, y: 0} }) {
        
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.escala = escala
        this.framesMax = framesMax
        this.frameAtual = this.frameAtual
        this.framesPassados = 0
        this.framePosição = 5
        this.offset = offset
    }

    draw() {
        c.drawImage(
            this.image,
            this.frameAtual * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) * this.escala,
            this.image.height * this.escala

        )

    }

    animarFrames() {
        this.framesPassados++

        if (this.framesPassados % this.framePosição === 0) {
            if (this.frameAtual < this.framesMax - 1) {
                this.frameAtual++
            } else {
                this.frameAtual = 0 
            }
        }
    }

    update() {
        this.draw()
        this.animarFrames()
    } 
}

class Lutador extends Sprite{
    constructor({
        position,
        velocidade,
        color = 'red',
        imageSrc,
        escala = 1,
        framesMax = 1,
        offset = {x: 0, y: 0},
        sprites
    }) {

        super({
            position,
            imageSrc,
            escala,
            framesMax,
            offset
        })

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
        this.vida = 100
        this.frameAtual = 0
        this.framesPassados = 0
        this.framePosição = 5
        this.sprites = sprites
    }

    update() {
        this.draw()
        this.animarFrames()
        this.caixaAtaque.position.x = this.position.x + this.caixaAtaque.offset.x
        this.caixaAtaque.position.y = this.position.y

        this.position.x += this.velocidade.x
        this.position.y += this.velocidade.y
        this.velocidade.y += gravidade
        if (this.position.y + this.height + this.velocidade.y >= canvas.height - 80) {
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