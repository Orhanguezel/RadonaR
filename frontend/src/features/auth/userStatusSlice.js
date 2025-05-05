// src/store/userStatusSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {apiCall} from "@/api/apiCall";

const initialState = {
  loading: false,
  error: null,
  successMessage: null,
};

// 🔁 Aktiflik durumunu değiştir (admin)
export const toggleUserStatus = createAsyncThunk(
  "userStatus/toggleUserStatus",
  async (id, thunkAPI) => {
    try {
      const response = await apiCall(
        "put",
        `/users/users/${id}/status`,
        null,
        thunkAPI.rejectWithValue
      );
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue({
        status: err.response?.status || 500,
        message: err.response?.data?.message || "Kullanıcı durumu güncellenemedi.",
        data: null,
      });
    }
  }
);

// 🏷️ Kullanıcı rolünü değiştir (admin)
export const updateUserRole = createAsyncThunk(
  "userStatus/updateUserRole",
  async ({ id, role }, thunkAPI) => {
    try {
      await apiCall(
        "put",
        `/users/users/${id}/role`,
        { role },
        thunkAPI.rejectWithValue
      );
    } catch (err) {
      return thunkAPI.rejectWithValue({
        status: err.response?.status || 500,
        message: err.response?.data?.message || "Rol güncellenemedi.",
        data: null,
      });
    }
  }
);

const userStatusSlice = createSlice({
  name: "userStatus",
  initialState,
  reducers: {
    clearUserStatusMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    // 🔁 Aktif/Pasif güncelle
    builder.addCase(toggleUserStatus.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(toggleUserStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = action.payload.isActive
        ? "Kullanıcı aktifleştirildi."
        : "Kullanıcı pasifleştirildi.";
    });
    builder.addCase(toggleUserStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message ?? "Bilinmeyen bir hata oluştu.";
    });

    // 🎖️ Rol güncelleme
    builder.addCase(updateUserRole.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUserRole.fulfilled, (state) => {
      state.loading = false;
      state.successMessage = "Kullanıcı rolü başarıyla güncellendi.";
    });
    builder.addCase(updateUserRole.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message ?? "Bilinmeyen bir hata oluştu.";
    });
  },
});

export const { clearUserStatusMessages } = userStatusSlice.actions;
export default userStatusSlice.reducer;
