import { useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import products from "../data/product";

const ProductDetail = () => {
  const { id } = useParams(); // URL'den gelen ID
  const product = products.find((p) => p.id === parseInt(id)); // Ürünü bul

  if (!product) {
    return <Typography variant="h5">Ürün bulunamadı!</Typography>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
      <img src={product.imageUrl} 
      alt={product.name} style={{ width: "400px", borderRadius: "10px" }} />
      <Typography variant="h4" sx={{ mt: 2 }}>{product.name}</Typography>
      <Typography variant="h6" sx={{ mt: 1 }}>{product.price} TL</Typography>
      <Typography variant="body1" sx={{ mt: 2, maxWidth: "600px", textAlign: "center" }}>
        {product.description}
      </Typography>
      <Button variant="contained" color="primary" sx={{ mt: 3 }}>
        Sepete Ekle
      </Button>
    </Box>
  );
};

export default ProductDetail;
