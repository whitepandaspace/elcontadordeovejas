// Seleccionamos todos los elementos con la clase 'product-card'
const productCards = document.querySelectorAll('.product-card');

// Función para enviar el evento AddToWishlist a Facebook Pixel
function sendAddToWishlistPixelEvent(productId, productName) {
    if (typeof fbq === 'function') { // Verificamos que fbq esté definido
        fbq('track', 'AddToWishlist', {
            content_name: productName, // Nombre del producto para el evento
            content_category: 'Productos para el Sueño', // Categoría si aplica
            contents: [{
                id: productId, // El ID único del producto
                quantity: 1,
                item_price: null // Puedes poner un precio si lo tienes
            }],
            content_type: 'product',
            custom_data: {
                product_id_clicked: productId // Parámetro personalizado con el ID del producto
            }
        });
        console.log(`Evento 'AddToWishlist' de Facebook Pixel enviado para el producto: ${productName} (ID: ${productId})`);
    } else {
        console.warn("Facebook Pixel (fbq) no está cargado. Asegúrate de incluir el código base.");
    }
}

// Añadimos un escuchador de eventos 'click' a cada tarjeta de producto
productCards.forEach(card => {
    card.addEventListener('click', function() {
        const productId = this.id; // Obtenemos el ID de la tarjeta clicada (product_a, product_b, product_c)
        // Obtenemos el texto del h3 como nombre del producto.
        // Puedes ajustar esto para obtener el nombre de otra forma si es necesario.
        const productName = this.querySelector('h3').innerText.trim(); 

        sendAddToWishlistPixelEvent(productId, productName);
    });
});