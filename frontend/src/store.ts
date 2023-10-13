import { create } from "zustand";
import { persist } from "zustand/middleware";
import UploadedItemModel from "./data/models/UploadedItemModel";

interface DexyState {
  uploads: UploadedItemModel[];
  setUploads: (uploads: UploadedItemModel[]) => void;
  ftdCid: string;
  setFtdCid: (cid: string) => void;
}

export const useDexyStore = create<DexyState>()(
  persist(
    (set, get) => ({
      uploads: [],
      setUploads: (uploads) => set({ uploads }),
      ftdCid: "",
      setFtdCid: (cid) => set({ ftdCid: cid }),
    }),
    {
      name: "dexy-storage",
    }
  )
);
