import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./Features/posts/postsSlice";

export default configureStore({
    reducer: {
        posts: postsReducer,
    }
});