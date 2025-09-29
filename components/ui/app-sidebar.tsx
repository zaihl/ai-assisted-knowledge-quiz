"use client";

import * as React from "react";
import {
    BookOpen,
    Home,
    LayoutDashboard,
    Settings,
    Trophy,
    User,
} from "lucide-react";
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
import { NavMain } from "@/components/ui/nav-main";
import { NavUser } from "@/components/ui/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    SidebarSeparator,
} from "@/components/ui/sidebar";

const quizTopics = [
    { title: "History", slug: "history", icon: IconWorld },
    { title: "Science", slug: "science", icon: IconMicroscope },
    { title: "Movies", slug: "movies", icon: IconMovie },
    { title: "Gaming", slug: "gaming", icon: IconDeviceGamepad2 },
    { title: "Music", slug: "music", icon: IconMusic },
    { title: "Art", slug: "art", icon: IconPalette },
    { title: "Physics", slug: "physics", icon: IconAtom2 },
    { title: "Technology", slug: "technology", icon: IconDeviceLaptop },
    { title: "Mythology", slug: "mythology", icon: IconYinYang },
    { title: "Literature", slug: "literature", icon: IconBook },
    { title: "Automobiles", slug: "automobiles", icon: IconCar },
    { title: "Cooking", slug: "cooking", icon: IconToolsKitchen2 },
    { title: "Sports", slug: "sports", icon: IconBallFootball },
    { title: "Architecture", slug: "architecture", icon: IconBuildingMonument },
    { title: "Poetry", slug: "poetry", icon: IconFeather },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const data = {
        user: {
            name: "Sahil Ingole",
            email: "sahilingole16@gmail.com",
            avatar: "/avatar.jpg",
        },
        navMain: [
            {
                title: "Home",
                url: "/",
                icon: Home,
            },
            {
                title: "Dashboard",
                url: "/dashboard",
                icon: LayoutDashboard,
            },
            {
                title: "Topics",
                url: "/topics",
                icon: BookOpen,
                isActive: true, // Keep the dropdown open by default
                items: quizTopics.map((topic) => ({
                    title: topic.title,
                    url: `/quiz/${topic.slug}`,
                })),
            },
            {
                title: "Leaderboards",
                url: "#",
                icon: Trophy,
            },
            {
                title: "My Profile",
                url: "#",
                icon: User,
            },
            {
                title: "Settings",
                url: "#",
                icon: Settings,
            },
        ],
    };

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <h1 className="font-bold text-2xl p-2 group-data-[collapsible=icon]:hidden">
                    Quizzy
                </h1>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <SidebarSeparator />
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
