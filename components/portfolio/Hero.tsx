import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <div className="text-center px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter mb-4">
                AI-Assisted Knowledge Quiz
            </h1>
            <p className="max-w-xl mx-auto text-lg sm:text-xl text-muted-foreground mb-8">
                Test your knowledge across trending topics with quizzes powered
                by AI. Questions are generated on the fly, and you’ll get
                instant feedback based on your score.
            </p>
            <Link href="/quiz">
                <Button size="lg">
                    Go to Quiz
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </Link>
        </div>
    );
}
