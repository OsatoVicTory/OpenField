export const Z = (z: number) => z >= 10 ? z : `0${z}`;

export const getTime = (time: number) => {
    const date = new Date(time);
    const hrs = date.getHours();
    const meridian = hrs >= 12 ? "PM" : "AM";
    return `${Z(hrs)}:${Z(date.getMinutes())} ${meridian}`;
};

export const imageToBase64 = async (image: File) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => {
            resolve(reader.result);
        };
    });
};

export const formatValue = (val: number) => {
    if(val >= 1E9) {
        return `${(val / 1E9).toFixed(2)}B`;
    } else if (val >= 1E6) {
        return `${(val / 1E6).toFixed(2)}M`;
    } else if (val >= 1E3) {
        return `${(val / 1E3).toFixed(2)}K`;
    } else {
        return val;
    }
}