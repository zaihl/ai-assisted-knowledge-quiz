import HomeBg from "@/components/ui/HomeBg";
import Hero from "@/components/portfolio/Hero";
import Footer from "@/components/portfolio/Footer";
import { AppLayout } from "@/components/ui/AppLayout";

export default function HomePage() {
    return (
        <AppLayout>
            <div className="w-full h-full relative">
                <div className="absolute inset-0 z-0">
                    <HomeBg
                        particleColors={["#888888", "#bbbbbb"]}
                        particleCount={150}
                        particleSpread={5}
                        speed={0.05}
                        particleBaseSize={100}
                        moveParticlesOnHover={true}
                        particleHoverFactor={0.5}
                        alphaParticles={true}
                        disableRotation={false}
                    />
                </div>
                <div className="relative flex flex-col h-full z-10">
                    <main className="flex-grow flex items-center justify-center">
                        <Hero />
                    </main>
                    <Footer />
                </div>
            </div>
        </AppLayout>
    );
}
