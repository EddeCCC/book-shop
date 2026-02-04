export interface Order {
    id: number;
    bookOrder: BookOrder;
    location: OrderLocation;
}

export interface BookOrder {
    bookId: string;
    title: string;
    price: number;
}

export interface OrderLocation {
    address: string;
    city: string;
}