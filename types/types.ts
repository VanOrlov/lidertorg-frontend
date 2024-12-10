export type CartItem = { //Для хранения товаров в корзине, реализованную через pinia
    id: number;
    name: string;
    price: number;
    img: string;
    quantity: number; //Кол-во товара в корзине
};

export type Product = {
    id: number;
    title: string;
    price: number;
    main_image: {
        url: string
    };
    
}