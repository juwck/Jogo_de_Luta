
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