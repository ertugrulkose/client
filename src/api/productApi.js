import axios from 'axios';

const API_URL = 'https://localhost:7242/api/Products'; // 🔥 kendi API endpointine göre düzenle

// 🆕 Sayfalama destekli ürün çekme
export const getPagedProducts = async (pageNumber, pageSize) => {
    try {
        const response = await axios.get(`${API_URL}/${pageNumber}/${pageSize}`);
        return response.data;
    } catch (error) {
        console.error("❌ Sayfalı ürün veri çekme başarısız:", error);
        throw new Error('Sayfalı ürün veri çekme hatası.');
    }
};

// 🆕 Ürün ekleme
export const addProduct = async (productData) => {
    try {
        debugger;
        const response = await axios.post(API_URL, productData);
        return response.data;
    } catch (error) {
        console.error("Ürün eklerken hata oluştu:", error);
        throw error;
    }
};

// Ürün Güncelle
export const updateProduct = async (id, updatedData) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
  };
  
  // Ürün Sil
  export const deleteProduct = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  };
  
