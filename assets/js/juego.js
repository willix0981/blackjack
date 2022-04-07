let deck=[]
const tipos = ['C','D','H','S'];
const especiales=['A','J','K','Q'];

let puntosJugador = 0 ;
let puntosComputadora =0;
let smalls = document.querySelectorAll('small');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');


const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');


const crearDeck =() => {

    for(let i =2; i<=10; i++){
        for (let tipo of tipos){
            deck.push(i + tipo);
        }

    }

    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo);

        }
    }

    //console.log(deck);
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}
crearDeck();

const pedirCarta = () => {
    

    if (deck.length ===0) {
        throw 'no hay cartas en el deck';
    }
    const carta = deck.pop();
  
    
    return carta;
}

//pedirCarta();

const valorCarta = (carta) => {

const valor = carta.substring(0, carta.length -1);
    
    return (isNaN(valor)) ?
    (valor==='A') ? 11 : 10
    :valor *1 ; 

    // if (isNaN(valor)) {
    //     puntos = (valor ==='A') ?11 : 10;
    // } else {
    //     puntos = valor *1;
    // }

    // console.log(puntos);


}

const turnoComputadora = (puntosMinimos) => {

    do {

        const carta = pedirCarta();

puntosComputadora=puntosComputadora + valorCarta(carta);

smalls[1].innerText = puntosComputadora;
//document.querySelector('small').textContent = puntosJugador;

//<img class="carta" src="assets/cartas/10C.png">

const imgCarta = document.createElement('img');
imgCarta.src = `assets/cartas/${carta}.png`;
imgCarta.classList.add('carta');
divCartasComputadora.append(imgCarta);

        if (puntosMinimos >21) {
            break;
        }
        
    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <=21));


    setTimeout(() => {
        if (puntosComputadora === puntosMinimos) {
            alert('Nadie gana');
        } else if (puntosMinimos >21) {
            alert('Computadora gana');
    
        }else if (puntosComputadora >21) {
            alert('Jugador Gana');
        } else {
            alert('computadora gana');
        }
    }, 10);
    

 }




btnPedir.addEventListener('click', () =>{
  const carta = pedirCarta();

  puntosJugador=puntosJugador + valorCarta(carta);

  smalls[0].innerText = puntosJugador;
 //document.querySelector('small').textContent = puntosJugador;

 //<img class="carta" src="assets/cartas/10C.png">
 
 const imgCarta = document.createElement('img');
 imgCarta.src = `assets/cartas/${carta}.png`;
 imgCarta.classList.add('carta');
 divCartasJugador.append(imgCarta);

    if(puntosJugador > 21){
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugador);
    } else if( puntosJugador ===21){
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugador);
    }


})

btnDetener.addEventListener('click', () =>{
    btnDetener.disabled = true;
    btnPedir.disabled= true;
    turnoComputadora(puntosJugador);


})

btnNuevo.addEventListener('click', () =>{

    console.clear();
    deck=[];
    deck = crearDeck();

    puntosJugador=0;
    puntosComputadora=0;

    smalls[0].innerText=0;
    smalls[1].innerText=0;
    divCartasComputadora.innerHTML='';
    divCartasJugador.innerHTML='';

    btnDetener.disabled=false;
    btnPedir.disabled=false;
    
} )