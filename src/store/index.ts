import { configureStore } from '@reduxjs/toolkit';
import { loaderReducer } from 'store/reducers';

const store = configureStore({
  reducer: {
    loader: loaderReducer,
  },
});

export default store;
export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
