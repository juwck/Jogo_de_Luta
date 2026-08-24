
class Sprite {
    constructor({position, imageSrc}) {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
    }

    draw() {
    const proporcao = Math.max(
        canvas.width / this.image.width,
        canvas.height / this.image.height
    )
    
    const largura = this.image.width * proporcao
    const altura = this.image.height * proporcao

    const x = (canvas.width - largura) / 2
    const y = (canvas.height - altura) / 2

    c.drawImage(
        this.image,
        x,
        y,
        largura,
        altura
    )
}

    update() {
        this.draw()
    }
}

class Lutador {
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
        this.vida = 100
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