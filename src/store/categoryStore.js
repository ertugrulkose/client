import { create } from "zustand";
import * as categoryApi from "../api/categoryApi";

// 📌 Kategorileri state olarak tutacak olan bir store oluşturduk. Bu store içinde kategorileri çekme, ekleme, güncelleme ve silme işlemlerini gerçekleştirebileceğiz. Bu işlemleri API ile haberleşerek gerçekleştireceğiz.

// Zustand store oluşturma
const useCategoryStore = create((set) => ({
  categories: [], // 📌 Kategorileri burada tutacağız
  allCategories: [], // 📌 Tüm kategorileri burada tutacağız (API'den çekilen)
  loading: false, // 📌 Yüklenme durumu
  error: null, // 📌 Hata mesajı
  totalCategoryCount: 0, // 🔢 Toplam kayıt sayısı
  totalPages: 1, // 🆕 toplam sayfa sayısı
  currentPage: 1,         // 📄 Aktif sayfa numarası
  pageSize: 10,           // 📏 Sayfa başına kayıt adedi (frontend'de gerekirse değiştirilir)

  // Kategorileri arama filtre ile
  searchCategories: async (filters, sortConfig, pageNumber, pageSize) => {
    set({ loading: true, error: null });
    try {
      console.log(filters);

      debugger; // 🔍 Konsolda kontrol et
      const payload = {
        filters,
        sort: sortConfig?.key
          ? { key: sortConfig.key, direction: sortConfig.direction || "asc" }
          : undefined,
        pageNumber,
        pageSize
      };

      const data = await categoryApi.searchCategories(payload);

      if (data && data.items) {
        set({
          categories: data.items,
          totalCategoryCount: data.totalCount,
          totalPages: Math.ceil(data.totalCount / pageSize), // 🆕 Toplam sayfa hesaplanır
          currentPage: pageNumber,
          loading: false
        });
        return data; // ❗️ response dön

      } else {
        set({ error: "Arama sonuçları alınamadı", loading: false });
      }
    } catch (error) {
      set({ error: "Kategori arama işlemi başarısız", loading: false });
    }
  },


  // 🆕 Sayfalama destekli kategori çekme
  getPagedCategories: async (pageNumber, pageSize) => {
    set({ loading: true, error: null });
    try {
      const data = await categoryApi.getPagedCategories(pageNumber, pageSize);
      if (data && data.data) {
        set({
          categories: data.data,
          totalCategoryCount: data.totalCount || 0, // burası backend'den geliyorsa, yoksa 0 ver
          totalPages: Math.ceil((data.totalCount || 0) / pageSize), // 🆕 Toplam sayfa hesaplanır
          loading: false,
          currentPage: pageNumber,
        });
      } else {
        set({ error: "Sayfalanmış Veri alınamadı", loading: false });
      }
    } catch (error) {
      set({ error: "Sayfalı veri çekme başarısız", loading: false });
    }
  },



  // 🟢 Kategorileri API'den çek ve state'e kaydet
  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const response = await categoryApi.fetchCategories();
      console.log("API’den gelen kategori verisi:", response);

      if (response.data) {
        set({ 
          allCategories: response.data, 
          loading: false }); // ❌ Eskiden { data: [...], errorMessage: null } tutuyordu
      } else {
        set({ error: "Beklenmedik API yanıtı", loading: false });
      }
    } catch (error) {
      set({ error: "API çağrısı başarısız", loading: false });
    }
  },



  // 🟢 Yeni kategori ekle
  addCategory: async (categoryData) => {
    try {
      const newCategory = await categoryApi.addCategory(categoryData); // ✅ doğru olan bu
      set((state) => ({ categories: [...state.categories, newCategory] }));
      return newCategory; // ✅ geri döndürüyoruz ki frontend'te expanded çalışsın
    } catch (error) {
      set({ error: "Kategori eklenirken hata oluştu!" });
      return null;
    }
  },


  // 🟢 Kategori güncelle
  updateCategory: async (id, updatedData) => {
    try {
      await categoryApi.updateCategory(id, updatedData); // API isteği
      set((state) => ({
        categories: state.categories.map((cat) =>
          cat.id === id ? { ...cat, ...updatedData } : cat
        ),
      }));
    } catch (error) {
      console.error("Kategori güncellenirken hata oluştu! ", error);
    }
  },


  // 🟢 Kategori sil
  deleteCategory: async (id) => {
    try {
      await categoryApi.deleteCategory(id);
      set((state) => ({
        categories: state.categories.filter((cat) => cat.id !== id),
      }));
    } catch (error) {
      set({ error: "Kategori silinirken hata oluştu!" });
    }
  },
}));

export default useCategoryStore;
