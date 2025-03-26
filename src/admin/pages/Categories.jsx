import { useEffect, useState } from "react";
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Typography, Button, MenuItem, Select, IconButton, Dialog, DialogTitle, DialogContent,
    DialogActions, CircularProgress, TextField
} from "@mui/material";
import { Edit, Delete, Add, Save, Close, AccountTree } from "@mui/icons-material";
import useCategoryStore from "../../store/categoryStore"; // ✅ Zustand Store'u içe aktardık


import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';

import { Settings } from '@mui/icons-material';

import axios from "axios"; // zaten vardır muhtemelen



const Categories = () => {
    const { categories, fetchCategories, addCategory, updateCategory, deleteCategory, loading, error } = useCategoryStore(); // Zustand store'u kullan
    const [editCategory, setEditCategory] = useState(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openAddDialog, setOpenAddDialog] = useState(false); // 🆕 Modal kontrolü için state
    const [newCategory, setNewCategory] = useState({ name: "", parentCategoryId: null });

    // const [searchQuery, setSearchQuery] = useState(""); // 🆕 Arama metni için state

    const [openTreeDialog, setOpenTreeDialog] = useState(false); // 🆕 Şema dialog kontrolü

    const [selectedCategory, setSelectedCategory] = useState(null); // Tıklanan kategori
    const [openTreeActions, setOpenTreeActions] = useState(false); // Menü dialog kontrolü

    const [expandedItems, setExpandedItems] = useState([]);

    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' }); // 🆕 Sıralama için state

    const [openSubDialog, setOpenSubDialog] = useState(false);
    const [selectedForSubs, setSelectedForSubs] = useState(null);


    const [filterConfig, setFilterConfig] = useState({
        categoryCode: "",
        name: "",
        parentCategoryId: "",
        subCategoryCount: "",
    });

    // 📌 Sayfa açıldığında API'den kategorileri çek
    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    // 🛑 **Eğer yükleme devam ediyorsa, yükleme göstergesi çıkart**
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                <CircularProgress />
            </Box>
        );
    }

    // 🛑 **Eğer hata varsa, hata mesajını göster**
    if (error) {
        return (
            <Box textAlign="center" color="red">
                <Typography variant="h6">{error}</Typography>
            </Box>
        );
    }

    const categoriesWithCounts = categories.map(cat => ({
        ...cat,
        subCategoryCount: categories.filter(c => c.parentCategoryId === cat.id).length
    }));

    // 🆕 Arama filtresi uygulanmış kategori listesi
    const filteredCategories = categoriesWithCounts.filter(category => {
        return (
            category.categoryCode.toLowerCase().includes(filterConfig.categoryCode.toLowerCase()) &&
            category.name.toLowerCase().includes(filterConfig.name.toLowerCase()) &&
            (
                filterConfig.parentCategoryId === "" ||
                (filterConfig.parentCategoryId === "null" && category.parentCategoryId === null) ||
                String(category.parentCategoryId) === filterConfig.parentCategoryId
            ) &&
            (
                filterConfig.subCategoryCount === "" ||
                (filterConfig.subCategoryCount === "0" && category.subCategoryCount === 0) ||
                (filterConfig.subCategoryCount === "1+" && category.subCategoryCount > 0)
            )
        );
    });

    // ✅ **Yeni Kategori Ekleme**
    const handleAddCategory = async () => {
        if (!newCategory.name) {
            alert("Kategori adı boş olamaz!");
            return;
        }

        try {
            const added = await addCategory(newCategory);
            await fetchCategories(); // ✅ geçici çözümle store'ı kesin güncelle
            setNewCategory({ name: "", parentCategoryId: null });
            setOpenAddDialog(false);

            // ✅ Eklenen kategori bir alt kategori ise, parent'ı açık tut
            if (added?.parentCategoryId) {
                setExpandedItems((prev) => {
                    const parentId = added.parentCategoryId.toString();
                    return prev.includes(parentId) ? prev : [...prev, parentId];
                });
            }

            // ❌ fetchCategories yok artık çünkü Zustand zaten state'i güncelliyor
        } catch (error) {
            console.error("Kategori eklenirken hata oluştu:", error);
        }
    };

    // ✅ **Kategori Düzenleme (Dialog Aç)**
    const handleEditCategory = (category) => {
        setEditCategory({ ...category });
        setOpenEditDialog(true);
    };

    // ✅ **Güncellenmiş Kategoriyi Kaydetme**
    const handleSaveEdit = async () => {
        if (!editCategory.name) {
            alert("Kategori adı boş olamaz!");
            return;
        }
        try {
            await updateCategory(editCategory.id, editCategory);
            setOpenEditDialog(false);
        } catch (error) {
            console.error("Kategori güncellenirken hata oluştu:", error);
        }
    };

    // ✅ **Silme İşlemi için Uyarı Aç**
    const handleDeleteCategory = (category) => {
        setDeleteTarget(category);
        setOpenDeleteDialog(true);
    };

    // ✅ **Kategori Silme Onayı**
    const confirmDeleteCategory = async () => {
        if (!deleteTarget) return;
        try {
            await deleteCategory(deleteTarget.id);
            setOpenDeleteDialog(false);
        } catch (error) {
            console.error("Kategori silinirken hata oluştu:", error);
        }
    };

    const handleTreeItemClick = (category) => {
        setSelectedCategory(category);
        setOpenTreeActions(true);
    };

    const sortedCategories = [...filteredCategories].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        return aValue < bValue
            ? sortConfig.direction === "asc" ? -1 : 1
            : aValue > bValue
                ? sortConfig.direction === "asc" ? 1 : -1
                : 0;
    });

    const handleSort = (key) => {
        setSortConfig((prev) => {
            if (prev.key === key) {
                return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
            }
            return { key, direction: "asc" };
        });
    };



    const renderTreeItems = (parentId = null) => {
        const children = categories.filter(cat => cat.parentCategoryId === parentId);

        return children.map(child => (
            <TreeItem
                key={child.id}
                itemId={child.id.toString()}
                label={
                    <Box display="flex" alignItems="center" justifyContent="space-between" pr={1}>
                        <Typography variant="body2">{child.name}</Typography>
                        <IconButton
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation(); // ✅ alt kategoriyi açmasını engelle
                                handleTreeItemClick(child);
                            }}
                        >
                            <Settings fontSize="small" />
                        </IconButton>
                    </Box>
                }
            >
                {renderTreeItems(child.id)}
            </TreeItem>
        ));
    };


    const handleExcelExport = async () => {
        try {
            await axios.post("https://localhost:7242/api/Test/category", {
                requestedBy: "admin", // isteğe göre
                requestedAt: new Date(),
                exportType: "category"
            });
            alert("Excel export isteği gönderildi ✅");
        } catch (error) {
            console.error("Excel export hatası:", error);
            alert("❌ Export işlemi sırasında hata oluştu");
        }
    };





    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h5" gutterBottom>
                Kategori Yönetimi
            </Typography>

            {/* 🆕 Arama kutusu */}
            {/* <TextField
                label="Kategori Ara"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ marginBottom: 2 }}
            /> */}

            {/* 🆕 Kategori Ekleme Butonu */}
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenAddDialog(true)}
                startIcon={<Add />}
                sx={{ marginBottom: 2 }}
            >
                Yeni Kategori Ekle
            </Button>

            <Button
                variant="outlined"
                color="secondary"
                onClick={() => setOpenTreeDialog(true)}
                startIcon={<AccountTree />}
                sx={{ marginLeft: 2, marginBottom: 2 }}
            >
                Kategori Şeması
            </Button>

            <Button
                variant="outlined"
                color="success"
                sx={{ ml: 2, mb: 2 }}
                onClick={handleExcelExport}
            >
                Excel'e Aktar
            </Button>

            {/* 📌 Kategori Listesi */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        {/* 🔼 Sıralanabilir Başlıklar */}
                        <TableRow>
                            <TableCell onClick={() => handleSort("categoryCode")} sx={{ cursor: "pointer" }}>
                                <b>Kategori Kodu</b> {sortConfig.key === "categoryCode" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                            </TableCell>
                            <TableCell onClick={() => handleSort("name")} sx={{ cursor: "pointer" }}>
                                <b>Kategori Adı</b> {sortConfig.key === "name" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                            </TableCell>
                            <TableCell onClick={() => handleSort("parentCategoryId")} sx={{ cursor: "pointer" }}>
                                <b>Bağlı Olduğu Kategori</b> {sortConfig.key === "parentCategoryId" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                            </TableCell>
                            <TableCell onClick={() => handleSort("subCategoryCount")} sx={{ cursor: "pointer" }}>
                                <b>Alt Kategori Sayısı</b> {sortConfig.key === "subCategoryCount" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                            </TableCell>
                            <TableCell align="right"><b>İşlemler</b></TableCell>
                        </TableRow>

                        {/* 🔍 Filtre Satırı */}
                        <TableRow>
                            <TableCell>
                                <TextField
                                    placeholder="Kodu ara"
                                    value={filterConfig.categoryCode}
                                    onChange={(e) =>
                                        setFilterConfig({ ...filterConfig, categoryCode: e.target.value })
                                    }
                                    variant="standard"
                                    fullWidth
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    placeholder="Adı ara"
                                    value={filterConfig.name}
                                    onChange={(e) =>
                                        setFilterConfig({ ...filterConfig, name: e.target.value })
                                    }
                                    variant="standard"
                                    fullWidth
                                />
                            </TableCell>
                            <TableCell>
                                <Select
                                    value={filterConfig.parentCategoryId}
                                    onChange={(e) =>
                                        setFilterConfig({ ...filterConfig, parentCategoryId: e.target.value })
                                    }
                                    displayEmpty
                                    fullWidth
                                    variant="standard"
                                >
                                    <MenuItem value="">Tümü</MenuItem>
                                    <MenuItem value="null">Ana Kategori</MenuItem>
                                    {categories
                                        .filter((cat) => cat.parentCategoryId === null)
                                        .map((cat) => (
                                            <MenuItem key={cat.id} value={String(cat.id)}>
                                                {cat.name}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </TableCell>
                            <TableCell>
                                <Select
                                    value={filterConfig.subCategoryCount || ""}
                                    onChange={(e) =>
                                        setFilterConfig({ ...filterConfig, subCategoryCount: e.target.value })
                                    }
                                    displayEmpty
                                    fullWidth
                                    variant="standard"
                                >
                                    <MenuItem value="">Tümü</MenuItem>
                                    <MenuItem value="0">Alt kategorisi olmayanlar</MenuItem>
                                    <MenuItem value="1+">Alt kategorisi olanlar</MenuItem>
                                </Select>
                            </TableCell>

                            <TableCell align="right">
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() =>
                                        setFilterConfig({
                                            categoryCode: "",
                                            name: "",
                                            parentCategoryId: "",
                                            subCategoryCount: ""
                                        })
                                    }
                                >
                                    Sıfırla
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {sortedCategories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell>{category.categoryCode}</TableCell>
                                <TableCell>{category.name}</TableCell>
                                <TableCell>
                                    {category.parentCategoryId
                                        ? categories.find((cat) => cat.id === category.parentCategoryId)?.name || "Bilinmiyor"
                                        : "Ana Kategori"}
                                </TableCell>

                                <TableCell
                                    sx={{ cursor: "pointer", color: "primary.main", textDecoration: "underline" }}
                                    onClick={() => {
                                        setSelectedForSubs(category);
                                        setOpenSubDialog(true);
                                    }}
                                >
                                    {category.subCategoryCount}
                                </TableCell>

                                <TableCell align="right">
                                    <IconButton color="primary" onClick={() => handleEditCategory(category)}><Edit /></IconButton>
                                    <IconButton color="error" onClick={() => handleDeleteCategory(category)}><Delete /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* 🆕 Kategori Ekleme Modalı */}
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
                <DialogTitle>Yeni Kategori Ekle</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Kategori Adı"
                        fullWidth
                        margin="dense"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    />
                    <Select
                        fullWidth
                        displayEmpty
                        value={newCategory.parentCategoryId || ""}
                        onChange={(e) => setNewCategory({ ...newCategory, parentCategoryId: e.target.value })}
                    >
                        <MenuItem value="">Ana Kategori</MenuItem>
                        {categories
                            .filter(cat => cat.parentCategoryId === null)
                            .map(cat => (
                                <MenuItem key={cat.id} value={cat.id}>
                                    {cat.name}
                                </MenuItem>
                            ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)} startIcon={<Close />}>
                        İptal
                    </Button>
                    <Button color="primary" onClick={handleAddCategory} startIcon={<Save />}>
                        Ekle
                    </Button>
                </DialogActions>
            </Dialog>

            {/* 📝 Kategori Güncelleme Dialog'u */}
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Kategoriyi Düzenle</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Kategori Adı"
                        fullWidth
                        margin="dense"
                        value={editCategory?.name || ""}
                        onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
                    />
                    <Select
                        fullWidth
                        displayEmpty
                        value={editCategory?.parentCategoryId || ""}
                        onChange={(e) => setEditCategory({ ...editCategory, parentCategoryId: e.target.value })}
                    >
                        <MenuItem value="">Ana Kategori</MenuItem>
                        {categories
                            .filter(cat => cat.parentCategoryId === null)
                            .map(cat => (
                                <MenuItem key={cat.id} value={cat.id}>
                                    {cat.name}
                                </MenuItem>
                            ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)} startIcon={<Close />}>
                        İptal
                    </Button>
                    <Button color="primary" onClick={handleSaveEdit} startIcon={<Save />}>
                        Kaydet
                    </Button>
                </DialogActions>
            </Dialog>

            {/* 🗑️ Silme Dialogu */}
            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle>Kategoriyi Sil</DialogTitle>
                <DialogContent>
                    {deleteTarget && (
                        <Typography>
                            "{deleteTarget.name}" kategorisini silmek istediğinize emin misiniz?
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)} startIcon={<Close />}>
                        İptal
                    </Button>
                    <Button color="error" onClick={confirmDeleteCategory} startIcon={<Delete />}>
                        Sil
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openTreeDialog} onClose={() => setOpenTreeDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Kategori Şeması</DialogTitle>
                <DialogContent dividers>
                    <SimpleTreeView
                        expandedItems={expandedItems}
                        onExpandedItemsChange={(event, nodeIds) => setExpandedItems(nodeIds)}
                    >
                        {renderTreeItems()}
                    </SimpleTreeView>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenTreeDialog(false)} startIcon={<Close />}>
                        Kapat
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openTreeActions} onClose={() => setOpenTreeActions(false)}>
                <DialogTitle>{selectedCategory?.name} - İşlemler</DialogTitle>
                <DialogContent dividers>
                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<Edit />}
                        onClick={() => {
                            setEditCategory(selectedCategory);
                            setOpenEditDialog(true);
                            setOpenTreeActions(false);
                        }}
                        sx={{ mb: 1 }}
                    >
                        Kategoriyi Düzenle
                    </Button>

                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<Add />}
                        onClick={() => {
                            setNewCategory({ name: "", parentCategoryId: selectedCategory.id });
                            setOpenAddDialog(true);
                            setOpenTreeActions(false);
                        }}
                        sx={{ mb: 1 }}
                    >
                        Alt Kategori Ekle
                    </Button>

                    <Button
                        fullWidth
                        variant="outlined"
                        color="error"
                        startIcon={<Delete />}
                        onClick={() => {
                            setDeleteTarget(selectedCategory);
                            setOpenDeleteDialog(true);
                            setOpenTreeActions(false);
                        }}
                    >
                        Kategoriyi Sil
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenTreeActions(false)} startIcon={<Close />}>
                        Kapat
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openSubDialog} onClose={() => setOpenSubDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {selectedForSubs?.name} - Alt Kategoriler
                </DialogTitle>
                <DialogContent dividers>
                    {categories
                        .filter(cat => cat.parentCategoryId === selectedForSubs?.id)
                        .map((sub) => (
                            <Box key={sub.id} mb={1}>
                                • {sub.name} ({sub.categoryCode})
                            </Box>
                        ))}
                    {categories.filter(cat => cat.parentCategoryId === selectedForSubs?.id).length === 0 && (
                        <Typography color="text.secondary">Alt kategori bulunamadı.</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenSubDialog(false)} startIcon={<Close />}>
                        Kapat
                    </Button>
                </DialogActions>
            </Dialog>


        </Box>
    );
};

export default Categories;
