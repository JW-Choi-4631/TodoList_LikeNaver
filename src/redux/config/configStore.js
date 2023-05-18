import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import contents from "../modules/contents";
import todos from "../modules/todos";

const store = configureStore({
  reducer: {
    contents,
    todos,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
