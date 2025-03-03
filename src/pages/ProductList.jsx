import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ProductCard from "../components/ProductCard";
import products from "../data/product";

const ProductList = () => {
  return (
    <Container sx={{ marginTop: "100px", display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",      // Ekran daralınca alt satıra geçsin
          gap: "20px",          // Kartlar arası boşluk
          maxWidth: "1200px",   // Sayfanın ortalı bir containerı
          justifyContent: "center",
        }}
      >
        {products.map((product) => (
          <Box
            key={product.id}
            sx={{
              width: "300px",    // Tüm kartların sabit genişliği
              flexGrow: 0,
              flexShrink: 0,
            }}
          >
            <ProductCard product={product} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default ProductList;
