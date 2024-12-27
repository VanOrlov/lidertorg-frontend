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
// Типизация для категорий и хлебных крошек
export type Category = {
    id: number;
    name: string;
    slug: string;
    parent?: {
        id: number;
        name: string;
        slug: string;
    };
};
//Типизация дочерних категорий
export type Child = {
    id: number;
    name: string;
    image: { url: string };
    slug: string;
};
//Типизация хлебных крошек
export type Breadcrumb = {
    name: string;
    url: string | null;
};

export type Message = {
    id: number,
    type: 'success' | 'error' | 'warning' | 'info',
    content: string,
    duration?: number
}