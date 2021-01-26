import { Product } from './product';

export class ShoppingCartItem {
    key!: string;
    title!: string;
    imageUrl!: string;
    price!: number;
    quantity!: number;

    constructor(init?: Partial<ShoppingCartItem>){
        Object.assign(this, init);
    }
    // constructor(public product: Product, public quantity: number ){}
    // tslint:disable-next-line: typedef
    get totalPrice(){ return this.price * this.quantity; }
}
