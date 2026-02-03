export interface Order {
    id: number;
    bookOrder: BookOrder;
    location: OrderLocation;
}

export interface BookOrder {
    bookId: string;
    title: string;
}

export interface OrderLocation {
    address: string;
    city: string;
}