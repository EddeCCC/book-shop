import { Component, computed, inject } from '@angular/core';
import { OrderService } from './orders.service';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-orders',
  imports: [MatCardModule, TranslatePipe],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders {
  private orderService = inject(OrderService);

  finishedOrders = computed(() => this.orderService.orders());
}
