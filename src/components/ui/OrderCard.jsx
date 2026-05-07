import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';

function OrderCard({ order, children }) {
  const statusClass = 'status-' + (order.status || 'pending').toLowerCase();

  const formattedDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'N/A';

  return (
    <div className="order-card">
      <div className="order-card-header">
        <div>
          <span className="order-card-id">{order.id}</span>
          <span className="order-card-date"> — {formattedDate}</span>
        </div>
        <span className={`status-badge ${statusClass}`}>{order.status}</span>
      </div>

      <div className="order-card-info">
        <div>
          <div className="info-label">Customer</div>
          <div className="info-value">{order.customerName}</div>
        </div>
        <div>
          <div className="info-label">Email</div>
          <div className="info-value">{order.email}</div>
        </div>
        <div>
          <div className="info-label">Address</div>
          <div className="info-value">{order.address}</div>
        </div>
      </div>

      <div className="order-items-list">
        <h4>Items</h4>
        {order.items.map((item) => (
          <div className="order-item-row" key={item.productId}>
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>{formatCurrency(item.price * item.quantity)}</span>
          </div>
        ))}
        <div className="order-total">
          <span>Total</span>
          <span>{formatCurrency(order.total)}</span>
        </div>
      </div>

      {children}
    </div>
  );
}

export default OrderCard;
