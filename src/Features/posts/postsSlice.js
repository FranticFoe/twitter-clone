import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BASE_URL = "https://9f6ca3a9-de60-4fe5-80bc-2030987995cb-00-2drp1qaur4ve1.sisko.replit.dev";

export const fetchPostsByUser = createAsyncThunk("posts/fetchByUser", async (userId) => {
    try {
        const response = await fetch(`${BASE_URL}/posts/users/${userId}`);
        return response.json();
    } catch (err) {
        console.error(err);
    }
});

export const savePost = createAsyncThunk(
    "posts/savePost", async (postContent) => {
        const token = localStorage.getItem("authToken");
        const decoded = jwtDecode(token);
        const userId = decoded.id;

        const data = {
            user_id: userId,
            title: "Post Title",
            content: postContent
        };

        try {
            const response = await axios.post(`${BASE_URL}/posts/`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (err) {
            console.error("Error saving post:", err);
        }
    }
)

const postsSlice = createSlice({
    name: "posts",
    initialState: { posts: [], loading: true, },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostsByUser.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.loading = false;
            })
        builder.addCase(savePost.fulfilled, (state, action) => {
            state.posts = [action.payload, ...state.posts];
            state.loading = false;
        });
    }
})

export default postsSlice.reducer