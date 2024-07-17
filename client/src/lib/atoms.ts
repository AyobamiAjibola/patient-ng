import { atom } from 'jotai';

export const setIndex = atom(-1);
export const selectedImageArrayAtom = atom<any>([]);
export const setMenuIndex = atom(0);
export const setDrawerOpen = atom<boolean>(true);
export const useAdminUser = atom<boolean>(false);
export const useCrowdStatus = atom<string>('');
export const setEditState = atom<boolean>(false);
export const setIsLoggedIn = atom<boolean>(false);
export const modalReg = atom<boolean>(false);
export const sessionErrorMsg = atom<string>("");
export const sessionErrorModal = atom<boolean>(false);
export const setOpenSignInModal = atom<boolean>(false); //setFundraisingId
export const selectedImageArrayAtom2 = atom<any>([]);
export const speakerData = atom([{
    speakerName: '',
    occupation: '',
    image: null
}]);
export const setFundraisingId = atom<string>('');
export const openModal = atom<boolean>(false);
export const openModal2 = atom<boolean>(false);
export const openType = atom<string>('');
export const hospitalRating = atom<string>('')