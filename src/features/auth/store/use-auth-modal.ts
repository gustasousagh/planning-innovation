import { atom, useAtom } from "jotai";

const modalAtom = atom(false);
export const useAuthModal = () => {
  return useAtom(modalAtom);
};