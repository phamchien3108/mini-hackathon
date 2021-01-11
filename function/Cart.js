
module.exports = function Cart(data){
    this.cartDetail = data.cartDetail;
    this.totalQuanty = data.totalQuanty;
    this.totalPrice = data.totalPrice;

    this.add = function(item,id,userquanty) {
        if(!this.cartDetail[id]){
            this.cartDetail[id] = { item:item , quanty: 0, price: 0 };
        }
        this.totalQuanty += (userquanty - data.cartDetail[id].quanty);
        this.cartDetail[id].quanty = userquanty;
        this.cartDetail[id].price = this.cartDetail[id].quanty * this.cartDetail[id].item.cost_product;
        this.totalPrice += this.cartDetail[id].price;
        
    }

    this.renderCart = function() {
        let arr = [];
        for(let _id in this.cartDetail){
            arr.push(this.cartDetail[_id])
        }
        return arr;
    }
}

