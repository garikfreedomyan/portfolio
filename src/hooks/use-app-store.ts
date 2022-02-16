import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import type { TRootState, TAppDispatch } from 'store';

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
export const useAppDispatch = () => useDispatch<TAppDispatch>();
