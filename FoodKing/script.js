let cart = [];
    const products = [
       { name: "Titan Burger", price: 299, img: "box1.jpg" },
       { name: "Truffle Pizza", price: 549, img: "box2.jpg" },
       { name: "Peri Peri Wings", price: 280, img: "box3.jpg" },
       { name: "Choco Lava", price: 150, img: "box4.jpg" },
       { name: "Paneer Tikka", price: 320, img: "box5.jpg" },
       { name: "Chicken Ramen", price: 450, img: "box6.jpg" },
       { name: "Greek Salad", price: 240, img: "box7.jpg" },
       { name: "Veg Tacos", price: 199, img: "box8.jpg" },
       { name: "Sushi Platter", price: 899, img: "box9.jpg" },
       { name: "Pasta Alfredo", price: 380, img: "box10.jpg" },
       { name: "Club Sandwich", price: 220, img: "box11.jpg" },
       { name: "French Fries", price: 120, img: "box12.jpg" },
       { name: "Garlic Bread", price: 180, img: "box13.jpg" },
       { name: "Iced Latte", price: 160, img: "box14.jpg" },
       { name: "Velvet Cake", price: 190, img: "box15.jpg" },
       { name: "Loaded Nachos", price: 260, img: "box16.jpg" },
       { name: "Butter Chicken", price: 420, img: "box17.jpg" },
       { name: "Veg Dimsums", price: 210, img: "box18.jpg" },
       { name: "Fruit Parfait", price: 180, img: "box19.jpg" },
       { name: "Hot Brownie", price: 170, img: "box20.jpg" }
       
    ];

function renderProducts() {
    document.getElementById('food-grid').innerHTML = products.map(p => `
        <div class="bg-gray-900 rounded-[2rem] p-5 border border-gray-800 transition-all hover:border-orange-500 group">
        <img src="${p.img}" class="w-full h-40 object-cover rounded-2xl mb-4 group-hover:scale-105 transition duration-500">        
        <h4 class="text-xl font-bold text-center">${p.name}</h4>        
        <p class="text-orange-500 font-black mb-4 text-center">₹${p.price}</p>        
        <button onclick="addToCart('${p.name}', ${p.price})" class="w-full py-3 bg-gray-800 hover:bg-orange-500 rounded-xl font-bold transition">Add to Cart</button>    
        </div>     
        
        `).join('');        
    }

function addToCart(n, p) {           
    cart.push({ id: Date.now(), n, p });            
    updateCartUI();        
}

function removeFromCart(id) {            
    cart = cart.filter(item => item.id !== id);            
    updateCartUI();        
}

function updateCartUI() {            
    const sum = cart.reduce((a, b) => a + b.p, 0);            
    document.getElementById('cartCount').innerText = cart.length;            
    document.getElementById('cartTotal').innerText = `₹${sum}`;            
    document.querySelectorAll('.finalAmt').forEach(el => el.innerText = sum);            
    document.getElementById('cartItems').innerHTML = cart.length > 0 ?                 
    cart.map(i => `                    
        <div class="flex justify-between items-center border-b border-gray-800 pb-2">                        
        <div><p class="font-bold">${i.n}</p><p class="text-orange-500">₹${i.p}</p></div>                        
        <button onclick="removeFromCart(${i.id})" class="text-red-500 text-xs font-black">REMOVE</button>                    
        </div>                
        `).join('') : '<p class="text-gray-500 text-center py-10">Empty Bag</p>';        
    }
        
    const toggleCart = () => document.getElementById('cartSidebar').classList.toggle('cart-open');        
    const openCheckout = () => { if(cart.length > 0) { toggleCart(); document.getElementById('checkoutModal').classList.remove('hidden'); } };        
    const closeCheckout = () => document.getElementById('checkoutModal').classList.add('hidden');
        
    function switchTab(tab) {            
        ['card', 'net', 'upi'].forEach(t => {                
            document.getElementById(`view-${t}`).classList.add('hidden');                
            document.getElementById(`tab-${t}`).classList.remove('active');
            
        });

        document.getElementById(`view-${tab}`).classList.remove('hidden');            
        document.getElementById(`tab-${tab}`).classList.add('active');        
    }
        
    function toPayment(e) {            
        e.preventDefault();            
        document.getElementById('stepAddress').classList.add('hidden');            
        document.getElementById('stepPayment').classList.remove('hidden');        
    }
        
    function confirmOrder() {
            
        document.getElementById('printDetails').innerHTML = `                
        <p><b>NAME:</b> ${document.getElementById('custName').value}</p>                
        <p><b>PHONE:</b> ${document.getElementById('custPhone').value}</p>                
        <p><b>EMAIL:</b> ${document.getElementById('custEmail').value}</p>                
        <p><b>ADDRESS:</b> ${document.getElementById('custAddr').value}</p>                
        <p><b>PINCODE:</b> ${document.getElementById('custPin').value}</p>                
        <p><b>DATE:</b> ${new Date().toLocaleString()}</p>            
        `;
            
        document.getElementById('printItemsList').innerHTML = cart.map(i => `<div style="display:flex; justify-content:space-between"><span>${i.n}</span><span>₹${i.p}</span></div>`).join('');            
        document.getElementById('printTotal').innerText = cart.reduce((a, b) => a + b.p, 0);    
        window.print();
        location.reload();
        
    }

    renderProducts();
    AOS.init();