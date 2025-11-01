export const Z = (z: number) => z >= 10 ? z : `0${z}`;

export const getTime = (time: number) => {
    const date = new Date(time);
    const hrs = date.getHours();
    const meridian = hrs >= 12 ? "PM" : "AM";
    return `${Z(hrs)}:${Z(date.getMinutes())} ${meridian}`;
};