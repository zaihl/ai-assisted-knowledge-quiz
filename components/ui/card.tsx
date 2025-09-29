"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// --- Base Card Components (Standard shadcn/ui) ---

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "rounded-lg border bg-card text-card-foreground shadow-sm",
            className
        )}
        {...props}
    />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-6", className)}
        {...props}
    />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            "text-2xl font-semibold leading-none tracking-tight",
            className
        )}
        {...props}
    />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center p-6 pt-0", className)}
        {...props}
    />
));
CardFooter.displayName = "CardFooter";

// --- Spotlight Card Functionality ---
const useSpotlight = (spotlightColor: string) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = React.useState(0);

    const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => setOpacity(1);
    const handleMouseLeave = () => setOpacity(0);

    const spotlightStyle = {
        opacity,
        background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
    };

    const containerProps = {
        ref,
        onMouseMove: handleMouseMove,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
    };

    return { containerProps, spotlightStyle };
};

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
    spotlightColor?: string;
}

const SpotlightCard = React.forwardRef<HTMLDivElement, SpotlightCardProps>(
    (
        {
            className,
            children,
            spotlightColor = "rgba(128, 128, 128, 0.1)", // Neutral gray spotlight
            ...props
        },
        forwardedRef
    ) => {
        const { containerProps, spotlightStyle } = useSpotlight(spotlightColor);

        const mergedRef = (node: HTMLDivElement) => {
            (
                containerProps.ref as React.MutableRefObject<HTMLDivElement | null>
            ).current = node;
            if (typeof forwardedRef === "function") {
                forwardedRef(node);
            } else if (forwardedRef) {
                forwardedRef.current = node;
            }
        };

        return (
            <Card
                {...props}
                {...containerProps}
                ref={mergedRef}
                className={cn(
                    "relative overflow-hidden rounded-3xl border bg-card",
                    className
                )}
            >
                <div
                    className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                    style={spotlightStyle}
                />
                {children}
            </Card>
        );
    }
);
SpotlightCard.displayName = "SpotlightCard";

const SpotlightCardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <CardHeader
        ref={ref}
        className={cn("relative z-10", className)}
        {...props}
    />
));
SpotlightCardHeader.displayName = "SpotlightCardHeader";

const SpotlightCardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <CardTitle
        ref={ref}
        className={cn("text-card-foreground", className)}
        {...props}
    />
));
SpotlightCardTitle.displayName = "SpotlightCardTitle";

const SpotlightCardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <CardDescription
        ref={ref}
        className={cn("text-muted-foreground", className)}
        {...props}
    />
));
SpotlightCardDescription.displayName = "SpotlightCardDescription";

const SpotlightCardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <CardContent
        ref={ref}
        className={cn("relative z-10", className)}
        {...props}
    />
));
SpotlightCardContent.displayName = "SpotlightCardContent";

export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
    SpotlightCard,
    SpotlightCardHeader,
    SpotlightCardTitle,
    SpotlightCardDescription,
    SpotlightCardContent,
};
