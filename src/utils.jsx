export const delay =(data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 200)
    });
}
