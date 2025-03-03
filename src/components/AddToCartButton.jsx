// src/components/AddToCartHandler.jsx

import { useState } from "react";
import { Snackbar, Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

const AddToCartHandler = ({ product, children }) => {
  /**
   * Bu bileşen sepete ekleme + snackbar logic'ini yönetir.
   * "children(handleAddToCart)" ile buton tasarımını parent'a bırakır.
   */

  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);

  // Snackbar aç/kapa state'i
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleAddToCart = (e) => {
    // Card'da onClick varsa engellemek için
    e?.stopPropagation?.();

    // Ürünü sepete ekle
    addToCart(product);
    // Snackbar aç
    setOpenSnackbar(true);
  };

  // Snackbar'ı kapatma fonksiyonu
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // "Sepeti Görüntüle" butonuna basınca sepet sayfasına git
  const handleViewCart = () => {
    navigate("/cart");
    setOpenSnackbar(false);
  };

  return (
    <>
      {/*
        "children" fonksiyon şeklinde geliyor. Parent bileşen,
        butonun tasarımını dilediği gibi yapıp, onClick={handleAddToCart} ekliyor.
      */}
      {children(handleAddToCart)}

      {/* Material UI Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        {/* Alert içinde "Sepeti Görüntüle" butonu */}
        <Alert
          severity="success"
          variant="filled"
          onClose={handleCloseSnackbar}
          action={
            <Button color="inherit" size="small" onClick={handleViewCart}>
              Sepeti Görüntüle
            </Button>
          }
        >
          Sepete Eklendi!
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddToCartHandler;
