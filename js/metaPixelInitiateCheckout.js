// Seleccionamos los botones por sus IDs para mayor especificidad
const cardPaymentBtn = document.getElementById('cardPaymentBtn');
const nequiDaviplataBtn = document.getElementById('nequiDaviplataBtn');

// Función para enviar el evento de Facebook Pixel
function sendInitiateCheckoutPixelEvent(paymentMethod, buttonId) {
    if (typeof fbq === 'function') { // Verificamos que fbq esté definido
        fbq('track', 'InitiateCheckout', {
            value: 25000,
            currency: 'COP',
            contents: [{
                 id: `${paymentMethod}__programa_contador_ovejas`, // Ejemplo: "Pago con tarjeta__programa_contador_ovejas"
                quantity: 1,
                item_price: 25000
            }],
            content_type: 'product',
            // Aquí es donde añadimos el parámetro personalizado de forma que Meta lo reconozca mejor
            custom_data: {
                payment_method: paymentMethod, // Este es el parámetro que quieres ver
                source_button_id: buttonId // También puedes enviar el ID del botón si lo deseas
            }
        });
        console.log(`Evento 'InitiateCheckout' de Facebook Pixel enviado para: ${paymentMethod} (Botón: ${buttonId})`);
    } else {
        console.warn("Facebook Pixel (fbq) no está cargado. Asegúrate de incluir el código base.");
    }
}

// Añadimos un escuchador de eventos 'click' al botón de tarjeta
cardPaymentBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Evita que el navegador siga el href="#" inmediatamente
    sendInitiateCheckoutPixelEvent('Pago con tarjeta', this.id);
    // Aquí puedes añadir la lógica para redirigir al usuario al formulario de pago con tarjeta
    // Por ejemplo: window.location.href = 'tu_url_de_pago_con_tarjeta.html';
});

// Añadimos un escuchador de eventos 'click' al botón de Nequi / Daviplata
nequiDaviplataBtn.addEventListener('click', function(event) {
    sendInitiateCheckoutPixelEvent('Nequi / Daviplata', this.id);
    // La redirección a WhatsApp ocurre automáticamente por el 'href' del enlace
});
