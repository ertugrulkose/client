import axios from "axios";

const API_URL = "https://localhost:7242/api/Categories"; // 📌 Backend API adresi

// 🟢 Kategorileri filtre, sıralama ve sayfalama ile arama
export const searchCategories = async (payload) => {
  const response = await axios.post(`${API_URL}/search`, payload); // 🔥 düzeltme burada
  return response.data.data;
};



// 🆕 Sayfalama destekli kategori çekme
export const getPagedCategories = async (pageNumber, pageSize) => {
  try {
    const response = await axios.get(`${API_URL}/${pageNumber}/${pageSize}`);
    return response.data;
  }
  catch (error) {
    console.error("Sayfalı veri çekme başarısız:", error);
    throw error;
  }
};


// 🟢 Tüm kategorileri getir (axios ile)
export const fetchCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("API’den gelen kategori verisi:", response.data); // 🔍 Konsolda kontrol et
    return response.data;
  } catch (error) {
    console.error("Kategorileri çekerken hata oluştu:", error);
    return []; // ❌ Hata olursa boş bir dizi döndür
  }
};



// 🟢 Yeni kategori ekle
export const addCategory = async (categoryData) => {
  try {
    const response = await axios.post(API_URL, categoryData);
    return response.data;
  } catch (error) {
    console.error("Kategori eklerken hata oluştu:", error);
    throw error;
  }
};

// 🟢 Kategori güncelle
export const updateCategory = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Kategori güncellenirken hata oluştu:", error);
    throw error;
  }
};

// 🟢 Kategori sil
export const deleteCategory = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Kategori silinirken hata oluştu:", error);
    throw error;
  }
};
