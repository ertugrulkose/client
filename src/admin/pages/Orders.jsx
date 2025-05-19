import React from 'react';
import DynamicTable from '../../components/DynamicTable';

import useCategoryStore from '../../store/categoryStore';

const Orders = () => {
    const { searchCategories, addCategory, updateCategory, deleteCategory } = useCategoryStore();

    // Backend'den canlı kategori verisi çeker
    const fetchCategories = async (filters, sort, page, pageSize) => {
        const response = await searchCategories(filters, sort, page, pageSize);
        console.log("Canlı Kategori Verisi:", response);
        // Zustand store'un içinde zaten veriler tutuluyor, oradan döndür
        return response || {
            items: [],
            totalCount: 0
        };
    };

    // CRUD işlemleri için gerçek backend metotlarını çağırıyoruz
    const handleCreate = () => {
        const name = prompt("Yeni kategori adını giriniz:");
        if(name) {
            addCategory({ name });
        }
    };

    const handleEdit = (item) => {
        const newName = prompt("Yeni kategori adı:", item.name);
        if(newName) {
            updateCategory(item.id, { name: newName });
        }
    };

    const handleDelete = (item) => {
        if(window.confirm(`"${item.name}" kategorisini silmek istediğinize emin misiniz?`)){
            deleteCategory(item.id);
        }
    };

    return (
        <DynamicTable
            title="Canlı Kategori Testi"
            columns={[
                { field: 'categoryCode', label: 'Kategori Kodu' },
                { field: 'name', label: 'Kategori Adı' },
                { field: 'parentCategoryId', label: 'Üst Kategori ID' },
            ]}
            fetchData={fetchCategories}
            onCreate={handleCreate}
            onEdit={handleEdit}
            onDelete={handleDelete}
            enableCreate={true}
            enableEdit={true}
            enableDelete={true}
            enableExcelExport={false} // şimdilik false yapabiliriz, istersen açabilirsin
            pageSize={10}
        />
    );
};

export default Orders;