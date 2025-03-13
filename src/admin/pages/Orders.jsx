import React from 'react';

const Orders = () => {
    const orders = [
        {
            id: 1,
            customerName: 'John Doe',
            date: '2023-10-01',
            total: 99.99,
            status: 'Shipped'
        },
        {
            id: 2,
            customerName: 'Jane Smith',
            date: '2023-10-02',
            total: 149.99,
            status: 'Processing'
        },
        {
            id: 3,
            customerName: 'Alice Johnson',
            date: '2023-10-03',
            total: 79.99,
            status: 'Delivered'
        }
    ];

    return (
        <div>
            <h1>Orders</h1>
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer Name</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.customerName}</td>
                            <td>{order.date}</td>
                            <td>${order.total.toFixed(2)}</td>
                            <td>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Orders;