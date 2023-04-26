import { configureStore } from "@reduxjs/toolkit";
import tockenReducer from "../slice/tockenSlice";

export default configureStore({
  reducer: { tocken: tockenReducer },
});
