import { shell } from "electron";

export const openLink = e => {
    e.preventDefault();
    shell.openExternal(e.currentTarget.href);
};
