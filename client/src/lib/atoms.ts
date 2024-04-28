import { atom } from 'jotai';

interface IAddress {
    address: string;
    houseNumber: string;
    block: string;
    area: string;
    city: string;
}

interface IOperationTime {

}

interface IProps {
    address: IAddress;
    coverPhoto: string;
    description: string;
    location: any;
    logo: string;
    operationTime: any[];
    phone: string;
    ratings: number;
    restaurantName: string;
    tagLine: string;
    _id: string;
    features: {
        dinein: boolean,
        finedine: boolean,
        casual: boolean
    };
    socials: {
        instagram: string | null,
        facebook: string  | null,
        tiktok: string  | null,
        snapchat: string  | null,
        youtube: string  | null,
        whatsapp: string
    };
    videoUrl: {
        source: string;
        url: string
    }[];
    gallery: {
        images: string[],
        video: string[]
    }
}

interface ILocationProps {
    lat: number,
    lng: number
}

export const selectedImageArrayAtom = atom([]);
export const setGlobalId = atom('');
export const setMenuItemAvailability = atom('');
export const setMenuItemAvailabilityDate = atom('');
export const setCurrentAvailabilityStatus = atom('');
export const setMenuItems = atom([]);
export const setRestaurantDetails = atom({} as IProps);
export const setDeals = atom([]);
export const toggleDealView = atom(false);
export const setLocation = atom({} as ILocationProps)
