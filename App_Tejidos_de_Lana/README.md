# App Tejidos de Lana — versión corregida y modernizada

Esta carpeta es una **copia nueva** creada a partir del proyecto original. Los archivos originales subidos por el usuario no fueron modificados.

## Mejoras realizadas

- Estructura de carpetas normalizada: `css/`, `js/`, `imgs/`.
- Nombres de archivos simples y consistentes.
- Rutas relativas corregidas.
- HTML semántico y responsive, sin `h7` ni IDs repetidos en listados.
- CSS reescrito con Grid/Flexbox, reduciendo posicionamiento manual y eliminando miles de reglas duplicadas.
- Catálogo renderizado desde una fuente de datos JavaScript.
- Registro y login demostrativos con validaciones más claras.
- Carrito por usuario con persistencia en `localStorage`.
- Flujo de pedido simplificado y funcional.
- Formulario de contacto validado (sin backend real).
- Secciones de blog y categorías conservadas.
- Mejoras de accesibilidad: `lang="es"`, viewport, etiquetas, foco, `alt`, navegación y mensajes accesibles.

## Seguridad

El login y el registro son una **simulación frontend**. Las credenciales se guardan en `localStorage`, por lo que no deben usarse contraseñas reales. En una aplicación de producción, la autenticación debe implementarse en un backend con hash de contraseñas, sesiones/tokens y controles de autorización.

## Cómo probar

Puedes abrir `index.html` directamente en el navegador. Para una prueba más realista, sirve la carpeta con un servidor local, por ejemplo desde VS Code con Live Server.

## Estructura

```text
App_Tejidos_de_Lana/
├── index.html
├── modelos.html
├── tienda.html
├── login.html
├── registro.html
├── contacto.html
├── blog.html
├── internacionales.html
├── nacionales.html
├── locales.html
├── regionales.html
├── carrito.html
├── pedido.html
├── css/
│   ├── normalize.css
│   └── styles.css
├── js/
│   ├── data.js
│   ├── ui.js
│   ├── auth.js
│   ├── tienda.js
│   ├── carrito.js
│   ├── pedido.js
│   └── contacto.js
└── imgs/
```

## Nota sobre el proyecto original

La modernización conserva el concepto y las principales funciones del original, pero simplifica el flujo técnico: las imágenes de productos ya no se copian a IndexedDB, porque para un catálogo estático las rutas de imagen son suficientes y reducen complejidad innecesaria. El carrito sigue siendo persistente por usuario mediante `localStorage`.
