// Checkout button modal toggle
const checkOut = document.getElementById('checkOut');
checkOut.addEventListener('click', () => {
    const modal = document.getElementById('modal').classList.toggle('hidden');
});



const sizes = document.querySelectorAll('.size');
const totalPriceText = document.getElementById('total-price');
let totalPrice =0;
let price = 0;
let size = '';
let color = '';
let quantity =0;
let productList=[];
let currentProduct = {
    image: "/src/assets/violet.png", 
    color: "Violet",                
    size: "S",                      
    price: 69,                      
    quantity: 0,                    
};

let selectedItemPrice = 0;
function calculateTotalPrice () {
    totalPrice = selectedItemPrice * quantity;
    totalPriceText.innerText = `$${totalPrice}`;
    console.log(totalPrice.innerText);
}

document.getElementById('increment').addEventListener('click',()=>{
    quantity = quantity+1;
    currentProduct.quantity = quantity;
    document.getElementById('quantity').innerText = `${quantity}`;
    
    calculateTotalPrice();
},{passive:true})

document.getElementById('decrement').addEventListener('click',()=>{
    if(quantity>0){
        quantity = quantity-1;
        currentProduct.quantity = quantity;
    document.getElementById('quantity').innerText = `${quantity}`;
    calculateTotalPrice();
    }
    else{
        document.getElementById('quantity').innerText = `0`
    }
})

document.addEventListener('DOMContentLoaded', () => {
    const bandOptions = document.querySelectorAll('.band'); 
    const productImage = document.getElementById('product-image'); 

    bandOptions.forEach(option => {
        option.addEventListener('click', () => {
            const newImage = option.getAttribute('data-image');
            const newColor = option.getAttribute('data-color');
            productImage.setAttribute('src', newImage);

            currentProduct.image = newImage;
            currentProduct.color = newColor;
            bandOptions.forEach(opt => {
                opt.classList.remove('outline', 'outline-offset-2', 'outline-2');
                opt.style.outlineColor = ''; 
            });

            option.classList.add('outline', 'outline-offset-2', 'outline-2');
            option.style.outlineColor = newColor;
        });
    });
});


document.addEventListener('DOMContentLoaded',()=>{
    sizes.forEach(size=>{
        size.addEventListener('click', () => {
            selectedItemPrice = parseFloat(size.querySelector('.font-normal').textContent.replace('$', '')).toFixed(2);
            console.log(selectedItemPrice);
            currentProduct.size = size.querySelector('.size-name').textContent;
            currentProduct.price = selectedItemPrice;
            console.log(currentProduct);
            document.getElementById('previousPrice').innerText ='$'+(parseFloat(selectedItemPrice)+20).toFixed(2);
            document.getElementById('newPrice').innerText ='$'+(parseFloat(selectedItemPrice)).toFixed(2);
            sizes.forEach(opt => opt.classList.remove('bg-blue-100'));
            size.classList.add('bg-blue-100');
    
            calculateTotalPrice();
        })
    })
})

const cartTableBody = document.getElementById('cart-table-body');

function updateCartTable() {
    cartTableBody.innerHTML = ''; 

    productList.forEach((product, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
                   <td class="w-[278px] flex gap-2 items-center pr-1 pb-4">
                        <div class="py-1"> <img src="${product.image}" class="rounded-[3px]" height="36" width="36" alt="Product Image"> </div>
                        <p class="text-sm text-[#364A63] font-normal leading-[23.1px]">Classy Modern Smart watch</p>
                    </td>
                    <td class="text-[#364A63] text-sm font-normal leading-[23.1px] text-center"><p>${product.color}</p></td>
                    <td class="text-[#364A63] text-sm font-bold leading-[23.1px] text-center"><p>${product.size}</p></td>
                    <td class="text-[#364A63] text-sm font-bold leading-[23.1px] text-center"><p>${product.quantity}</p></td>
                    <td class="text-[#364A63] text-sm font-bold leading-[23.1px] text-right"><p>$${product.price * product.quantity}</p></td>
        `;
        
        if(product.quantity>0){
            cartTableBody.appendChild(row);
        }
    });

    const totalAmount = productList.reduce((sum, product) => sum + product.price * product.quantity, 0);
    const totalQuantity = productList.reduce((sum,product)=>sum+product.quantity,0); 
    document.getElementById("checkOut-count").innerText = totalQuantity

    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td class="font-bold text-base text-[#373737] leading-[22px] ">
                        Total
                    </td>
                    <td class="text-[#364A63] text-sm font-normal leading-[23.1px] text-center"></td>
                    <td class="text-[#364A63] text-sm font-bold leading-[23.1px] text-center"></td>
                    <td class="text-[#364A63] text-sm font-bold leading-[23.1px] text-center"><p>${totalQuantity}</p></td>
                    <td class=" text-[#364A63] text-sm font-bold leading-[23.1px] text-right"><p id="total-price">$${totalAmount}</p></td>
    `;

    cartTableBody.appendChild(totalRow);
}

document.getElementById('addToCart').addEventListener('click', () => {
    
    console.log('add to cart')
    const productToAdd = { ...currentProduct };
    productList.push(productToAdd);
    
    // Optionally reset the quantity after adding to the cart
    quantity = 0;
    currentProduct.quantity = 0;
    document.getElementById('quantity').innerText = `0`;

    console.log(productList); 
    updateCartTable();
});

document.getElementById('continue-shopping').addEventListener('click',()=>{
    document.getElementById('modal').classList.toggle('hidden');
})



document.getElementById('confirm-checkout').addEventListener('click',()=>{
    productList = [];
    updateCartTable();
    document.getElementById('modal').classList.toggle('hidden');
})