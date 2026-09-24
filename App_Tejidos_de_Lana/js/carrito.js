document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#cart-root');
    if (!root) return;
    if (!TejidosUI.user()) {
        location.href = 'login.html';
        return
    }
    render();

    function render() {
        const c = TejidosUI.getCart();
        if (!c.length) {
            root.innerHTML = '<div class="empty"><h2>Tu carrito está vacío</h2><p class="muted">Explora la tienda y agrega alguna prenda.</p><a class="btn btn-primary" href="tienda.html">Ir a la tienda</a></div>';
            return
        }
        const subtotal = c.reduce((a, x) => a + x.price * x.qty, 0);
        root.innerHTML = `<div class="cart-layout"><div class="cart-list">${c.map(x => `<article class="cart-item"><img src="imgs/${x.image}" alt="${TejidosUI.escape(x.title)}"><div><strong>${TejidosUI.escape(x.title)}</strong><div class="muted">${TejidosUI.money(x.price)} por unidad</div></div><div class="qty"><button data-dec="${x.id}" aria-label="Restar uno">−</button><strong>${x.qty}</strong><button data-inc="${x.id}" aria-label="Sumar uno">+</button><button class="link-button" data-remove="${x.id}">Quitar</button></div></article>`).join('')}</div><aside class="summary"><h2>Resumen</h2><div class="summary-row"><span>Artículos</span><span>${c.reduce((a, x) => a + x.qty, 0)}</span></div><div class="summary-row summary-total"><span>Total</span><span>${TejidosUI.money(subtotal)}</span></div><div class="actions"><a class="btn btn-primary" href="pedido.html">Hacer pedido</a><a class="btn btn-secondary" href="tienda.html">Continuar comprando</a><button class="btn btn-danger" data-clear>Vaciar</button></div></aside></div>`;
        TejidosUI.initHeader();
    }

    root.addEventListener('click', e => {
        const c = TejidosUI.getCart();
        const id = Number((e.target.dataset.inc || e.target.dataset.dec || e.target.dataset.remove) || 0);
        if (e.target.matches('[data-inc]')) c.find(x => x.id === id).qty++;
        if (e.target.matches('[data-dec]')) {
            const x = c.find(x => x.id === id);
            x.qty--;
            if (x.qty <= 0) c.splice(c.indexOf(x), 1)
        }
        if (e.target.matches('[data-remove]')) {
            const i = c.findIndex(x => x.id === id);
            if (i >= 0) c.splice(i, 1)
        }
        if (e.target.matches('[data-clear]')) c.length = 0;
        TejidosUI.saveCart(c);
        render()
    });
});
