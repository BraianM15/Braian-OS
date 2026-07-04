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
const listaMovimientos = document.getElementById("listaMovimientos");

const modal = document.getElementById("modal");
const tituloModal = document.getElementById("tituloModal");
const descripcion = document.getElementById("descripcion");
const valor = document.getElementById("valor");
const categoria = document.getElementById("categoria");

const guardarMovimiento = document.getElementById("guardarMovimiento");
const cancelarMovimiento = document.getElementById("cancelarMovimiento");

const nuevoIngreso = document.getElementById("nuevoIngreso");
const nuevoGasto = document.getElementById("nuevoGasto");

let tipoMovimiento = "ingreso";

function formatoDinero(numero){
    return "$" + numero.toLocaleString("es-CO");
}

function guardarDatos(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
}

function actualizarDashboard(){

    saldo.textContent = formatoDinero(estado.saldo);
    ahorro.textContent = formatoDinero(estado.ahorro);
    deudas.textContent = formatoDinero(estado.deuda);

    const total = estado.saldo + estado.ahorro - estado.deuda;

    patrimonio.textContent = formatoDinero(total);

}

function actualizarMovimientos(){

    if(estado.movimientos.length===0){

        listaMovimientos.innerHTML="<p>No hay movimientos registrados.</p>";

        return;

    }

    listaMovimientos.innerHTML="";

    [...estado.movimientos].reverse().forEach(item=>{

        listaMovimientos.innerHTML += `
            <div class="movimiento">

                <div>

                    <strong>${item.categoria}</strong><br>

                    <small>${item.descripcion}</small><br>

                    <small>${item.fecha}</small>

                </div>

                <div class="${item.tipo}">
                    ${item.tipo==="ingreso" ? "+" : "-"}
                    ${formatoDinero(item.valor)}
                </div>

            </div>
        `;

    });

}

function abrirModal(tipo){

    tipoMovimiento = tipo;

    tituloModal.textContent =
        tipo==="ingreso"
        ? "Nuevo ingreso"
        : "Nuevo gasto";

    descripcion.value="";
    valor.value="";
    categoria.selectedIndex=0;

    modal.style.display = "flex";

    descripcion.focus();

}

    function cerrarModal(){

    modal.style.display = "none";

}

guardarMovimiento.onclick = ()=>{

    const texto = descripcion.value.trim();

    const monto = Number(valor.value);

    if(texto==="" || monto<=0){

        alert("Completa todos los campos.");

        return;

    }

    if(tipoMovimiento==="ingreso"){

        estado.saldo += monto;

    }else{

        estado.saldo -= monto;

    }

    estado.movimientos.push({

        tipo:tipoMovimiento,

        categoria:categoria.value,

        descripcion:texto,

        valor:monto,

        fecha:new Date().toLocaleDateString("es-CO")

    });

    guardarDatos();

    actualizarDashboard();

    actualizarMovimientos();

    cerrarModal();

};

cancelarMovimiento.onclick = cerrarModal;

nuevoIngreso.onclick = ()=>abrirModal("ingreso");

nuevoGasto.onclick = ()=>abrirModal("gasto");

modal.style.display = "none";

actualizarDashboard();

actualizarMovimientos();
