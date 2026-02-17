import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { state } = useCart();

  const total = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const generateMessage = () => {
    let message = "Hello Oyinmax,%0A%0AI would like to order:%0A";

    state.cartItems.forEach((item) => {
      message += `${item.qty}x ${item.name} - £${item.price}%0A`;
    });

    message += `%0ATotal: £${total}`;

    return message;
  };

  const whatsappNumber = "447000000000"; // UK format without +

  return (
    <div className="min-h-screen bg-brand-ivory px-4 py-24">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-2xl font-light mb-8">
          Checkout
        </h1>

        {state.cartItems.map(item => (
          <div key={item._id} className="flex justify-between mb-4">
            <span>{item.name} x {item.qty}</span>
            <span>£{item.price * item.qty}</span>
          </div>
        ))}

        <div className="border-t pt-6 mt-6 flex justify-between text-lg">
          <span>Total</span>
          <span className="text-brand-gold">£{total}</span>
        </div>

        <a
          href={`https://wa.me/${whatsappNumber}?text=${generateMessage()}`}
          target="_blank"
          className="block mt-10 text-center bg-brand-gold text-black py-4 tracking-wide hover:opacity-90 transition"
        >
          Proceed via WhatsApp
        </a>

      </div>
    </div>
  );
}