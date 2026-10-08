async function cargarProductos() {
  try {
    const respuesta = await fetch('http://localhost:3000/api/productos');
    const productos = await respuesta.json();

    if (!productos || productos.length === 0) return;

    const container = document.querySelector('#sale');
    if (!container) return;

    container.innerHTML = '';

    productos.forEach(prod => {
      const tarjetaHtml = `
        <div class="col-6 col-md-4 col-lg-2">
          <div class="product-card h-100 p-2" data-id="${prod.id_producto}">
            <div class="product-img-container mb-2">
              <img src="${prod.imagen || 'img/refrigerador 2.png'}" alt="${prod.nombre}">
            </div>
            <p class="small mb-1">${prod.nombre}</p>
            <span class="badge-sale badge mb-1">-15% OFF</span>
            <p class="mb-0">
              <span class="price-new d-block">$${parseFloat(prod.precio).toFixed(2)}</span>
            </p>
            <button class="btn btn-comprar w-100 mt-2 btn-sm" onclick="addToCart(${prod.id_producto}, '${prod.nombre.replace(/'/g, "\\'")}', ${prod.precio})">
              Comprar
            </button>
          </div>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', tarjetaHtml);
    });
  } catch (error) {
    console.error('Error cargando los productos:', error);
  }
}

document.addEventListener('DOMContentLoaded', cargarProductos);