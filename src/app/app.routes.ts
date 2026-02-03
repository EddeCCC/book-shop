import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Books } from './books/books';
import { BookDetails } from './books/book-details/book-details';
import { Login } from './login/login';
import { Checkout } from './checkout/checkout';
import { Orders } from './orders/orders';

export const routes: Routes = [
    {
        path: '',
        title: 'Bookly',
        component: Home
    },
    {
        path: 'books',
        title: 'Book Collection',
        component: Books
    },
    {
        path: 'books/:id',
        title: 'Book Details',
        component: BookDetails
    },
    {
        path: 'login',
        title: 'Login',
        component: Login
    },
    {
        path: 'checkout',
        title: 'Checkout',
        component: Checkout
    },
    {
        path: 'orders',
        title: 'Orders',
        component: Orders
    }
];
