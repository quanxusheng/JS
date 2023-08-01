import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// type Data = Array<{label: string, value: number}>

// interface Data {
//   label: string
//   value: number
// }


// let data: Data = {label: '111', value: 123}
// console.log('=>', data)
// let data: Data[] = [{label: '111', value: 123}]

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
