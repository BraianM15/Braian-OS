const STORAGE_KEY = "braian-os";

const estado = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
    saldo: 762031,
    ahorro: 4842000,
    deuda: 40000000,
    movimientos: []
};

const saldo = document.getElementById("saldo");
const ahorro = document.getElementById("ahorro");
const deudas = document.getElementById("deudas");
const patrimonio = document.getElementById("patrimonio");
const lista = document.getElementById("listaMovimientos");

function dinero(valor){
    return "$" + valor.toLocaleString("es-CO");
}

function guardar(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
}

function render(){

    saldo.textContent = dinero(estado.saldo);
    ahorro.textContent = dinero(estado.ahorro);
    deudas.textContent = dinero(estado.deuda);

    const patrimonioTotal = estado.saldo + estado.ahorro - estado.deuda;
    patrimonio.textContent = dinero(patrimonioTotal);

    if(estado.movimientos.length===0){
        lista.innerHTML="<p>No hay movimientos registrados.</p>";
        return;
    }

    lista.innerHTML="";

    [...estado.movimientos].reverse().forEach(item=>{

        lista.innerHTML+=`
        <div class="movimiento">
            <div>
                <strong>${item.descripcion}</strong><br>
                <small>${item.fecha}</small>
            </div>

            <div class="${item.tipo}">
                ${item.tipo==="ingreso"?"+":"-"} ${dinero(item.valor)}
            </div>
        </div>
        `;

    });

}

function registrar(tipo){

    const descripcion = prompt("Descripción");

    if(!descripcion) return;

    const valor = Number(prompt("Valor"));

    if(isNaN(valor) || valor<=0) return;

    const fecha = new Date().toLocaleDateString("es-CO");

    if(tipo==="ingreso"){
        estado.saldo += valor;
    }else{
        estado.saldo -= valor;
    }

    estado.movimientos.push({
        tipo,
        descripcion,
        valor,
        fecha
    });

    guardar();

    render();

}

document
.getElementById("nuevoIngreso")
.addEventListener("click",()=>registrar("ingreso"));

document
.getElementById("nuevoGasto")
.addEventListener("click",()=>registrar("gasto"));

render();

if("serviceWorker" in navigator){
    navigator.serviceWorker.register("service-worker.js");
}
