import React, { useEffect, useState } from 'react';
import {
    Box, Button, TextField, Typography, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import { addProduct } from '../../api/productApi'; // ✅ doğru import
import useCategoryStore from '../../store/categoryStore'; // ✅ eksik importu ekledim

const AddProduct = () => {
    const { fetchCategories, categories } = useCategoryStore();

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        stock: '',
        categoryId: ''
    });

    useEffect(() => {
        fetchCategories(); // Sayfa açılınca kategorileri çekelim
    }, [fetchCategories]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFormData((prev) => ({
                ...prev,
                image: e.target.files[0]
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addProduct(formData);
            alert('✅ Ürün başarıyla eklendi!');
            // Formu resetle
            setFormData({
                name: '',
                price: '',
                stock: '',
                categoryId: '',
                image: null
            });
        } catch (error) {
            console.error('Ürün eklerken hata:', error);
            alert('❌ Ürün eklenirken bir hata oluştu.');
        }
    };

    return (
        <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
            <Typography variant="h5" mb={3}>
                Yeni Ürün Ekle
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Ürün Adı"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    margin="normal"
                    required
                />

                <TextField
                    fullWidth
                    label="Fiyat"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    margin="normal"
                    required
                />

                <TextField
                    fullWidth
                    label="Stok Miktarı"
                    name="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleChange}
                    margin="normal"
                    required
                />

                <FormControl fullWidth margin="normal" required>
                    <InputLabel id="category-label">Kategori</InputLabel>
                    <Select
                        labelId="category-label"
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                    >
                        {categories.map((cat) => (
                            <MenuItem key={cat.id} value={cat.id}>
                                {cat.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Box mt={2}>
                    <Button
                        variant="outlined"
                        component="label"
                        fullWidth
                    >
                        Ürün Görseli Seç
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </Button>

                    {formData.image && (
                        <Typography variant="body2" mt={1}>
                            Seçilen dosya: {formData.image.name}
                        </Typography>
                    )}
                </Box>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 3 }}
                >
                    Ürünü Ekle
                </Button>
            </form>
        </Box>
    );
};

export default AddProduct;
