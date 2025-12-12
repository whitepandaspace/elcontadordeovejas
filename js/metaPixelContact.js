// contact-tracker.js

// Seleccionamos todos los elementos con la clase 'contact'
const contactElements = document.querySelectorAll('.contact');

// Función para enviar el evento Contact a Facebook Pixel
function sendContactPixelEvent(sourceElementId = 'N/A') {
    if (typeof fbq === 'function') { // Verificamos que fbq esté definido
        fbq('track', 'Contact', {
            content_name: 'Contacto General', // Nombre descriptivo del contacto
            custom_data: {
                contact_method: 'Desconocido', // Puedes dejarlo genérico o intentar inferirlo
                source_element_id: sourceElementId // ID del elemento que fue clickeado
            }
        });
        console.log(`Evento 'Contact' de Facebook Pixel enviado por el elemento con ID: ${sourceElementId}`);
    } else {
        console.warn("Facebook Pixel (fbq) no está cargado. Asegúrate de incluir el código base.");
    }
}

// Añadimos un escuchador de eventos 'click' a cada elemento con la clase 'contact'
if (contactElements.length > 0) { // Aseguramos que existan elementos con esa clase
    contactElements.forEach(element => {
        element.addEventListener('click', function(event) {
            // No usamos event.preventDefault() aquí para permitir que los enlaces sigan su comportamiento normal
            sendContactPixelEvent(this.id || this.tagName); // Pasa el ID del elemento o su nombre de etiqueta
        });
    });
} else {
    console.warn("No se encontraron elementos con la clase 'contact' en la página.");
}