import { useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import products from "../data/product";
import { useEffect } from "react";
import { useCartStore } from "../store/cartStore";
import AddToCartHandler from "../components/AddToCartButton";

const ProductDetail = () => {
    const { id } = useParams(); // URL'den gelen ID
    const addToCart = useCartStore((state) => state.addToCart);
    const product = products.find((p) => p.id === parseInt(id)); // Ürünü bul

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!product) {
        return <Typography variant="h5">Ürün bulunamadı!</Typography>;
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
            {/* Responsive Resim */}
            <Box
                component="img"
                src={product.imageUrl}
                alt={product.name}
                sx={{
                    width: "100%",
                    //   maxWidth: "330px",  // Masaüstü ekranda en fazla 400px genişlik
                    maxWidth: { xs: "210px", sm: "300px", md: "350px", lg: "400px", xl: "450px" }, // Responsive
                    height: "auto",     // Oranını korusun
                    objectFit: "contain", // Taşmasın
                    borderRadius: "10px",
                }}
            />
            <Typography variant="h4" sx={{ mt: 2 }}>
                {product.name}
            </Typography>
            <Typography variant="h6" sx={{ mt: 1 }}>
                {product.price} TL
            </Typography>
            <Typography
                variant="body1"
                sx={{ mt: 2, maxWidth: "600px", textAlign: "center", paddingX: 2 }}
            >
                {product.description}
            </Typography>
            <AddToCartHandler product={product}>
                {(handleAddToCart) => (
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3 }}
                        onClick={handleAddToCart} // Tıklanınca sepete ekle + snackbar
                    >
                        Sepete Ekle
                    </Button>
                )}
            </AddToCartHandler>
        </Box>
    );
};
export default ProductDetail;
