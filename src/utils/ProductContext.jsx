import React, { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "./apiClient";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const queryClient = useQueryClient();

  // GET ALL PRODUCTS (Default Katalog)
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await apiClient.get("/desains");
      return res.data.data;
    },
  });

  // GET PRODUCTS WITH FILTER, PAGINATION, & SORTING (Aman dari String Kosong)
  const getProducts = async ({
    page = 1,
    limit = 5,
    category_id = "",
    keyword = "",
    sort_by = "",
    sort_order = "",
  } = {}) => {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("limit", limit);

    if (category_id) params.append("category_id", category_id);
    if (keyword) params.append("keyword", keyword);
    if (sort_by) params.append("sort_by", sort_by);
    if (sort_order) params.append("sort_order", sort_order);

    const res = await apiClient.get(`/desains?${params.toString()}`);
    return res.data;
  };

  // SHOW PRODUCT DETAIL
  const getProductById = async (id) => {
    const res = await apiClient.get(`/desains/${id}`);
    return res.data.data;
  };

  // STORE PRODUCT
  const addProduct = async (formData) => {
    try {
      const response = await apiClient.post("/desains", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      queryClient.invalidateQueries(["products"]);
      return response;
    } catch (error) {
      throw error;
    }
  };

  // UPDATE PRODUCT
  const updateProduct = async (id, formData) => {
    try {
      const response = await apiClient.post(`/desains/${id}?_method=PUT`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      queryClient.invalidateQueries(["products"]);
      return response;
    } catch (error) {
      throw error;
    }
  };

  // DELETE PRODUCT
  const deleteProduct = useMutation({
    mutationFn: async (id) => await apiClient.delete(`/desains/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  // SHOW CATEGORIES LIST
  const getCategories = async () => {
    const res = await apiClient.get("/categories");
    return res.data;
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        isLoading,
        isError,
        getProducts,
        getProductById,
        addProduct,
        updateProduct,
        deleteProduct,
        getCategories,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);