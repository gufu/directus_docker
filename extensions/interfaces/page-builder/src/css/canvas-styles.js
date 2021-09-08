export const canvasStyles = `
* {
    box-sizing: border-box;
}
html, body, [data-gjs-type=wrapper] {
    min-height: 100%;
}
body {
    margin: 0;
    height: 100%;
    color: #fff;
    background: #272727;
    font-family: 'Roboto', 'Arial', sans-serif;
}
[data-gjs-type=wrapper] {
    overflow: auto;
    overflow-x: hidden;
}
* ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1)
}
* ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2)
}
* ::-webkit-scrollbar {
    width: 10px
}
`