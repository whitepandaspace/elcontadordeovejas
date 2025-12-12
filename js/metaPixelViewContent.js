// view-content-tracker.js

let viewContentEventSent = false; // Control para asegurar que el evento se envíe solo una vez

// Función para verificar si el usuario ha llegado al final de la página
function checkScrollToEnd() {
    // Calcula la altura total del contenido de la página (incluyendo el scroll no visible)
    const documentHeight = document.documentElement.scrollHeight;
    // Calcula la posición actual del scroll del usuario desde la parte superior
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    // Calcula la altura visible de la ventana del navegador (viewport)
    const windowHeight = window.innerHeight;

    // Condición: Si la suma de la posición del scroll y la altura de la ventana
    // es mayor o igual a la altura total del documento (llegó al final o muy cerca)
    const hasScrolledToEnd = (scrollTop + windowHeight >= documentHeight);

    // Si ha llegado al final Y el evento no se ha enviado aún
    if (hasScrolledToEnd && !viewContentEventSent) {
        if (typeof fbq === 'function') {
            fbq('track', 'ViewContent', {
                content_name: 'Página Vista al 100%', // Nombre descriptivo del contenido
                custom_data: {
                    scroll_percentage: '100%' // Parámetro personalizado para el detalle
                }
            });
            console.log("Evento 'ViewContent' de Facebook Pixel enviado: 100% de scroll.");
            viewContentEventSent = true; // Marcamos que el evento ya se envió
            // Opcional: Remover el event listener una vez que el evento se ha enviado
            window.removeEventListener('scroll', checkScrollToEnd);
        } else {
            console.warn("Facebook Pixel (fbq) no está cargado. Asegúrate de incluir el código base.");
        }
    }
}

// Añadir el event listener al objeto window para el evento 'scroll'
window.addEventListener('scroll', checkScrollToEnd);

// Llamar a la función una vez al cargar la página en caso de que la página sea corta
// y el usuario ya esté en el 100% al cargar
checkScrollToEnd();