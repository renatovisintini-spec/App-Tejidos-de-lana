document.addEventListener('DOMContentLoaded', () => {
    const f = document.querySelector('#contact-form');
    if (!f) return;
    const msg = f.querySelector('[data-message]');
    f.addEventListener('submit', e => {
        e.preventDefault();
        const d = Object.fromEntries(new FormData(f));
        if (!d.nombre.trim() || !/^\S+@\S+\.\S+$/.test(d.email) || !d.asunto.trim() || !d.mensaje.trim()) {
            msg.textContent = 'Completa todos los campos y verifica el correo.';
            msg.className = 'notice';
            return
        }
        msg.textContent = 'Mensaje validado correctamente. En esta versión de demostración no se envía a un servidor.';
        msg.className = 'notice success';
        f.reset()
    })
});
