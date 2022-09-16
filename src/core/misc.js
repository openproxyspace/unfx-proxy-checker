export const arrayToChunks = (array, size) => {
    const res = [];

    for (let i = 0; i < array.length; i += size) {
        const chunk = array.slice(i, i + size);
        res.push(chunk);
    }

    return res;
};
