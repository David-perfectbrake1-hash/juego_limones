let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");
const ALTURA_SUELO = 20;
const ALTURA_PERSONAJE = 110;
const ANCHO_PERSONAJE = 85;
const ANCHO_LIMON = 50;
const ALTURA_LIMON = 50;
let personajeX = canvas.width / 2;
let personajeY = canvas.height - (ALTURA_SUELO + ALTURA_PERSONAJE);
let limonX = canvas.width / 2;
let limonY = 0;
let puntaje = 0;
let vidas = 3;
let velocidadLimones = 200;
let intervaloLimones = null;
let mostrarInstruccionesCanvas = true;

function iniciarJuego() {
  intervaloLimones = setInterval(bajarLimones, velocidadLimones);
  dibujarSuelo();
  dibujarPersonaje();
  aparecerLimones();
}

/* ==========================================
   DIBUJO DEL SUELO (Tierra + Raíces/Musgo)
   ========================================== */
function dibujarSuelo() {
  // Capa base de tierra húmeda
  ctx.fillStyle = "#3f2314";
  ctx.fillRect(0, canvas.height - ALTURA_SUELO, canvas.width, ALTURA_SUELO);
  
  // Capa superior con textura de musgo
  ctx.fillStyle = "#4a3520";
  ctx.fillRect(0, canvas.height - ALTURA_SUELO + 4, canvas.width, ALTURA_SUELO - 4);
  
  // Vegetación fija en la orilla (sin random para evitar parpadeo)
  ctx.fillStyle = "#2d5a27";
  for (let i = 0; i < canvas.width; i += 20) {
    ctx.fillRect(i, canvas.height - ALTURA_SUELO - 3, 12, 6);
  }
}

/* ==========================================
   DIBUJO DEL PERSONAJE (Canasta de mimbre)
   ========================================== */
function dibujarPersonaje() {
  // Cuerpo de la canasta (trapecio)
  ctx.fillStyle = "#8B5A2B";
  ctx.beginPath();
  ctx.moveTo(personajeX, personajeY + 20);
  ctx.lineTo(personajeX + ANCHO_PERSONAJE, personajeY + 20);
  ctx.lineTo(personajeX + ANCHO_PERSONAJE - 15, personajeY + ALTURA_PERSONAJE);
  ctx.lineTo(personajeX + 15, personajeY + ALTURA_PERSONAJE);
  ctx.closePath();
  ctx.fill();

  // Borde superior reforzado
  ctx.fillStyle = "#A0522D";
  ctx.fillRect(personajeX, personajeY + 15, ANCHO_PERSONAJE, 8);

  // Líneas de tejido de mimbre
  ctx.strokeStyle = "#654321";
  ctx.lineWidth = 2;
  for (let y = personajeY + 30; y < personajeY + ALTURA_PERSONAJE; y += 12) {
    ctx.beginPath();
    ctx.moveTo(personajeX + 5, y);
    ctx.lineTo(personajeX + ANCHO_PERSONAJE - 5, y);
    ctx.stroke();
  }

  // Asa de la canasta
  ctx.strokeStyle = "#8B5A2B";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(personajeX + ANCHO_PERSONAJE / 2, personajeY + 15, 25, Math.PI, 0);
  ctx.stroke();
}

/* ==========================================
   DIBUJO DE LIMONES (Fruta tropical)
   ========================================== */
