import { AppLayout } from "@/components/ui/AppLayout";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <AppLayout>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                {/* Skeletons for the top 3 cards */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {/* Skeleton for CustomTopicCard */}
                    <div className="space-y-4 rounded-lg border bg-card p-6">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-9 w-full" />
                    </div>
                    {/* Skeleton for RandomTopicCard */}
                    <div className="space-y-4 rounded-lg border bg-card p-6">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-9 w-full" />
                    </div>
                    {/* Skeleton for InfoCard */}
                    <div className="hidden md:block space-y-4 rounded-lg border bg-card p-6">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                    </div>
                </div>
                {/* Skeleton for the main TopicGrid */}
                <div className="flex-1 space-y-4 rounded-lg border bg-card p-6">
                    <Skeleton className="h-8 w-1/3" />
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {Array.from({ length: 15 }).map((_, i) => (
                            <Skeleton
                                key={i}
                                className="h-[90px] w-full rounded-md"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
