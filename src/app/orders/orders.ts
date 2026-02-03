import { Component, computed, inject } from '@angular/core';
import { OrderService } from './order.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-orders',
  imports: [MatCardModule],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders {
  private orderService = inject(OrderService);

  finishedOrders = computed(() => this.orderService.orders());
}
