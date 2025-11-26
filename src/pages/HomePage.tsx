import { NavLink } from "react-router";

export function HomePage() {
    return (
        <div>
            homepage
            <NavLink to="/signin"> login</NavLink>
        </div>
    );
}
