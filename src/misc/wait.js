export const wait = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
