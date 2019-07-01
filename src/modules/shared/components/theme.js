import theme from 'styled-theming';

export const backgroundColor = theme('mode', {
    light: '#fcfcfc',
    dark: '#3e3e3d'
});
export const textColor = theme('mode', {
    light: '#3e3e3d',
    dark: '#fcfcfc'
});
export const backgroundColorAccent1 = theme('mode', {
    light: '#edecea',
    dark: '#e3e2df'
});