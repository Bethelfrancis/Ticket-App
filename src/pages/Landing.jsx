import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <section className="hero card" aria-labelledby="hero-title">
        <div className="circle a" aria-hidden></div>
        <div className="circle b" aria-hidden></div>
        <div className="inner">
            <h1 id="hero-title">TicketApp — Manage issues, faster.</h1>
            <p>
                Simple, responsive ticket management built for demos. Create, track,
                and resolve tickets with ease.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
                <Link to="/auth/login" className="btn">
                    Login
                </Link>
                <Link to="/auth/signup" className="btn">
                    Get Started
                </Link>
            </div>
        </div>
    </section>
  );
}
