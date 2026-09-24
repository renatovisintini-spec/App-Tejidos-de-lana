document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('[data-auth-form]');
    if (!form) return;
    const type = form.dataset.authForm;
    const msg = form.querySelector('[data-message]');
    const showButtons = form.querySelectorAll('[data-toggle-password]');
    showButtons.forEach(b => b.addEventListener('click', () => {
        const i = form.querySelector('#' + b.dataset.togglePassword);
        const show = i.type === 'password';
        i.type = show ? 'text' : 'password';
        b.textContent = show ? 'Ocultar' : 'Mostrar'
    }));
    const users = () => {
        try {
            return JSON.parse(localStorage.getItem('clienteregis')) || []
        } catch {
            return []
        }
    };
    form.addEventListener('submit', e => {
        e.preventDefault();
        msg.textContent = '';
        msg.className = '';
        const data = Object.fromEntries(new FormData(form));
        if (type === 'register') {
            if (!data.nombre.trim() || !data.email.trim() || !data.password) {
                return error('Todos los campos son obligatorios.')
            }
            if (!/^\S+@\S+\.\S+$/.test(data.email)) {
                return error('Introduce un correo electrónico válido.')
            }
            if (data.password.length < 6) {
                return error('La contraseña debe tener al menos 6 caracteres.')
            }
            if (data.password !== data.repassword) {
                return error('Las contraseñas no coinciden.')
            }
            const list = users();
            if (list.some(u => u.email.toLowerCase() === data.email.toLowerCase())) return error('Ese correo ya está registrado.');
            list.push({nombre: data.nombre.trim(), email: data.email.trim().toLowerCase(), password: data.password});
            localStorage.setItem('clienteregis', JSON.stringify(list));
            msg.textContent = 'Registro creado. Redirigiendo al login…';
            msg.className = 'notice success';
            setTimeout(() => location.href = 'login.html', 700);
        } else {
            const u = users().find(u => u.email.toLowerCase() === data.email.trim().toLowerCase() && u.password === data.password);
            if (!u) return error('Usuario o contraseña incorrectos.');
            TejidosUI.setUser({nombre: u.nombre, email: u.email});
            location.href = 'tienda.html';
        }
    });

    function error(t) {
        msg.textContent = t;
        msg.className = 'notice'
    }
});
