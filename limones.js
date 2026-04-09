let canvas=document.getElementById("areaJuego");
let ctx=canvas.getContext("2d");

const ALTURA_SUELO=20;
const ALTURA_PERSONAJE=60;
const ANCHO_PERSONAJE=40;

let personajeX=canvas.width/2;

function iniciarJuego(){
    dibujarSuelo();
    dibujarPersonaje();
}

function dibujarSuelo(){
    ctx.fillStyle="green";
    ctx.fillRect(0,canvas.height-ALTURA_SUELO,canvas.width,ALTURA_SUELO);
}

function dibujarPersonaje(){
    ctx.fillStyle="yellow";
    ctx.fillRect(
        personajeX,
        canvas.height-(ALTURA_SUELO+ALTURA_PERSONAJE),
        ANCHO_PERSONAJE,
        ALTURA_PERSONAJE);
}

function moverIzquierda(){
    personajeX-=10;
    actualizarPantalla();
}

function moverDerecha(){
    personajeX+=10;
    actualizarPantalla();
}

function actualizarPantalla(){
    limpiarCanvas();
    dibujarSuelo();
    dibujarPersonaje();
}

function limpiarCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}