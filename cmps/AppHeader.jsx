// const { Link, NavLink } = ReactRouterDOM

// export function AppHeader() {

//     return <header className="app-header">
//         <Link to="/">
//             <h3>APPSUS</h3>
//         </Link>
//         <nav>
//             <NavLink to="/">Home</NavLink>
//             <NavLink to="/about">About</NavLink>
//             <NavLink to="/mail">Mail</NavLink>
//             <NavLink to="/note">Note</NavLink>
//         </nav>
//     </header>
// }

const { useState } = React;
const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className={`app-header ${menuOpen ? 'open' : ''}`}>
            <Link to="/">
                <img className="logo" src="./assets/img/horse.png" alt="" />
                {/* <h3>APPSUS</h3> */}
            </Link>
            <div className="menu-button" onClick={toggleMenu}>
                {/* <i class="fa-solid fa-layer-group"></i> */}
                <img  className="menu-img" src="./assets/img/menu.png" alt="" />
            </div>
            <nav className={menuOpen ? 'open' : ''}>
                
                    <NavLink to="/" onClick={toggleMenu}>
                        <i class="fa-solid fa-house"></i>
                        Home
                    </NavLink>
                    <NavLink to="/about" onClick={toggleMenu}>
                    <i class="fa-solid fa-circle-info"></i>
                        About
                    </NavLink>
                
                    <NavLink to="/mail" onClick={toggleMenu}>
                        <i class="fa-solid fa-envelope"></i>
                        Email
                    </NavLink>
                    <NavLink to="/note" onClick={toggleMenu}>
                        <i class="fa-solid fa-note-sticky"></i>
                        Notes
                    </NavLink>
                
            </nav>
        </header>
    );
}