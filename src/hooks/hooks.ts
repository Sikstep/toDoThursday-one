import React from 'react'
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {AppRootStateType} from '../state/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// export const useAppDispatch: () => AppDispatch = useDispatch
// export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
// export const useAppStore: () => AppStore = useStore