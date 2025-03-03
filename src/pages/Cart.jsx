// src/pages/Cart.jsx
import { Typography, List, ListItem, Button, Box } from "@mui/material";
import { useCartStore } from "../store/cartStore";
import Layout from "../Layout";
import { useEffect } from "react";
import PaymentSummary from "../components/PaymentSummary";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCartStore();

  // TODO: Sepet sayfasına gidince sayfayı yukarıya scroll et
  // TODO: Cart.jsx ve ProductDetail.jsx sayfalarında aşağı scroll kalması düzeltilecek..

  useEffect(() => {
          window.scrollTo(0, 0);
      }, []);

  // Kargo Teslimat tarihini hesaplayan fonksiyon
  const calculateDeliveryDate = (daysToAdd) => {
    let date = new Date();
    let addedDays = 0;

    while (addedDays < daysToAdd) {
      date.setDate(date.getDate() + 1);
      const dayOfWeek = date.getDay(); // 0 = Pazar, 6 = Cumartesi

      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        addedDays++;
      }
    }

    return date.toLocaleDateString("tr-TR", { day: "2-digit", month: "long" });
  };
  const deliveryStart = calculateDeliveryDate(2);
  const deliveryEnd = calculateDeliveryDate(4);

  return (
    <Layout>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Sepet
      </Typography>
      <List sx={{ width: "100%", maxWidth: 500, margin: "0 auto" }}>
        {cart.map((item, index) => (
          <ListItem
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid #ccc",
              mb: 1,
            }}
          >
            <Box>{item.name} - {item.price} TL</Box>
            <Box sx={{ mt: 1, fontSize: "9px", color: "gray" }}>
              Tahmini Teslimat: {deliveryStart} - {deliveryEnd}
            </Box>
            <Button variant="outlined" color="error" onClick={() => removeFromCart(item.id)}>
              Sil
            </Button>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={clearCart}>
        Sepeti Boşalt
      </Button>
      
      <PaymentSummary />

    </Layout>
  );
};

export default Cart;
