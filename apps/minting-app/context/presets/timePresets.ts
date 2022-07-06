const now = new Date();
const bod = new Date(now.getFullYear(), now.getMonth(), now.getDate());

export const secondInDay = (now.getTime() - bod.getTime()) / 1000;
export const seasonsAmplitude = Math.round((0 / 180) * 260);
// length of solar year: 365 days 5 hours 48 minutes 46 seconds = 31556926 seconds
// midwinter is 11 days 8 hours (= 979200 seconds) before the start of the calendar year
export const secondInYear = Math.round((Date.now() / 1000 - 979200) % 31556926);
