document.addEventListener('DOMContentLoaded', () => {

    let paginaActual = 1;

    // 📄 ELEMENTOS
    const paginasRopa = document.querySelectorAll('.grid-ropa');
    const botonesPagina = document.querySelectorAll('.btn-pagina');
    const alpaguitoTEXTO = document.getElementById('texto-alpaguito');
    
    // 🛒 ELEMENTOS DEL CARRITO
    const botonesAgregar = document.querySelectorAll('.btn-agregar');
    const listaCarrito = document.getElementById('lista-carrito');
    const totalGeneral = document.getElementById('total-general');
    const cantidadArticulos = document.getElementById('cantidad-articulos');
    const botonEnviar = document.getElementById('boton-enviar');
    const nombreCliente = document.getElementById('nombre-cliente');
    const direccionCliente = document.getElementById('direccion-cliente');
    const notasCliente = document.getElementById('notas-cliente');

    let carrito = [];


    // ==============================================
    // ✅ SISTEMA DE PÁGINAS - FUNCIONA AL 100%
    // ==============================================
    function cambiarPagina(numero) {
        // 1. Ocultar TODAS las páginas
        paginasRopa.forEach(pagina => {
            pagina.classList.remove('pagina-activa');
        });

        // 2. Quitar clase activa a TODOS los botones
        botonesPagina.forEach(boton => {
            boton.classList.remove('pagina-activa');
        });

        // 3. Lógica para "Anterior" y "Siguiente"
        if (numero === 'anterior') {
            paginaActual = (paginaActual > 1) ? paginaActual - 1 : 5;
        } else if (numero === 'siguiente') {
            paginaActual = (paginaActual < 5) ? paginaActual + 1 : 1;
        } else {
            paginaActual = parseInt(numero);
        }

        // 4. MOSTRAR la página correcta
        document.getElementById(`pagina-${paginaActual}`).classList.add('pagina-activa');

        // 5. Activar el botón correcto
        document.querySelector(`[data-pagina="${paginaActual}"]`).classList.add('pagina-activa');
    }

    // 6. ASIGNAR EVENTO A CADA BOTÓN
    botonesPagina.forEach(boton => {
        boton.addEventListener('click', () => {
            cambiarPagina(boton.dataset.pagina);
        });
    });


    // ==============================================
    // 🦙 LA LLAMITA HABLA SOLITA
    // ==============================================
    const MENSAJES = [
        `<p>¡Hola! 👋 Qué bueno que estés aquí. En <span>El Rincón del Abrigo</span> tenemos diseños únicos 💛</p><div class="pico-burbuja"></div>`,
        `<p>¿Buscas algo especial? 🤩 Mira el modelo 3, es uno de los más elegantes ✨</p><div class="pico-burbuja"></div>`,
        `<p>¿Sabías que? 🧐 Cada prenda está hecha pensando en el frío y el estilo de nuestra tierra 🇧🇴</p><div class="pico-burbuja"></div>`,
        `<p>Te recomiendo el modelo 12 😍, tiene detalles hermosos y queda genial en cualquier ocasión.</p><div class="pico-burbuja"></div>`,
        `<p>¡Ojo! 👀 Si pasas a la página 2 verás diseños que se están agotando rápido 🕒</p><div class="pico-burbuja"></div>`,
        `<p>Nuestros abrigos son suaves, calientitos y muy resistentes, calidad garantizada ✅</p><div class="pico-burbuja"></div>`,
        `<p>Recuerda: en <span>El Rincón del Abrigo</span> te abrigamos con amor y cultura 💛🧶</p><div class="pico-burbuja"></div>`
    ];

    // Cambia mensaje cada 4 segundos
    setInterval(() => {
        const aleatorio = Math.floor(Math.random() * MENSAJES.length);
        alpaguitoTEXTO.innerHTML = MENSAJES[aleatorio];
    }, 4000);


    // ==============================================
    // 🛒 FUNCIONAMIENTO DEL CARRITO DE COMPRAS
    // ==============================================

    // Agregar producto al carrito
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', () => {
            const nombre = boton.getAttribute('data-nombre');
            const precio = parseInt(boton.getAttribute('data-precio'));
            
            // Agregamos el producto al array
            carrito.push({ nombre, precio });
            
            // Actualizamos lo que se ve en pantalla
            actualizarCarrito();
        });
    });

    // Eliminar producto del carrito
    function eliminarProducto(indice) {
        carrito.splice(indice, 1);
        actualizarCarrito();
    }

    // Actualizar vista del carrito
    function actualizarCarrito() {
        // Limpiamos lo que hay antes
        listaCarrito.innerHTML = '';
        
        let total = 0;

        // Recorremos los productos del carrito
        carrito.forEach((producto, indice) => {
            total += producto.precio;

            // Creamos el elemento para mostrarlo
            const elemento = document.createElement('div');
            elemento.className = 'item-carrito';
            elemento.innerHTML = `
                <span>${producto.nombre}</span>
                <span>${producto.precio} Bs.</span>
                <button class="btn-borrar" data-indice="${indice}">×</button>
            `;

            // Agregamos evento para eliminar
            elemento.querySelector('.btn-borrar').addEventListener('click', () => {
                eliminarProducto(indice);
            });

            listaCarrito.appendChild(elemento);
        });

        // Mostramos el total y la cantidad
        totalGeneral.textContent = `${total} Bs.`;
        cantidadArticulos.textContent = `${carrito.length} pieza${carrito.length !== 1 ? 's' : ''} seleccionada${carrito.length !== 1 ? 's' : ''}`;
    }


    // ==============================================
    // 📤 BOTÓN ENVIAR POR WHATSAPP
    // ==============================================
    botonEnviar.addEventListener('click', () => {
        if (carrito.length === 0) {
            alert('Por favor, agrega al menos un producto al carrito primero 🛒');
            return;
        }

        // Armar el mensaje completo
        let mensaje = `*NUEVO PEDIDO - EL RINCÓN DEL ABRIGO*\n\n`;
        mensaje += `*Nombre:* ${nombreCliente.value || 'Sin especificar'}\n`;
        mensaje += `*Dirección:* ${direccionCliente.value || 'Sin especificar'}\n`;
        mensaje += `*Notas:* ${notasCliente.value || 'Sin notas adicionales'}\n\n`;
        mensaje += `*PRODUCTOS:*\n`;

        let totalFinal = 0;
        carrito.forEach(item => {
            mensaje += `- ${item.nombre} | ${item.precio} Bs.\n`;
            totalFinal += item.precio;
        });

        mensaje += `\n*TOTAL A PAGAR:* ${totalFinal} Bs.`;

        // Abrir WhatsApp con el mensaje listo
        const numeroWhatsapp = '591 73036979'; // Cambia esto por tu número real
        const url = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');
    });

});