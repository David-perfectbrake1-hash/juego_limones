let canvas=document.getElementById("areaJuego");
let ctx=canvas.getContext("2d");

const ALTURA_SUELO=30;

const ALTURA_PERSONAJE=70;
const ANCHO_PERSONAJE=50;

const ANCHO_LIMON=30;
const ALTURA_LIMON=30;


let personajeX=canvas.width/2;
let personajeY=canvas.height-(ALTURA_SUELO+ALTURA_PERSONAJE);

let limonX=canvas.width/2;
let limonY=0;

let puntaje=0;
let vidas=3;

let velocidadLimones=200;
let intervaloLimones=null;

function iniciarJuego(){

    intervaloLimones=setInterval(bajarLimones, velocidadLimones);
    
    dibujarSuelo();
    dibujarPersonaje();
    aparecerLimones();
}

function dibujarSuelo(){
    ctx.fillStyle="brown";
    ctx.fillRect(
        0,
        canvas.height-ALTURA_SUELO,
        canvas.width,
        ALTURA_SUELO
    );
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
}

function moverDerecha(){
    personajeX+=10;
    actualizarPantalla();
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
    ctx.fillStyle="green";
    ctx.fillRect(limonX, limonY, ANCHO_LIMON, ALTURA_LIMON);    
}

function bajarLimones(){
    limonY+=50;
    actualizarPantalla();
    detectarAtrapado();
    detectarPerdido();
}

function detectarAtrapado(){
    if(
        limonX+ANCHO_LIMON>=personajeX 
        && 
        limonX<=personajeX+ANCHO_PERSONAJE 
        && 
        limonY+ALTURA_LIMON>=personajeY 
        && 
        limonY<=personajeY+ALTURA_PERSONAJE
    ){
        aparecerLimones();
        puntaje++;
        mostrarEnSpan("txtPuntaje", puntaje); 
        
        if (puntaje === 3) {
            cambiarVelocidadLimones(150);
        } else if (puntaje === 6) {
            cambiarVelocidadLimones(100);
        } else if (puntaje === 10) {
            alert(
                "¡Felicidades! Has alcanzado el puntaje máximo."
            );
            clearInterval(intervaloLimones);
        }

    }
}   

function cambiarVelocidadLimones(nuevaVelocidad){
    clearInterval(intervaloLimones);
    velocidadLimones=nuevaVelocidad;
    intervaloLimones=setInterval(bajarLimones, velocidadLimones);
}

function detectarPerdido(){
    if(
        limonY+ALTURA_LIMON>=canvas.height-ALTURA_SUELO
    ){
        aparecerLimones();
        vidas--;
        mostrarEnSpan("txtVidas", vidas);

        if(vidas===0){
            alert("¡GAME OVER! Tu puntaje final es: " + puntaje);
            clearInterval(intervaloLimones);
        }
    }
}

function aparecerLimones(){
    limonX = generarAleatorio(0, canvas.width - ANCHO_LIMON);
    limonY = 0;
    actualizarPantalla();
}

function reiniciarJuego(){
    clearInterval(intervaloLimones);

    puntaje=0;
    vidas=3;
    velocidadLimones=200;
    
    mostrarEnSpan("txtPuntaje", puntaje);
    mostrarEnSpan("txtVidas", vidas);

    limonY=0;

    iniciarJuego();
}

window.addEventListener("keydown", (evento) => {
    if (evento.key === "ArrowLeft") moverIzquierda();
    if (evento.key === "ArrowRight") moverDerecha();
});