function dibujarLimones() {
  // Cuerpo ovalado amarillo-verdoso
  ctx.fillStyle = "#E8D835";
  ctx.beginPath();
  ctx.ellipse(limonX + ANCHO_LIMON / 2, limonY + ALTURA_LIMON / 2, ANCHO_LIMON / 2 - 2, ALTURA_LIMON / 2 - 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Sombra interna para dar volumen
  ctx.fillStyle = "#C5B330";
  ctx.beginPath();
  ctx.ellipse(limonX + ANCHO_LIMON / 2 - 5, limonY + ALTURA_LIMON / 2 + 3, 12, 18, 0, 0, Math.PI * 2);
  ctx.fill();

  // Hoja tropical en la parte superior
  ctx.fillStyle = "#2E8B57";
  ctx.beginPath();
  ctx.moveTo(limonX + ANCHO_LIMON / 2, limonY + 2);
  ctx.quadraticCurveTo(limonX + ANCHO_LIMON / 2 + 8, limonY - 8, limonX + ANCHO_LIMON / 2 + 12, limonY + 5);
  ctx.quadraticCurveTo(limonX + ANCHO_LIMON / 2 + 4, limonY + 8, limonX + ANCHO_LIMON / 2, limonY + 2);
  ctx.fill();
}

// ─────────────────────────────────────────────────────────────
// LÓGICA DE MOVIMIENTO Y ACTUALIZACIÓN (SIN MODIFICACIONES)
// ─────────────────────────────────────────────────────────────
function moverIzquierda() {
  ocultarInstrucciones();
  personajeX -= 10;
  actualizarPantalla();
}
function moverDerecha() {
  ocultarInstrucciones();
  personajeX += 10;
  actualizarPantalla();
}
function actualizarPantalla() {
  limpiarCanvas();
  dibujarSuelo();
  dibujarPersonaje();
  dibujarLimones();

  dibujarBannerInstrucciones();

}
function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ─────────────────────────────────────────────────────────────
// BUCLE DE JUEGO Y DETECCIÓN (SIN MODIFICACIONES)
// ─────────────────────────────────────────────────────────────
function bajarLimones() {
  limonY += 10;
  actualizarPantalla();
  detectarAtrapado();
  detectarPerdido();
}

function detectarAtrapado() {
  if (
    limonX + ANCHO_LIMON >= personajeX &&
    limonX <= personajeX + ANCHO_PERSONAJE &&
    limonY + ALTURA_LIMON >= personajeY &&
    limonY <= personajeY + ALTURA_PERSONAJE
  ) {
    aparecerLimones();
    puntaje++;
    mostrarEnSpan("txtPuntaje", puntaje);
    if (puntaje === 3) {
      cambiarVelocidadLimones(150);
    } else if (puntaje === 6) {
      cambiarVelocidadLimones(100);
    } else if (puntaje === 10) {
      clearInterval(intervaloLimones); // Corregido typo original para evitar error
      limpiarCanvas();
      dibujarSuelo();
      ctx.font = "30px Arial";
      ctx.fillStyle = "orange";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("¡FELICIDADES! ", canvas.width / 2, canvas.height / 2);
      ctx.font = "20px Arial";
      ctx.fillStyle = "white";
      ctx.fillText("Has alcanzado el puntaje máximo:  " + puntaje, canvas.width / 2, canvas.height / 2 + 40);
    }
  }
}

function cambiarVelocidadLimones(nuevaVelocidad) {
  clearInterval(intervaloLimones);
  velocidadLimones = nuevaVelocidad;
  intervaloLimones = setInterval(bajarLimones, velocidadLimones);
}

function detectarPerdido() {
  if (limonY + ALTURA_LIMON >= canvas.height - ALTURA_SUELO) {
    aparecerLimones();
    vidas--;
    mostrarEnSpan("txtVidas", vidas);
    if (vidas <= 0) {
      clearInterval(intervaloLimones);
      limpiarCanvas();
      dibujarSuelo();
      ctx.font = "30px Arial";
      ctx.fillStyle = "red";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
      ctx.font = "20px Arial";
      ctx.fillStyle = "white";
      ctx.fillText("Puntaje final:  " + puntaje, canvas.width / 2, canvas.height / 2 + 40);
    }
  }
}

function aparecerLimones() {
  limonX = generarAleatorio(0, canvas.width - ANCHO_LIMON);
  limonY = 0;
  actualizarPantalla();
}

function reiniciarJuego() {
  clearInterval(intervaloLimones);

    // 1. Resetear variables lógicas
    puntaje = 0;
    vidas = 3;
    velocidadLimones = 200;
    
    // 2. VOLVER A MOSTRAR LAS INSTRUCCIONES (Añade estas líneas)
    mostrarInstruccionesCanvas = true; // Permite que el banner del canvas se dibuje
    let instruccionesHTML = document.querySelector(".instrucciones-teclado");
    if (instruccionesHTML) {
        instruccionesHTML.style.display = "block"; // Muestra el texto debajo del canvas
    }

    // 3. Resetear interfaz
    mostrarEnSpan("txtPuntaje", puntaje);
    mostrarEnSpan("txtVidas", vidas);
    
    intervaloLimones = setInterval(bajarLimones, velocidadLimones);
    aparecerLimones();
}

// ─────────────────────────────────────────────────────────────
// CONTROLES (SIN MODIFICACIONES)
// ─────────────────────────────────────────────────────────────
window.addEventListener("keydown", (evento) => {
  if (evento.key === "ArrowLeft") moverIzquierda();
  if (evento.key === "ArrowRight") moverDerecha();
});

function ocultarInstrucciones() {
    mostrarInstruccionesCanvas = false; // Detiene el dibujo en el canvas
    let instruccionesHTML = document.querySelector(".instrucciones-teclado");
    if (instruccionesHTML) {
        instruccionesHTML.style.display = "none";
    }
}

function dibujarBannerInstrucciones() {
    if (!mostrarInstruccionesCanvas) return;

    // 1. Dibujar la franja blanca translúcida
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)"; // Blanco con 50% de opacidad
    const altoBanner = 50;
    ctx.fillRect(0, canvas.height / 2 - altoBanner / 2, canvas.width, altoBanner);

    // 2. Configurar y dibujar el texto
    ctx.font = "bold 18px Inter, Arial";
    ctx.fillStyle = "#3d1a10"; // Tu color maderoso oscuro para contraste
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
        "Usa las flechas del teclado ◀ ▶ para cosechar los limones", 
        canvas.width / 2, 
        canvas.height / 2
    );
}