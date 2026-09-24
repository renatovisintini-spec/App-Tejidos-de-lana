(function(){
const USER_KEY='tejidos_current_user';
window.TejidosUI={
 user(){try{return JSON.parse(localStorage.getItem(USER_KEY))}catch{return null}},
 setUser(u){localStorage.setItem(USER_KEY,JSON.stringify(u))},
 logout(){localStorage.removeItem(USER_KEY);location.href='index.html'},
 cartKey(){const u=this.user();return u?`tejidos_cart_${u.email}`:null},
 getCart(){const k=this.cartKey();if(!k)return[];try{return JSON.parse(localStorage.getItem(k))||[]}catch{return[]}},
 saveCart(c){const k=this.cartKey();if(k)localStorage.setItem(k,JSON.stringify(c))},
 money(n){return new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR'}).format(n)},
 initHeader(){
   const slot=document.querySelector('[data-session]'); if(!slot)return;
   const u=this.user(); const cartCount=this.getCart().reduce((a,x)=>a+x.qty,0);
   if(u){slot.innerHTML=`<span>Hola, <strong>${this.escape(u.nombre)}</strong></span><a href="carrito.html" aria-label="Carrito con ${cartCount} artículos">Carrito (${cartCount})</a><button type="button" data-logout>Cerrar sesión</button>`;slot.querySelector('[data-logout]').addEventListener('click',()=>this.logout())}
   else slot.innerHTML='<a href="login.html">Login</a><a href="registro.html">Registro</a>';
 },
 escape(v){return String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
};
document.addEventListener('DOMContentLoaded',()=>TejidosUI.initHeader());
})();
