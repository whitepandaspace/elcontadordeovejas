// audio-tracker.js

// Seleccionamos el elemento de audio por su ID
const audioPlayer = document.getElementById('audioPlayer');

// Variable de control para que el evento Lead se envíe una sola vez
let leadEventSent = false;

// Función para enviar el evento Lead de Facebook Pixel
function sendLeadPixelEvent(source) {
    // Verificamos que 'fbq' esté definido (el código base de Facebook Pixel debe estar cargado)
    // y que el evento Lead no se haya enviado ya.
    if (typeof fbq === 'function' && !leadEventSent) {
        fbq('track', 'Lead', {
            content_name: 'El contador de ovejas - Audio', // Nombre descriptivo del lead
            custom_data: {
                lead_source: source // Para saber que fue por el audio
            }
        });
        console.log(`Evento 'Lead' de Facebook Pixel enviado por: ${source}`);
        leadEventSent = true; // Marcamos que el evento ya se envió
    } else if (!leadEventSent) {
        // Esto se ejecutará si fbq no está cargado cuando se intenta reproducir el audio por primera vez
        console.warn("Facebook Pixel (fbq) no está cargado o el evento Lead ya fue enviado.");
    }
}

// Añadimos un escuchador para el evento 'play' en el reproductor de audio.
// Este evento se dispara cuando el usuario hace clic en el botón de "Play".
if (audioPlayer) { // Aseguramos que el elemento de audio existe en la página
    audioPlayer.addEventListener('play', function() {
        sendLeadPixelEvent('Audio Reproducido');
    });
} else {
    console.error("Elemento de audio con ID 'audioPlayer' no encontrado. Asegúrate de que el ID es correcto en tu HTML.");
}