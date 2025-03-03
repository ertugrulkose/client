import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ProductCard from "../components/ProductCard";
import products from "../data/product";
import HeroSlider from "../components/HeroSlider";

const ProductList = () => {
  return (
    <Box sx={{ marginTop: "100px" }}>
      {/* Slider en üstte */}
      <HeroSlider />

      {/* Altında ürün listesi */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          mt: 4, // Slider ile ürünler arasında mesafe
        }}
      >
        {products.map((product) => (
          <Box key={product.id} sx={{ width: "300px" }}>
            <ProductCard product={product} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProductList;
