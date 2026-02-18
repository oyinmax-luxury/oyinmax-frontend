import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HiTrash, HiOutlineShoppingBag, HiArrowLeft } from "react-icons/hi";
import { useCart } from "../context/CartContext"; // Assuming your context path
import toast from "react-hot-toast";
import api from "../services/api";

export default function Cart() {
  const { state, dispatch } = useCart();
  const { cartItems } = state;
  const navigate = useNavigate();

  // Checkout Form State
  const [shippingData, setShippingData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleInputChange = (e) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };


 const handleCheckout = async (e) => {
  e.preventDefault();

  if (cartItems.length === 0) {
    toast.error("Your cart is empty");
    return;
  }

  // 1. Prepare data for the API
  const orderData = {
    customerName: shippingData.name,
    email: shippingData.email,
    shippingAddress: shippingData.address,
    orderItems: cartItems.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      product: item._id
    })),
    totalPrice: totalPrice
  };

  try {
    // 2. Call your new backend endpoint
    await api.post("/whatsapp-orders", orderData);
    
    // 3. Proceed to WhatsApp as before
    const itemsMessage = cartItems
      .map(
        (item) =>
          `* ${item.name} (${item.quantity} x £${item.price.toLocaleString()})`
      )
      .join("\n");

    const message = `
        *New Order from OYINMAX*
        -------------------------
        *Customer Details:*
        Name: ${shippingData.name}
        Email: ${shippingData.email}
        Address: ${shippingData.address}
        -------------------------
        *Order Details:*
        ${itemsMessage}
        -------------------------
        *Total: £${totalPrice.toLocaleString()}*
        `;

    const whatsappNumber = "447756120178";
    const encodedMessage = encodeURIComponent(message.trim());
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
    
    // Clear cart
    dispatch({ type: "CLEAR_CART" });

  } catch (error) {
    console.error(error);
    toast.error("Could not place order. Please try again.");
  }
};

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
    toast.success("Item removed from cart");
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

//   const handleCheckout = (e) => {
//     e.preventDefault();

//     if (cartItems.length === 0) {
//       toast.error("Your cart is empty");
//       return;
//     }

//     // Format cart items for the message
//     const itemsMessage = cartItems
//       .map(
//         (item) =>
//           `* ${item.name} (${item.quantity} x £${item.price.toLocaleString()})`
//       )
//       .join("\n");

//     // Construct the WhatsApp message
//     const message = `
// *New Order from OYINMAX*
// -------------------------
// *Customer Details:*
// Name: ${shippingData.name}
// Email: ${shippingData.email}
// Address: ${shippingData.address}
// -------------------------
// *Order Details:*
// ${itemsMessage}
// -------------------------
// *Total: £${totalPrice.toLocaleString()}*
// `;

//     // WhatsApp Number (include country code, remove +)
//     const whatsappNumber = "447756120178"; 

//     // Encode the message for the URL
//     const encodedMessage = encodeURIComponent(message.trim());
    
//     // WhatsApp URL structure - works for both iOS and Android
//     const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

//     // Redirect to WhatsApp
//     window.open(whatsappUrl, "_blank");
    
//     // Optional: Clear cart after redirect
//     // dispatch({ type: "CLEAR_CART" });
//     navigate("/");
//   };

  return (
    <div className="min-h-screen bg-brand-ivory py-24 px-4 text-brand-dark">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2 text-brand-muted hover:text-brand-gold mb-8 font-body">
          <HiArrowLeft /> Back to Shop
        </Link>
        
        <h1 className="text-4xl font-light font-luxury mb-12">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-luxury">
            <HiOutlineShoppingBag className="mx-auto text-6xl text-brand-muted mb-4" />
            <p className="text-brand-muted font-body">Your cart is empty.</p>
            <Link to="/" className="text-brand-gold font-semibold mt-4 block hover:underline">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 rounded-xl shadow-luxury flex items-center gap-6 border border-brand-muted/10"
                >
                  <img src={item.images[0].url} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                  <div className="flex-grow">
                    <h3 className="text-lg font-body text-brand-dark">{item.name}</h3>
                    <p className="text-brand-gold font-semibold">£{item.price.toLocaleString()}</p>
                    <p className="text-sm text-brand-muted font-body">Qty: {item.quantity}</p>
                  </div>
                  <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:text-red-700">
                    <HiTrash size={20} />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Checkout Form */}
            <div className="bg-white p-8 rounded-2xl shadow-luxury border border-brand-muted/10 h-fit">
              <h2 className="text-2xl font-light font-luxury mb-6">Checkout</h2>
              
              <div className="flex justify-between font-body text-lg border-b border-brand-muted/20 pb-4 mb-6">
                <span>Total</span>
                <span className="font-semibold text-brand-gold">£{totalPrice.toLocaleString()}</span>
              </div>

              <form onSubmit={handleCheckout} className="space-y-4 font-body text-sm">
                <input type="text" name="name" placeholder="Full Name" onChange={handleInputChange} required className="w-full p-3 border rounded-lg" />
                <input type="email" name="email" placeholder="Email Address" onChange={handleInputChange} required className="w-full p-3 border rounded-lg" />
                <textarea name="address" placeholder="Shipping Address" onChange={handleInputChange} required className="w-full p-3 border rounded-lg" rows="3" />
                
                <button
                  type="submit"
                  className="w-full bg-brand-dark text-white py-3 rounded-lg hover:bg-brand-brown transition duration-300 tracking-wider font-semibold mt-6"
                >
                  CHECKOUT VIA WHATSAPP
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}