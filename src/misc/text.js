export const getLinesCount = content => {
    if (content.length == 0) {
        return 0;
    }

    return splitByKK(content.split(/\r\n|\r|\n/).length);
};

export const splitByKK = content => (content > 999 ? content.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : content);

export const getContentSize = content => {
    let size = content.length;

    for (let i = content.length - 1; i >= 0; i--) {
        const code = content.charCodeAt(i);
        if (code > 0x7f && code <= 0x7ff) size++;
        else if (code > 0x7ff && code <= 0xffff) size += 2;
        if (code >= 0xdc00 && code <= 0xdfff) i--;
    }

    return bytesToSize(size);
};

export const bytesToSize = bytes => {
    if (bytes == 0) return '0 B';

    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

    return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`;
};

export const msecToSec = msec => {
    return (Math.round(msec) / 1000).toFixed(2);
};
