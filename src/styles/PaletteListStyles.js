import sizes from "./sizes";
import bg from './bg.svg';

export default {
    "@global": {
        ".fade-exit": {
            opacity: 1
        },
        ".fade-exit-active": {
            opacity: 0,
            transition: "opacity 500ms ease-out"
        }
    },
    root: {
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        /* background by SVGBackgrounds.com */
        backgroundColor: "#085391",
        backgroundImage: `url(${bg})`,
        overflow: "scroll"
    },
    container: {
        width: "50%",
        display: "flex",
        marginBottom: "3rem",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap",
        [sizes.down("xl")]: {
            width: "60%"
        },
        [sizes.down("md")]: {
            width: "70%"
        },
        [sizes.down("xs")]: {
            width: "55%"
        }
    },
    nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        color: "white",
        alignItems: "center",
        "& a": {
            color: "white",
        },
        "& h1": {
            fontSize: "30px"
        },
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gridGap: "2.5rem",
        [sizes.down("md")]: {
            gridTemplateColumns: "repeat(2, 50%)"
        },
        [sizes.down("xs")]: {
            gridTemplateColumns: "repeat(1, 100%)",
            gridGap: "1rem"
        }
    }
};


