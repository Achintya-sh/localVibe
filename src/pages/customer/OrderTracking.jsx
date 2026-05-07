import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { OrderContext } from '../../context/OrderContext';
import OrderCard from '../../components/ui/OrderCard';

function OrderTracking() {
  const { id: urlId } = useParams();
  const { orders } = useContext(OrderContext);

  const [searchValue, setSearchValue] = useState(urlId || '');
  const [lookupId, setLookupId] = useState(urlId || '');

  const foundOrder = orders.find((order) => order.id === lookupId);

  function handleSearch(e) {
    e.preventDefault();
    setLookupId(searchValue.trim());
  }

  return (
    <div className="main-content">
      <div className="page-header">
        <h1>Track Your Order</h1>
        <p>Enter your Order ID to see its current status.</p>
      </div>

      <div className="order-tracking-page">
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            id="orderSearch"
            type="text"
            placeholder="e.g. ORD-1234"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button type="submit" className="btn-primary">
            Search
          </button>
        </form>

        {lookupId && !foundOrder && (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h2>Order not found</h2>
            <p>We couldn't find an order with ID "{lookupId}". Please check and try again.</p>
          </div>
        )}

        {foundOrder && <OrderCard order={foundOrder} />}
      </div>
    </div>
  );
}

export default OrderTracking;
