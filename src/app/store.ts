import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import personSlice from "@/features/person/personSlice";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export default configureStore({
  reducer: {
    person: personSlice,
  },
  middleware: customizedMiddleware,
});
