import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export function InfoCard() {
    return (
        <Card className="hidden md:block border">
            <CardHeader>
                <CardTitle>How It Works</CardTitle>
                <CardDescription>Your AI-powered quiz journey.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
                <p className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                    <span>
                        Select a category or enter your own custom topic.
                    </span>
                </p>
                <p className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                    <span>
                        Our AI generates 5 unique questions just for you.
                    </span>
                </p>
                <p className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                    <span>
                        Test your knowledge and get personalized feedback!
                    </span>
                </p>
            </CardContent>
        </Card>
    );
}
