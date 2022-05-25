import { AboutMe, Connect, Landing, Projects, Resume } from "./index"

function Omni({ page }) {
    switch(page) {
        case "about me":
            return <AboutMe/>;
        case "connect":
            return <Connect/>;
        case "intro":
            return <Landing/>;
        case "resume":
            return <Resume/>;
        case "projects":
            return <Projects/>;
        default:
            return <div>what?</div>
    }
}

export default Omni