import { Github, Linkedin } from "lucide-react";

const socialLinks = [
    { name: "GitHub", icon: Github, url: "https://github.com/zaihl" },
    {
        name: "LinkedIn",
        icon: Linkedin,
        url: "https://linkedin.com/in/sahilingole",
    },
];

export default function Footer() {
    return (
        <footer className="p-4 sm:p-6">
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
                <p className="mb-4 sm:mb-0">
                    &copy; 2025 Sahil Ingole. All Rights Reserved.
                </p>
                <div className="flex gap-4">
                    {socialLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-foreground transition-colors"
                            aria-label={link.name}
                        >
                            <link.icon className="h-5 w-5" />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
