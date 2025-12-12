const pagoDiv = document.querySelector('.pago');
let pixelEventSent = false; // Variable para controlar si el evento ya se envió

function checkScroll() {
    const rect = pagoDiv.getBoundingClientRect();

    // Definimos que el elemento es visible cuando su parte superior
    // está por encima del 75% de la altura de la ventana
    const isVisible = (rect.top <= window.innerHeight * 0.75) && (rect.bottom >= 0);

    // Si el elemento es visible Y el evento de Pixel NO se ha enviado aún
    if (isVisible && !pixelEventSent) {
        // Aquí se ejecuta el script de Facebook Pixel
        // Asegúrate de que el código base de Facebook Pixel esté cargado antes en tu HTML
        if (typeof fbq === 'function') { // Verificamos que fbq esté definido
            fbq('track', 'AddToCart');
            console.log("Evento 'AddToCart' de Facebook Pixel enviado.");
            pixelEventSent = true; // Marcamos que el evento ya se envió
            // Opcional: Si solo quieres que el evento se envíe una vez, puedes remover el event listener
            // window.removeEventListener('scroll', checkScroll);
        } else {
            console.warn("Facebook Pixel (fbq) no está cargado. Asegúrate de incluir el código base.");
        }
    }
    // Si quieres que el evento pueda volver a enviarse si el usuario hace scroll
    // hacia arriba y luego vuelve a bajar, descomenta la siguiente sección:
    /*
    else if (!isVisible && pixelEventSent) {
        pixelEventSent = false; // Reinicia el estado para que el evento pueda enviarse de nuevo
        console.log('Estado de envío de evento reiniciado.');
    }
    */
}

window.addEventListener('scroll', checkScroll);

// Llamamos a la función una vez al cargar la página por si el div ya es visible
checkScroll();