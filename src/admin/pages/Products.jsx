import React, { useEffect, useState } from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Typography, CircularProgress, Button, Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, IconButton, Select, MenuItem, FormControl, InputLabel, ImageList, ImageListItem
} from '@mui/material';

import { Edit, Delete, AddAPhoto, Close, Add, AddToPhotos } from '@mui/icons-material';

import { getPagedProducts, updateProduct, deleteProduct } from '../../api/productApi';
import useCategoryStore from '../../store/categoryStore'; // ✅ kategorileri çekmek için

const Products = () => {
    const { fetchCategories, allCategories } = useCategoryStore();

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [openAddDialog, setOpenAddDialog] = useState(false);

    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        stock: '',
        categoryId: '',
        thumbnail: null,
        images: []
    });

    const [editProduct, setEditProduct] = useState(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);

    const [deleteTarget, setDeleteTarget] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const pageSize = 10;

    const fetchProducts = async (pageNumber) => {
        try {
            setLoading(true);
            const data = await getPagedProducts(pageNumber, pageSize);
            setProducts(data.data.items || []);
            setTotalCount(data.data.totalCount || 0);
            setTotalPages(Math.max(1, Math.ceil((data.data.totalCount || 0) / pageSize)));
            setCurrentPage(pageNumber);
            setError(null);
        } catch (error) {
            console.error('❌ Ürünler alınırken hata oluştu:', error);
            setError('Ürünler yüklenemedi.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchProducts(1);
    }, []);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            fetchProducts(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            fetchProducts(currentPage + 1);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setNewProduct((prev) => ({
                ...prev,
                thumbnail: e.target.files[0]
            }));
        }
    };

    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setNewProduct((prev) => ({
            ...prev,
            images: [...prev.images, ...files]
        }));
    };

    const removeThumbnail = () => {
        setNewProduct((prev) => ({
            ...prev,
            thumbnail: null
        }));
    };

    const removeImage = (index) => {
        setNewProduct((prev) => ({
            ...prev,
            images: prev.images.filter((_, idx) => idx !== index)
        }));
    };

    const handleAddProduct = async () => {
        if (!newProduct.name || newProduct.price <= 0 || newProduct.stock < 0 || !newProduct.categoryId) {
            alert("Tüm bilgileri doldurun!");
            return;
        }

        console.log('Eklenecek Ürün:', newProduct);

        alert('✅ Ürün ekleme isteği hazırlandı. (Backend entegrasyonu yapılacak)');
        setOpenAddDialog(false);

        // Not: Burada backend'e FormData ile gönderim yapacağız ileride.
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box textAlign="center" color="red" mt={4}>
                <Typography variant="h6">{error}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" mb={3}>
                Ürün Listesi
            </Typography>

            <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={() => setOpenAddDialog(true)}
                sx={{ mb: 2 }}
            >
                Yeni Ürün Ekle
            </Button>

            {products.length === 0 ? (
                <Typography>Ürün bulunamadı.</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Ürün Adı</b></TableCell>
                                <TableCell><b>Fiyat</b></TableCell>
                                <TableCell><b>Stok</b></TableCell>
                                <TableCell><b>Kategori</b></TableCell>
                                <TableCell align="right"><b>İşlemler</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                    <TableCell>{product.categoryName}</TableCell>
                                    <TableCell align="right">
                                        <IconButton color="primary" size="small">
                                            <Edit fontSize="small" />
                                        </IconButton>
                                        <IconButton color="error" size="small">
                                            <Delete fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Ürün Ekleme Dialogu */}
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Yeni Ürün Ekle</DialogTitle>
                <DialogContent dividers>
                    <TextField
                        fullWidth
                        label="Ürün Adı"
                        margin="dense"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        label="Fiyat"
                        type="number"
                        margin="dense"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        label="Stok"
                        type="number"
                        margin="dense"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Kategori</InputLabel>
                        <Select
                            value={newProduct.categoryId}
                            onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
                            label="Kategori"
                        >
                            {allCategories.map((cat) => (
                                <MenuItem key={cat.id} value={cat.id}>
                                    {cat.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Thumbnail seçimi */}
                    <Box mt={2}>
                        <Button
                            variant="outlined"
                            fullWidth
                            component="label"
                            startIcon={<AddAPhoto />}
                        >
                            Thumbnail Seç
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </Button>

                        {newProduct.thumbnail && (
                            <Box mt={1} position="relative" display="inline-block">
                                <img
                                    src={URL.createObjectURL(newProduct.thumbnail)}
                                    alt="Thumbnail Preview"
                                    style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }}
                                    onClick={() => window.open(URL.createObjectURL(newProduct.thumbnail))}
                                />
                                <IconButton
                                    size="small"
                                    color="error"
                                    onClick={removeThumbnail}
                                    sx={{
                                        position: 'absolute',
                                        top: 2,
                                        right: 2,
                                        //backgroundColor: 'rgba(255, 0, 0, 0.5)', // 🔥 şeffaf siyah arka plan
                                        borderRadius: '50%',
                                        width: 20,
                                        height: 20,
                                        padding: 0,
                                        '&:hover': {
                                            backgroundColor: 'rgba(244, 145, 145, 0.7)' // 🔥 hover olduğunda biraz daha koyu olsun
                                        }
                                    }}
                                >
                                    <Close sx={{ fontSize: 16, color: 'white' }} />
                                </IconButton>
                            </Box>
                        )}

                    </Box>

                    {/* Çoklu Fotoğraf seçimi */}
                    <Box mt={2}>
                        <Button
                            variant="outlined"
                            fullWidth
                            component="label"
                            startIcon={<AddToPhotos />}
                        >
                            Ürün Fotoğrafları Seç
                            <input
                                type="file"
                                hidden
                                multiple
                                accept="image/*"
                                onChange={handleImagesChange}
                            />
                        </Button>

                        {newProduct.images.length > 0 && (
                            <ImageList cols={4} gap={8} sx={{ mt: 1 }}>
                                {newProduct.images.map((img, idx) => (
                                    <ImageListItem key={idx}>
                                        <img
                                            src={URL.createObjectURL(img)}
                                            alt={`Foto ${idx}`}
                                            style={{ borderRadius: 8, cursor: 'pointer' }}
                                            onClick={() => window.open(URL.createObjectURL(img))}
                                        />
                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() => removeImage(idx)}
                                            sx={{ position: 'absolute', top: 0, right: 0 }}
                                        >
                                            <Close fontSize="small" />
                                        </IconButton>
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        )}
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)}>İptal</Button>
                    <Button variant="contained" color="primary" onClick={handleAddProduct}>
                        Ürünü Ekle
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Products;
