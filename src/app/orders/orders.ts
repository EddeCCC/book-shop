import { Component, computed, inject } from '@angular/core';
import { OrderService } from './order.service';

@Component({
  selector: 'app-orders',
  imports: [],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders {
  private orderService = inject(OrderService);

  finishedOrders = computed(() => this.orderService.orders());
}
