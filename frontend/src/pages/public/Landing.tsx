import Navbar from '../../components/shared/Navbar';
import HeroBanner from '../../components/landing/HeroBanner.tsx';
import HighlightedEvents from '../../components/landing/HighlightedEvents.tsx';
import AboutUniSphere from '../../components/landing/AboutUniSphere.tsx';
import LoginSignupCTA from '../../components/landing/LoginSignupCTA.tsx';
import Footer from '../../components/shared/Footer';

export default function Landing() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
                <HeroBanner />
                <HighlightedEvents />
                <AboutUniSphere />
                <LoginSignupCTA />
            </main>
            <Footer />
        </div>
    );
}
