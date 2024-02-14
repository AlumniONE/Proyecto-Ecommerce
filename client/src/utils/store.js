import { create } from 'zustand';
import axios from 'axios'; // Importar axios

const useStore = create((set) => ({
  products: [],
  categories: [],
  currentPage: 1,
  totalPages: 1,
  cart: [],
  totalPrice: 0,

  // eslint-disable-next-line space-before-function-paren
  fetchProducts: async (page = 0) => {
    try {
      const response = await axios.get(
        `http://ns1.dataindev.com:8080/ecommerce/cellphones/allCellphones?page=${page}`
      ); // Usar axios para la petición GET

      // console.log(response.data.content); // Acceder a los datos directamente desde response.data
      set({ products: response.data.content });

      // Filtrar categorías únicas y actualizar el estado
      const uniqueCategories = [
        ...new Set(response.data.content.map((product) => product.category)),
      ];
      set({ categories: uniqueCategories });
      set({ totalPages: response.data.totalPages });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },
  productId: [],
  // eslint-disable-next-line space-before-function-paren
  getProductById: async (id) => {
    try {
      const response = await axios.get(
        `http://ns1.dataindev.com:8080/ecommerce/cellphones/${id}`
      );
      console.log(response.data);
      set({ productId: response.data });
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error);
    }
  },

  setCurrentPage: (page) => set({ currentPage: page }),

  nextPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),

  prevPage: () => set((state) => ({ currentPage: state.currentPage - 1 })),

  // Estado para agregar y eliminar carrito
  addToCart: (product) =>
    set((state) => ({
      cart: [...state.cart, product],
      totalPrice:
        state.totalPrice + (product?.price || 0) * (product.quantity || 1),
    })),
  removeFromCart: (productId) =>
    set((state) => {
      const removedProduct = state.cart.find(
        (product) => product.id === productId
      );
      return {
        cart: state.cart.filter((product) => product.id !== productId),
        totalPrice: state.totalPrice - (removedProduct?.price || 0),
      };
    }),
  clearCart: () => set({ cart: [], totalPrice: 0 }),
}));

export default useStore;
