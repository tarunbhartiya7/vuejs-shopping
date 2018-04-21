new Vue({
    el: '#app',
    data: {
        isShowingCart: false,
        cart: {
            items: []
        },
        products: [
            {
                id: 1,
                name: 'MacBook Pro (15 inch)',
                description: 'This laptop has a super crisp Retina display. Yes, we know that it\'s overpriced...',
                price: 2998.555,
                inStock: 50
            },
            {
                id: 2,
                name: 'Samsung Galaxy Note 7',
                description: 'Unlike the overpriced MacBook Pro, we\'re selling this one a bit cheap, as we heard it might explode...',
                price: 299.12,
                inStock: 755
            },
            {
                id: 3,
                name: 'HP Officejet 5740 e-All-in-One-printer',
                description: 'This one might not last for so long, but hey, printers never work anyways, right?',
                price: 149,
                inStock: 5
            },
            {
                id: 4,
                name: 'iPhone 7 cover',
                description: 'Having problems keeping a hold of that phone, huh? Ever considered not dropping it in the first place?',
                price: 49,
                inStock: 42
            },
            {
                id: 5,
                name: 'iPad Pro (9.7 inch)',
                description: 'We heard it\'s supposed to be pretty good. At least that\'s what people say.',
                price: 599,
                inStock: 0
            },
            {
                id: 6,
                name: 'OnePlus 3 cover',
                description: 'Does your phone spend most of its time on the ground? This cheap piece of plastic is the solution!',
                price: 19,
                inStock: 81
            }
        ]
    },
    methods: {
        addProductToCart(product) {
            let item = this.getCartItem(product);
            if(item != null) {
                item.quantity++;
            } else {
                this.cart.items.push({
                    product,
                    quantity: 1
                });
            }
            product.inStock--;
        },
        getCartItem(product) {
            let found = null;
            this.cart.items.forEach((item, index) => {
                if(item.product.id === product.id){
                    console.log(item);
                    found = this.cart.items[index];
                }
            });
            return found;
        },
        increaseQuantity(cartItem) {
            cartItem.quantity++;
            cartItem.product.inStock--;
        },
        decreaseQuantity(cartItem) {
            cartItem.quantity--;
            cartItem.product.inStock++;
        },
        removeItemFromCart(cartItem) {
            let index = this.cart.items.indexOf(cartItem);
            if(index != -1)
                this.cart.items.splice(index, 1);
            cartItem.product.inStock += cartItem.quantity;            
        },
        checkout() {
            if(confirm('Are you sure you want to checkout?')){
                this.cart.items = [];
            }
        }
    },
    computed: {
        cartTotal() {
            let total = 0;
            this.cart.items.forEach(item => {
                total += item.product.price * item.quantity
            });
            return total;
        },
        taxAmount() {
            return (this.cartTotal * 5)/100;
        },
        discount() {
            if(this.cartTotal + this.taxAmount > 1000)
                return this.cartTotal/10;
            else return 0;
        }
    },
    filters: {
        // currency: function(value) {
        //     let formatter = Intl.NumberFormat('en-us', {
        //         style: 'currency',
        //         currency: 'USD',
        //         minimumFractionDigits: 0
        //     });
            
        //     return formatter.format(value);
        // }
        currency: function(value) {
            if(!value)
                return 0;
            value = parseFloat(value);
            return '$' + parseFloat(value.toFixed()).toLocaleString()
        }
    }
});