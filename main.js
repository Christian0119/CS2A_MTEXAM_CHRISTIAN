const cart = {
  items: [],
  total: 0,
  count: 0
};

function saveCart(){
  try{ localStorage.setItem('cs106_cart', JSON.stringify(cart)); }catch(e){console.warn('Could not save cart', e)}
}
function loadCart(){
  try{ const data = JSON.parse(localStorage.getItem('cs106_cart')); if(data){cart.items = data.items;cart.total = data.total;cart.count = data.count; updateCartUI();} }catch(e){}
}

function updateCartUI(){
  document.getElementById('cart-count') && (document.getElementById('cart-count').textContent = cart.count);
  document.getElementById('cart-total') && (document.getElementById('cart-total').textContent = cart.total);
}

function addToCart(name, price){
  const p = Number(price) || 0;
  cart.items.push({name, price: p});
  cart.count = cart.items.length;
  cart.total = cart.items.reduce((s,i)=>s+i.price,0);
  updateCartUI();
  saveCart();
}

function removeFromCart(name){
  const idx = cart.items.findIndex(i => i.name === name);
  if(idx > -1){ cart.items.splice(idx,1); }
  cart.count = cart.items.length;
  cart.total = cart.items.reduce((s,i)=>s+i.price,0);
  updateCartUI();
  saveCart();
}

window.addEventListener('DOMContentLoaded', ()=>{


  document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());
  document.getElementById('yearFooter') && (document.getElementById('yearFooter').textContent = new Date().getFullYear());

  loadCart();


  document.querySelectorAll('.add-btn').forEach(btn =>{
    btn.addEventListener('click', (e)=>{
      const name = btn.dataset.name;
      const price = btn.dataset.price;
      addToCart(name, price);
      btn.textContent = 'Added';
      setTimeout(()=> btn.textContent = 'Add to Cart', 900);
    });
  });
  document.querySelectorAll('.remove-btn').forEach(btn =>{
    btn.addEventListener('click', ()=>{
      const name = btn.dataset.name;
      removeFromCart(name);
    });
  });


  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', (ev)=>{
      ev.preventDefault();
      const name = form.name.value.trim();
      const title = form.title.value.trim();
      const message = form.message.value.trim();
      if(!name || !message){
        document.getElementById('formResponse').textContent = 'Please fill required fields.';
        return;
      }
      
      document.getElementById('formResponse').textContent = `Thanks ${name}! Your message has been received.`;
      form.reset();
    });
  }
});