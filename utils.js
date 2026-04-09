function generarAleatorio(min, max) {
    let random = Math.random();
    let resultado = random * (max - min);
    let resultadoEntero = Math.ceil(resultado);
    resultadoEntero += min;
    return resultadoEntero;
}

function mostrarEnSpan(idSpan, valor) {
    let componente = document.getElementById(idSpan);
    componente.textContent = valor;
}