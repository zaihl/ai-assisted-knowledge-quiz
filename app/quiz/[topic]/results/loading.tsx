import { AppLayout } from "@/components/ui/AppLayout";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function Loading() {
    return (
        <AppLayout>
            <div className="flex flex-1 items-center justify-center p-4">
                <Card className="w-full max-w-2xl text-center">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold">
                            Quiz Results
                        </CardTitle>
                        <Skeleton className="h-5 w-32 mx-auto mt-2" />
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="p-6 rounded-lg bg-secondary">
                            <p className="text-lg text-secondary-foreground">
                                Your Score
                            </p>
                            <Skeleton className="h-20 w-40 mx-auto mt-2" />
                        </div>

                        <div className="text-left space-y-4">
                            <h3 className="font-semibold text-lg">
                                AI Feedback:
                            </h3>
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>

                        <div className="flex justify-center gap-4 pt-4">
                            <Skeleton className="h-10 w-36" />
                            <Skeleton className="h-10 w-36" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
