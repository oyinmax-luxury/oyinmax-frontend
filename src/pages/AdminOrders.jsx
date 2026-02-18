import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";
import toast from "react-hot-toast";
import { HiClipboardList, HiArrowLeft } from "react-icons/hi"; // 1. IMPORT ICON
import { Link } from "react-router-dom"; // 2. IMPORT LINK

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/whatsapp-orders/orders");
      setOrders(data);
    } catch (err) {
      setError("Failed to load orders");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.put(`/whatsapp-orders/orders/${orderId}`, { status: newStatus });
      toast.success("Order status updated");
      fetchOrders(); // Refresh data
    } catch (err) {
      toast.error("Failed to update status");
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-brand-ivory py-24 px-4 text-brand-dark">
      <div className="max-w-7xl mx-auto">


        <Link to="/admin/dashboard" className="flex items-center gap-2 text-brand-muted hover:text-brand-gold mb-8 font-body transition">
          <HiArrowLeft /> Back to Dashboard
        </Link>

        <h1 className="text-4xl font-light font-luxury mb-10">Manage Orders</h1>

        <div className="bg-white shadow-luxury rounded-xl overflow-x-auto border border-brand-muted/10">
          <table className="w-full text-sm text-left min-w-[1000px]">
            <thead className="text-xs text-brand-muted uppercase bg-brand-ivory/50">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-brand-ivory/30">
                  <td className="px-6 py-4 font-semibold">{order.orderId}</td>
                  <td className="px-6 py-4">
                    {order.customerName}<br />
                    <span className="text-xs text-brand-muted">{order.email}</span>
                  </td>
                  <td className="px-6 py-4">
                    {order.orderItems.map(item => (
                        <div key={item._id}>{item.name} x {item.quantity}</div>
                    ))}
                  </td>
                  <td className="px-6 py-4 font-semibold">£{order.totalPrice.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs 
                        ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                          order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                          'bg-brand-gold/10 text-brand-brown'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="bg-brand-ivory p-2 rounded-lg text-xs"
                    >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}