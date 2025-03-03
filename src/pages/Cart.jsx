// src/pages/Cart.jsx
import { Typography, List, ListItem, Button, Box } from "@mui/material";
import { useCartStore } from "../store/cartStore";
import Layout from "../Layout";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCartStore();

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
            <Button variant="outlined" color="error" onClick={() => removeFromCart(item.id)}>
              Sil
            </Button>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={clearCart}>
        Sepeti Boşalt
      </Button>
    </Layout>
  );
};

export default Cart;
