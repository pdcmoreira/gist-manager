// Very simple function to generate random "pastel" colors
// https://stackoverflow.com/a/54279008/1931117
export const randomColor = () => `hsla(${~~(360 * Math.random())}, 70%,  72%, 0.8)`
