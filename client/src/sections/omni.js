import { AboutMe, Connect, Landing, Projects, Resume } from "./index"

function Omni({ page, scale, isMobile }) {
    let returned

    switch(page) {
        case "about me":
            returned = <AboutMe scale={scale} isMobile={isMobile} />;
            break;
        case "connect":
            returned = <Connect scale={scale} isMobile={isMobile} />;
            break;
        case "intro":
            returned = <Landing scale={scale} isMobile={isMobile} />;
            break;
        case "resume":
            returned = <Resume scale={scale} isMobile={isMobile} />;
            break;
        case "projects":
            returned = <Projects scale={scale} isMobile={isMobile} />;
            break;
        default:
            returned = <div>what?</div>
            break;
    }

    return returned
}

export default Omni