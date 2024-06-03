import { atom } from 'jotai';

export const setIndex = atom(-1);
export const selectedImageArrayAtom = atom<any>([]);
export const setMenuIndex = atom(0);
export const setDrawerOpen = atom<boolean>(true);
export const useAdminUser = atom<boolean>(false);
export const useCrowdStatus = atom<string>('');
export const setEditState = atom<boolean>(false);