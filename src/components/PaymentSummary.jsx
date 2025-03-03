import React, { useState } from "react";
import { Box, Typography, Collapse, IconButton, Button, useMediaQuery, useTheme } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useCartStore } from "../store/cartStore";

const PaymentSummary = () => {
  const { cart, clearCart } = useCartStore();
  
  // Ürünlerin toplam fiyatını hesapla
  const productTotal = cart.reduce((acc, item) => acc + item.price, 0);
  const shippingCost = 49.99;
  const shippingDiscount = -49.99;
  const totalPrice = productTotal + shippingCost + shippingDiscount;

  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme(); // Material-UI temasını al

  return (
    <Box
      sx={{
        position: isMobile ? "fixed" : "absolute",
        bottom: isMobile ? 0 : "auto",
        right: isMobile ? 0 : 20,
        top: isMobile ? "auto" : 100,
        width: isMobile ? "100%" : 260,
        borderTop: `1px solid ${theme.palette.divider}`, // Tema rengine göre otomatik
        border: isMobile ? "none" : `1px solid ${theme.palette.divider}`,
        borderRadius: isMobile ? 0 : 2,
        backgroundColor: theme.palette.background.paper, // Tema arka planına uyumlu
        color: theme.palette.text.primary, // Tema yazı rengine uyumlu
        padding: 2,
        boxShadow: 3,
        zIndex: 1000,
      }}
    >
      {/* Ödenecek Tutar + Aç/Kapa Butonu */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography fontSize={14} color="inherit">
          Ödenecek Tutar: <strong>{totalPrice.toFixed(2)} TL</strong>
        </Typography>
        <IconButton size="small" onClick={() => setOpen(!open)}>
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      {/* Açılır/Kapanır Kısım */}
      <Collapse in={open}>
        <Box sx={{ padding: "10px 0", borderTop: `1px solid ${theme.palette.divider}` }}>
          <Typography fontSize={14} display="flex" justifyContent="space-between">
            Ürün Toplamı <strong>{productTotal.toFixed(2)} TL</strong>
          </Typography>
          <Typography fontSize={14} display="flex" justifyContent="space-between">
            Kargo <strong>{shippingCost.toFixed(2)} TL</strong>
          </Typography>
          <Typography fontSize={14} display="flex" justifyContent="space-between">
            Kargo Bedava <strong>{shippingDiscount.toFixed(2)} TL</strong>
          </Typography>
          <Typography
            fontSize={14}
            fontWeight="bold"
            display="flex"
            justifyContent="space-between"
            borderTop={`1px solid ${theme.palette.divider}`}
            mt={1}
            pt={1}
          >
            Toplam (KDV Dahil) <strong>{totalPrice.toFixed(2)} TL</strong>
          </Typography>
        </Box>
      </Collapse>

      {/* Satın Al Butonu - Kutunun İçinde */}
      <Button
        color="secondary"
        variant="contained"
        sx={{
          width: "100%",
          mt: 2,
          borderRadius: isMobile ? 0 : 2,
          height: 40,
        }}
        onClick={clearCart}
      >
        Satın Al
      </Button>
    </Box>
  );
};

export default PaymentSummary;
