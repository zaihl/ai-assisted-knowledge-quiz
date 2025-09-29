"use client";

import {
    IconWorld,
    IconMicroscope,
    IconMovie,
    IconDeviceGamepad2,
    IconMusic,
    IconPalette,
    IconAtom2,
    IconDeviceLaptop,
    IconYinYang,
    IconBook,
    IconCar,
    IconToolsKitchen2,
    IconBallFootball,
    IconBuildingMonument,
    IconFeather,
} from "@tabler/icons-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuizStore } from "@/store/quizStore";

const topicData = [
    {
        title: "History",
        icon: IconWorld,
        slug: "history",
        color: "text-blue-400",
    },
    {
        title: "Science",
        icon: IconMicroscope,
        slug: "science",
        color: "text-emerald-400",
    },
    {
        title: "Movies",
        icon: IconMovie,
        slug: "movies",
        color: "text-purple-400",
    },
    {
        title: "Gaming",
        icon: IconDeviceGamepad2,
        slug: "gaming",
        color: "text-red-400",
    },
    { title: "Music", icon: IconMusic, slug: "music", color: "text-pink-400" },
    { title: "Art", icon: IconPalette, slug: "art", color: "text-orange-400" },
    {
        title: "Physics",
        icon: IconAtom2,
        slug: "physics",
        color: "text-indigo-400",
    },
    {
        title: "Technology",
        icon: IconDeviceLaptop,
        slug: "technology",
        color: "text-gray-400",
    },
    {
        title: "Mythology",
        icon: IconYinYang,
        slug: "mythology",
        color: "text-yellow-400",
    },
    {
        title: "Literature",
        icon: IconBook,
        slug: "literature",
        color: "text-lime-400",
    },
    {
        title: "Automobiles",
        icon: IconCar,
        slug: "automobiles",
        color: "text-cyan-400",
    },
    {
        title: "Cooking",
        icon: IconToolsKitchen2,
        slug: "cooking",
        color: "text-rose-400",
    },
    {
        title: "Sports",
        icon: IconBallFootball,
        slug: "sports",
        color: "text-green-400",
    },
    {
        title: "Architecture",
        icon: IconBuildingMonument,
        slug: "architecture",
        color: "text-sky-400",
    },
    {
        title: "Poetry",
        icon: IconFeather,
        slug: "poetry",
        color: "text-violet-400",
    },
];

export function TopicGrid() {
    const { questionCount, difficulty } = useQuizStore();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Choose a Category</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {topicData.map((item) => (
                        <Link
                            href={`/quiz/${item.slug}?count=${questionCount}&difficulty=${difficulty}`}
                            key={item.title}
                            className="group flex flex-col items-center justify-center text-center p-4 h-[90px] rounded-md border bg-secondary text-secondary-foreground transition-all duration-150 ease-in-out hover:scale-105 hover:bg-accent hover:text-accent-foreground"
                        >
                            <item.icon
                                size={32}
                                className={`${item.color} transition-transform group-hover:scale-110`}
                            />
                            <p className="text-xs mt-2 text-muted-foreground group-hover:text-accent-foreground">
                                {item.title}
                            </p>
                        </Link>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
