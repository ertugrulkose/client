import { Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";
import { useCartStore } from "../store/cartStore"; // ✅ Düzeltilmiş import
import { useNavigate } from "react-router-dom";


const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/product/${product.id}`)}
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: 3,
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 6,
        },
        cursor: "pointer",
      }}
    >
      <CardMedia component="img" height="200" image={product.imageUrl} alt={product.name} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h6" sx={{ mt: 1, fontWeight: "bold", color: "primary" }}>
          {product.price} TL
        </Typography>
      </CardContent>
      <Box sx={{ p: 2, textAlign: "center" }}
        onClick={(e) => e.stopPropagation()} // Card'ın onClick'ini engelliyoruz
      >
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => addToCart(product)}
        >
          Sepete Ekle
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard;
