const { Link } = ReactRouterDOM


export function Home() {
    return <section className="home">
        <h1>Welcome to APPSUS!</h1>
        <h2>The place for all your Email and note keeping needs...</h2>
        <h3>Our Apps</h3>
        <section className="our-apps">
            <button className="to-mail">
                <Link to="/mail"><i class="fa-regular fa-envelope"></i></Link>
            </button>
            <button className="to-keep">
                <Link to="/note"><i class="fa-regular fa-clipboard"></i></Link>
            </button>
        </section>
    </section>
}