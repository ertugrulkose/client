import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress } from '@mui/material';
import { Add, Edit, Delete, SaveAlt } from '@mui/icons-material';

const DynamicTable = ({
    title,
    columns,
    fetchData,
    onCreate,
    onEdit,
    onDelete,
    enableCreate = true,
    enableEdit = true,
    enableDelete = true,
    enableExcelExport = true,
    pageSize = 10
}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const loadData = async (page = 1) => {
        setLoading(true);
        try {
            const response = await fetchData({}, {}, page, pageSize);
            setData(response.items);
            setTotalCount(response.totalCount);
            setTotalPages(Math.ceil(response.totalCount / pageSize));
            setCurrentPage(page);
        } catch (err) {
            setError(err.message || "Veri yüklenirken hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleExcelExport = () => {
        // Excel export işlemi burada tetiklenebilir (props'tan fonksiyon gönderilebilir)
        alert("Excel export işlemi henüz implement edilmedi.");
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" my={3}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box textAlign="center" color="red">
                <Typography variant="h6">{error}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5">{title}</Typography>
                <Box>
                    {enableCreate && (
                        <Button startIcon={<Add />} variant="contained" onClick={onCreate}>
                            Ekle
                        </Button>
                    )}
                    {enableExcelExport && (
                        <Button startIcon={<SaveAlt />} variant="outlined" color="success" sx={{ ml: 2 }} onClick={handleExcelExport}>
                            Excel'e Aktar
                        </Button>
                    )}
                </Box>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((col) => (
                                <TableCell key={col.field}><b>{col.label}</b></TableCell>
                            ))}
                            {(enableEdit || enableDelete) && <TableCell align="right"><b>İşlemler</b></TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.id}>
                                {columns.map((col) => (
                                    <TableCell key={col.field}>
                                        {row[col.field]}
                                    </TableCell>
                                ))}
                                {(enableEdit || enableDelete) && (
                                    <TableCell align="right">
                                        {enableEdit && (
                                            <Button size="small" startIcon={<Edit />} onClick={() => onEdit(row)}>
                                                Düzenle
                                            </Button>
                                        )}
                                        {enableDelete && (
                                            <Button size="small" color="error" startIcon={<Delete />} onClick={() => onDelete(row)}>
                                                Sil
                                            </Button>
                                        )}
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
                <Button disabled={currentPage <= 1} onClick={() => loadData(currentPage - 1)}>
                    Önceki
                </Button>
                <Typography mx={2}>
                    Sayfa {currentPage} / {totalPages} - Toplam {totalCount} kayıt
                </Typography>
                <Button disabled={currentPage >= totalPages} onClick={() => loadData(currentPage + 1)}>
                    Sonraki
                </Button>
            </Box>
        </Box>
    );
};

export default DynamicTable;
