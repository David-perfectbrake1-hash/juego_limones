let canvas=document.getElementById("areaJuego");
let ctx=canvas.getContext("2d");

const ALTURA_SUELO=20;

const ALTURA_PERSONAJE=60;
const ANCHO_PERSONAJE=40;

const ANCHO_LIMON=20;
const ALTURA_LIMON=20;


let personajeX=canvas.width/2;
let personajeY=canvas.height-(ALTURA_SUELO+ALTURA_PERSONAJE);

let limonX=canvas.width/2;
let limonY=0;

function iniciarJuego(){
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimones();
}

function dibujarSuelo(){
    ctx.fillStyle="green";
    ctx.fillRect(0,canvas.height-ALTURA_SUELO,canvas.width,ALTURA_SUELO);
}

function dibujarPersonaje(){
    ctx.fillStyle="yellow";
    ctx.fillRect(
        personajeX,
        personajeY,
        ANCHO_PERSONAJE,
        ALTURA_PERSONAJE);
}

function moverIzquierda(){
    personajeX-=10;
    actualizarPantalla();
    detectarColision();
}

function moverDerecha(){
    personajeX+=10;
    actualizarPantalla();
    detectarColision();
}

function actualizarPantalla(){
    limpiarCanvas();
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimones();
}

function limpiarCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function dibujarLimones(){
    ctx.fillStyle="orange";
    ctx.fillRect(limonX, limonY, ANCHO_LIMON, ALTURA_LIMON);    
}

function bajarLimones(){
    limonY+=10;
    actualizarPantalla();
}

function detectarColision(){
    if(
        limonX+ANCHO_LIMON>=personajeX 
        && 
        limonX<=personajeX+ANCHO_PERSONAJE 
        && 
        limonY+ALTURA_LIMON>=personajeY 
        && 
        limonY<=personajeY+ALTURA_PERSONAJE
    ){
        alert("¡Has atrapado un limón!");
        //reiniciarJuego();
    }
}