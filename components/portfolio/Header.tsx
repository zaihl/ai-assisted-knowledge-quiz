import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export default function Header() {
    return (
        <header className="p-4 sm:p-6">
            <nav className="container mx-auto flex justify-between items-center">
                <Link
                    href="/"
                    className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
                >
                    Quizzy
                </Link>
                <div className="flex items-center gap-4 text-sm">
                    <Link
                        href="#projects"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Projects
                    </Link>
                    <a
                        href="https://github.com/zaihl"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button variant="outline" size="icon">
                            <Github className="h-4 w-4" />
                        </Button>
                    </a>
                </div>
            </nav>
        </header>
    );
}
