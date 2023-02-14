import { configureStore } from "@reduxjs/toolkit";
import adoptedPet from "./adoptedPetslice";

const store = configureStore({
  reducer: {
    adoptedPet,
  },
});

export default store;
