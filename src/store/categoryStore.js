import { create } from "zustand";
import { fetchCategories, addCategory, updateCategory, deleteCategory } from "../api/categoryApi";

// 📌 Kategorileri state olarak tutacak olan bir store oluşturduk. Bu store içinde kategorileri çekme, ekleme, güncelleme ve silme işlemlerini gerçekleştirebileceğiz. Bu işlemleri API ile haberleşerek gerçekleştireceğiz.

// Zustand store oluşturma
const useCategoryStore = create((set) => ({
  categories: [], // 📌 Kategorileri burada tutacağız
  loading: false, // 📌 Yüklenme durumu
  error: null, // 📌 Hata mesajı

  // 🟢 Kategorileri API'den çek ve state'e kaydet
  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
        const response = await fetchCategories();
        console.log("API’den gelen kategori verisi:", response);

        if (response.data) {
            set({ categories: response.data, loading: false }); // ❌ Eskiden { data: [...], errorMessage: null } tutuyordu
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
      const newCategory = await addCategory(categoryData);
      set((state) => ({ categories: [...state.categories, newCategory] }));
    } catch (error) {
      set({ error: "Kategori eklenirken hata oluştu!" });
    }
  },

  // 🟢 Kategori güncelle
  updateCategory: async (id, updatedData) => {
    try {
        await updateCategory(id, updatedData); // API isteği
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
      await deleteCategory(id);
      set((state) => ({
        categories: state.categories.filter((cat) => cat.id !== id),
      }));
    } catch (error) {
      set({ error: "Kategori silinirken hata oluştu!" });
    }
  },
}));

export default useCategoryStore;
