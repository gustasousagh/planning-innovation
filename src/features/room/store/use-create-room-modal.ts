import { atom, useAtom } from "jotai";

const modalAtom = atom(false);
export const useCreateRoomModal = () => {
  return useAtom(modalAtom);
}