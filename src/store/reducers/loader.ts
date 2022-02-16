import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TLoader = {
  loading: boolean;
  type: 'bar' | 'spinner';
};

const initialState: TLoader = {
  loading: false,
  type: 'bar',
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setLoading: (_state, action: PayloadAction<TLoader['loading'] | TLoader>) => {
      if (typeof action.payload === 'boolean') {
        return {
          loading: action.payload,
          type: 'bar',
        };
      } else {
        return action.payload;
      }
    },
  },
});

export const {
  reducer: loaderReducer,
  actions: { setLoading },
} = loaderSlice;
