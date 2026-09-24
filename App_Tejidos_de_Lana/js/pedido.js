document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#order-root');
    if (!root) return;
    const u = TejidosUI.user();
    if (!u) {
        location.href = 'login.html';
        return
    }
    const c = TejidosUI.getCart();
    if (!c.length) {
        location.href = 'carrito.html';
        return
    }
    const total = c.reduce((a, x) => a + x.price * x.qty, 0);
    root.innerHTML = `<div class="form-shell" style="max-width:980px"><p class="eyebrow">Revisión final</p><h1>Pedido</h1><p><strong>Cliente:</strong> ${TejidosUI.escape(u.nombre)} · ${TejidosUI.escape(u.email)}</p><div class="table-wrap"><table class="order-table"><thead><tr><th>Prenda</th><th>Producto</th><th>Cantidad</th><th>Subtotal</th></tr></thead><tbody>${c.map(x => `<tr><td><img src="imgs/${x.image}" alt=""></td><td>${TejidosUI.escape(x.title)}</td><td>${x.qty}</td><td>${TejidosUI.money(x.price * x.qty)}</td></tr>`).join('')}</tbody><tfoot><tr><th colspan="3">Total</th><th>${TejidosUI.money(total)}</th></tr></tfoot></table></div><div class="field" style="margin-top:1rem"><label for="numero-pedido">Número de pedido</label><input id="numero-pedido" value="TL-${Date.now().toString().slice(-8)}" readonly></div><div class="actions"><button class="btn btn-primary" data-finish>Finalizar compra</button><a class="btn btn-secondary" href="carrito.html">Volver al carrito</a></div><div data-done></div></div>`;
    root.querySelector('[data-finish]').addEventListener('click', () => {
        TejidosUI.saveCart([]);
        root.querySelector('[data-done]').innerHTML = '<p class="notice success">Compra finalizada en modo demostración. El carrito se ha vaciado.</p>';
        root.querySelector('[data-finish]').disabled = true;
        TejidosUI.initHeader()
    });
});
