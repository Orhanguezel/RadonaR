import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {apiCall} from "@/api/apiCall";

const initialState = {
  profile: null,
  loading: false,
  error: null,
  successMessage: null,
};


export const updateMyProfile = createAsyncThunk(
  "account/updateMyProfile",
  async (data, thunkAPI) => {
    return await apiCall("put", "/users/account/me/update", data, thunkAPI.rejectWithValue);
  }
);

export const updateMyPassword = createAsyncThunk(
  "account/updateMyPassword",
  async (data, thunkAPI) => {
    return await apiCall("put", "/users/account/me/password", data, thunkAPI.rejectWithValue);
  }
);

export const updateProfileImage = createAsyncThunk(
  "account/updateProfileImage",
  async (file, thunkAPI) => {
    const formData = new FormData();
    formData.append("profileImage", file);

    return await apiCall(
      "put",
      "/users/account/me/profile-image",
      formData,
      thunkAPI.rejectWithValue,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }
);

export const updateNotificationSettings = createAsyncThunk(
  "account/updateNotificationSettings",
  async (data, thunkAPI) => {
    return await apiCall("patch", "/users/account/me/notifications", data, thunkAPI.rejectWithValue);
  }
);

export const updateSocialMediaLinks = createAsyncThunk(
  "users/account/updateSocialMediaLinks",
  async (data, thunkAPI) => {
    return await apiCall("patch", "/users/account/me/social", data, thunkAPI.rejectWithValue);
  }
);

export const updateAddress = createAsyncThunk(
  "account/updateAddress",
  async (addresses, thunkAPI) => {
    return await apiCall("put", "/users/account/me/addresses", { addresses }, thunkAPI.rejectWithValue);
  }
);

export const updatePayment = createAsyncThunk(
  "account/updatePayment",
  async (payment, thunkAPI) => {
    return await apiCall("put", "/users/account/me", { payment }, thunkAPI.rejectWithValue);
  }
);

export const deleteUserAccount = createAsyncThunk(
  "account/deleteUserAccount",
  async (payload, thunkAPI) => {
    return await apiCall("delete", "/users/auth/delete", payload, thunkAPI.rejectWithValue);
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    clearAccountMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    resetProfile: (state) => {
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    const loading = (state) => {
      state.loading = true;
      state.error = null;
    };

    const failed = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };

    builder
      .addCase(updateMyProfile.pending, loading)
      .addCase(updateMyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.profile = { ...state.profile, ...action.payload.user };
      })
      .addCase(updateMyProfile.rejected, failed)

      .addCase(updateMyPassword.pending, loading)
      .addCase(updateMyPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(updateMyPassword.rejected, failed)

      .addCase(updateNotificationSettings.pending, loading)
      .addCase(updateNotificationSettings.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile) {
          state.profile.notifications = action.payload.notifications;
        }
        state.successMessage = action.payload.message;
      })
      .addCase(updateNotificationSettings.rejected, failed)

      .addCase(updateSocialMediaLinks.pending, loading)
      .addCase(updateSocialMediaLinks.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile) {
          state.profile.socialMedia = action.payload.socialMedia;
        }
        state.successMessage = action.payload.message;
      })
      .addCase(updateSocialMediaLinks.rejected, failed)

      .addCase(updateAddress.pending, loading)
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile) {
          state.profile.addresses = action.payload.addresses;
        }
        state.successMessage = action.payload.message;
      })
      .addCase(updateAddress.rejected, failed)

      .addCase(updatePayment.pending, loading)
      .addCase(updatePayment.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile) {
          state.profile.payment = action.payload.payment;
        }
        state.successMessage = action.payload.message;
      })
      .addCase(updatePayment.rejected, failed)

      .addCase(updateProfileImage.pending, loading)
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile) {
          state.profile.profileImage = action.payload.profileImage;
        }
        state.successMessage = "Profile image updated successfully.";
      })
      .addCase(updateProfileImage.rejected, failed)

      .addCase(deleteUserAccount.pending, loading)
      .addCase(deleteUserAccount.fulfilled, (state) => {
        state.loading = false;
        state.profile = null;
        state.successMessage = "Account deleted successfully.";
      })
      .addCase(deleteUserAccount.rejected, failed);
  },
});

export const { clearAccountMessages, resetProfile } = accountSlice.actions;
export default accountSlice.reducer;
