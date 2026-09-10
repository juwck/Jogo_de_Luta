
class Sprite {
    constructor({
        position,
        imageSrc,
        escala = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 } }) {

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

class Lutador extends Sprite {
    constructor({
        position,
        velocidade,
        color = 'red',
        imageSrc,
        escala = 1,
        framesMax = 1,
        offset = { x: 0, y: 0 },
        sprites,
        caixaAtaque = { offset: {}, width: undefined, height: undefined }
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
            },
            offset: caixaAtaque.offset,
            width: caixaAtaque.width,
            height: caixaAtaque.height
        }
        this.color = color
        this.isAtacando
        this.vida = 100
        this.frameAtual = 0
        this.framesPassados = 0
        this.framePosição = 5
        this.sprites = sprites
        this.morto = false

        for (const Sprite in this.sprites) {
            sprites[Sprite].image = new Image()
            sprites[Sprite].image.src = sprites[Sprite].imageSrc
        }

    }

    update() {
        this.draw()
        if (!this.morto) {
            this.animarFrames()
        }

        this.caixaAtaque.position.x = this.position.x + this.caixaAtaque.offset.x
        this.caixaAtaque.position.y = this.position.y + this.caixaAtaque.offset.y

        //retangulo caixa de ataque
        //c.fillRect(
        // this.caixaAtaque.position.x,
        // this.caixaAtaque.position.y,
        //this.caixaAtaque.width,
        //this.caixaAtaque.height
        //)

        this.position.x += this.velocidade.x
        this.position.y += this.velocidade.y

        //gravidade
        if (this.position.y + this.height + this.velocidade.y >= canvas.height - 80) {
            this.velocidade.y = 0
            this.position.y = canvas.height - 50 - this.height
        } else this.velocidade.y += gravidade

    }

    ataque() {
        this.trocaSprite('atacar1')
        this.isAtacando = true
    }

    serAtacado() {
        this.vida -= 20

        if (this.vida <= 0) {
            this.trocaSprite('morte')
        } else this.trocaSprite('serAtacado')
    }

    trocaSprite(Sprite) {
        if (this.image === this.sprites.morte.image){
            if (this.frameAtual === this.sprites.morte.framesMax -1)
                this.morto = true
            return}

        if (this.image === this.sprites.atacar1.image &&
            this.frameAtual < this.sprites.atacar1.framesMax - 1
        )
            return

        if (this.image === this.sprites.serAtacado.image &&
            this.frameAtual < this.sprites.serAtacado.framesMax - 1
        )
            return

        switch (Sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                    this.frameAtual = 0
                }
                break;

            case 'andar':
                if (this.image !== this.sprites.andar.image) {
                    this.image = this.sprites.andar.image
                    this.framesMax = this.sprites.andar.framesMax
                    this.frameAtual = 0
                }
                break;

            case 'pular':
                if (this.image !== this.sprites.pular.image) {
                    this.image = this.sprites.pular.image
                    this.framesMax = this.sprites.pular.framesMax
                    this.frameAtual = 0
                }
                break;

            case 'cair':
                if (this.image !== this.sprites.cair.image) {
                    this.image = this.sprites.cair.image
                    this.framesMax = this.sprites.cair.framesMax
                    this.frameAtual = 0
                }
                break;

            case 'atacar1':
                if (this.image !== this.sprites.atacar1.image) {
                    this.image = this.sprites.atacar1.image
                    this.framesMax = this.sprites.atacar1.framesMax
                    this.frameAtual = 0
                }
                break;
            case 'serAtacado':
                if (this.image !== this.sprites.serAtacado.image) {
                    this.image = this.sprites.serAtacado.image
                    this.framesMax = this.sprites.serAtacado.framesMax
                    this.frameAtual = 0
                }
                break;
            case 'morte':
                if (this.image !== this.sprites.morte.image) {
                    this.image = this.sprites.morte.image
                    this.framesMax = this.sprites.morte.framesMax
                    this.frameAtual = 0
                }
                break;
        }
    }
}
