import { atom } from "jotai";

export const userAtom = atom<any | null>(null);

// 웹 전용
export const loginComponentAtom = atom<string>("signin");
