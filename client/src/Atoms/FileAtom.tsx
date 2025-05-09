import { atom } from "recoil";


const FileAtom = atom<File | null>({
    key: "FileAtom",
    default: null
});

export default FileAtom;