
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function MorrellsCateringApp() {
  const [order, setOrder] = useState({
    name: "",
    size: "",
    spice: "Regular",
    pickupTime: "",
    notes: ""
  });

  const sizes = [
    { id: 1, label: "Mini (16 oz) – $10", value: "Mini", price: 10 },
    { id: 2, label: "Small (24 oz) – $17", value: "Small", price: 17 },
    { id: 3, label: "Medium (40 oz) – $25", value: "Medium", price: 25 },
    { id: 4, label: "Large (72 oz) – $33", value: "Large", price: 33 },
    { id: 5, label: "Party Tray (96 oz) – $50", value: "Party", price: 50 }
  ];

  const spices = ["Regular", "Mild", "Spicy"];

  const getTax = (price) => price * 0.07;
  const getDiscount = (price) => (price >= 50 ? price * 0.2 : 0);

  const calculateTotal = () => {
    const selectedSize = sizes.find((s) => s.label === order.size);
    if (!selectedSize) return 0;
    const price = selectedSize.price;
    const tax = getTax(price);
    const discount = getDiscount(price);
    return (price + tax - discount).toFixed(2);
  };

  const createSMSLink = (phone, message) => {
    return `sms:${phone}?body=${encodeURIComponent(message)}`;
  };

  const handleSubmit = () => {
    const total = calculateTotal();
    const message = `New Conch Salad Order:\nName: ${order.name}\nSize: ${order.size}\nSpice: ${order.spice}\nPickup: ${order.pickupTime}\nNotes: ${order.notes}\nTotal (with tax/discount): $${total}`;
    const phones = ["9548650773", "6789494355"];
    phones.forEach(phone => {
      window.open(createSMSLink(phone, message));
    });
  };

  return (
    <div className="p-4 space-y-4 max-w-xl mx-auto">
      <Card>
        <CardContent className="space-y-4">
          <h1 className="text-2xl font-bold text-center">Morrell’s Catering Orders</h1>
          <p className="text-sm text-center">Fresh, Flavorful, and Made to Order – Conch Salad Pre-Orders Now Open!</p>

          <Input
            placeholder="Your Name"
            value={order.name}
            onChange={(e) => setOrder({ ...order, name: e.target.value })}
          />

          <select
            className="w-full p-2 border rounded"
            value={order.size}
            onChange={(e) => setOrder({ ...order, size: e.target.value })}
          >
            <option value="">Select Size</option>
            {sizes.map((s) => (
              <option key={s.id} value={s.label}>{s.label}</option>
            ))}
          </select>

          <select
            className="w-full p-2 border rounded"
            value={order.spice}
            onChange={(e) => setOrder({ ...order, spice: e.target.value })}
          >
            {spices.map((s, index) => (
              <option key={index} value={s}>{s}</option>
            ))}
          </select>

          <Input
            placeholder="Pickup Time (e.g., 4:30 PM)"
            value={order.pickupTime}
            onChange={(e) => setOrder({ ...order, pickupTime: e.target.value })}
          />

          <Input
            placeholder="Additional Notes (optional)"
            value={order.notes}
            onChange={(e) => setOrder({ ...order, notes: e.target.value })}
          />

          <p className="text-center font-semibold">Total (with 7% tax and discounts if applicable): ${calculateTotal()}</p>

          <Button className="w-full" onClick={handleSubmit}>
            Submit Order via Text
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
