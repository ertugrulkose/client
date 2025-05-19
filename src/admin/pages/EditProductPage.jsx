import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box, Typography, TextField, Button, CircularProgress, ImageList, ImageListItem
} from "@mui/material";
import { getProductById, updateProduct } from "../../api/productApi";

const EditProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("❌ Ürün detay alınamadı:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return <Typography mt={4} textAlign="center">Ürün bulunamadı.</Typography>;
  }

  const handleUpdate = async () => {
  try {

    await updateProduct(product.id, {
      name: product.name,
      price: Number(product.price),
      stock: Number(product.stock),
      categoryId: product.categoryId // varsa
    });

    alert("✅ Ürün başarıyla güncellendi!");
    // İstersen burada navigate ile listeye geri dönebilirsin
  } catch (err) {
    alert("❌ Ürün güncellenemedi.");
  }
};

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Ürün Düzenle
      </Typography>

      <TextField
        label="Ürün Adı"
        fullWidth
        margin="normal"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />

      <TextField
        label="Fiyat"
        type="number"
        fullWidth
        margin="normal"
        value={product.price}
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
      />

      <TextField
        label="Stok"
        type="number"
        fullWidth
        margin="normal"
        value={product.stock}
        onChange={(e) => setProduct({ ...product, stock: e.target.value })}
      />

      {product.thumbnailPath && (
        <Box mt={2}>
          <Typography variant="subtitle1">Thumbnail:</Typography>
          <img
            src={`https://localhost:7242${product.thumbnailPath}`}
            alt="Thumbnail"
            style={{ width: "100%", borderRadius: 8 }}
          />
        </Box>
      )}

      {product.imagePaths?.length > 0 && (
        <Box mt={2}>
          <Typography variant="subtitle1">Ürün Fotoğrafları:</Typography>
          <ImageList cols={3} gap={8}>
            {product.imagePaths.map((img, idx) => (
              <ImageListItem key={idx}>
                <img src={`https://localhost:7242${img}`} alt={`Ürün Foto ${idx}`} />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      )}

      <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleUpdate}>
        Güncelle
      </Button>
    </Box>
  );
};

export default EditProductPage;
