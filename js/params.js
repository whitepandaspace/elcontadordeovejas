// Lista de tokens válidos
const validTokens = ['покупка', '2025', 'oso', 'я', '2211250NL'];

// Obtener el token de la URL
const params = new URLSearchParams(window.location.search);
const token = params.get('token');

// Validar token
if (!validTokens.includes(token)) {
    window.location.href = '/';
} else {
    fbq('track', 'Purchase', {
        value: 25000,
        currency: 'COP',
        content_ids: ['el_contador_de_ovejas_2211250NL'],
        content_type: 'product',
        contents: [{ id: 'el_contador_de_ovejas_2211250NL', quantity: 1 }]
    });
}
