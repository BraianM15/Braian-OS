const saldoDisponible = document.getElementById("saldoDisponible");
const ahorro = document.getElementById("ahorros");
const historial = document.getElementById("historial");

let datos = JSON.parse(localStorage.getItem("braianOS")) || {
    saldo: 762031,
    ahorros: 4842000,
    movimientos: []
};

function formato(valor){
    return "$" + valor.toLocaleString("es-CO");
}

function guardar(){
    localStorage.setItem("braianOS", JSON.stringify(datos));
}

function actualizarPantalla(){

    saldoDisponible.textContent = formato(datos.saldo);

    ahorro.textContent = formato(datos.ahorros);

    if(datos.movimientos.length===0){
        historial.innerHTML="<p>Aún no hay movimientos registrados.</p>";
        return;
    }

    historial.innerHTML="";

    datos.movimientos.slice().reverse().forEach(m=>{

        historial.innerHTML+=`
        <div class="movimiento">
            <span>${m.descripcion}</span>
            <span class="${m.tipo}">
                ${m.tipo==="ingreso"?"+":"-"} ${formato(m.valor)}
            </span>
        </div>`;
    });

}

document.getElementById("btnIngreso").onclick=function(){

    const descripcion=prompt("Descripción del ingreso");

    if(!descripcion) return;

    const valor=parseFloat(prompt("Valor del ingreso"));

    if(isNaN(valor)) return;

    datos.saldo+=valor;

    datos.movimientos.push({
        tipo:"ingreso",
        descripcion,
        valor
    });

    guardar();

    actualizarPantalla();

}

document.getElementById("btnGasto").onclick=function(){

    const descripcion=prompt("Descripción del gasto");

    if(!descripcion) return;

    const valor=parseFloat(prompt("Valor del gasto"));

    if(isNaN(valor)) return;

    datos.saldo-=valor;

    datos.movimientos.push({
        tipo:"gasto",
        descripcion,
        valor
    });

    guardar();

    actualizarPantalla();

}

actualizarPantalla();

if("serviceWorker" in navigator){

    navigator.serviceWorker.register("service-worker.js");

}
