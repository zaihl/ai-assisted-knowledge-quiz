"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/ui/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Generate breadcrumbs dynamically from the pathname
    const generateBreadcrumbs = () => {
        // Handle the root case
        if (pathname === "/") {
            return (
                <BreadcrumbItem key="home">
                    <BreadcrumbPage>Home</BreadcrumbPage>
                </BreadcrumbItem>
            );
        }

        const pathSegments = pathname.split("/").filter(Boolean);
        const breadcrumbs = [
            <BreadcrumbItem key="home">
                <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                </BreadcrumbLink>
            </BreadcrumbItem>,
        ];

        let currentPath = "";
        pathSegments.forEach((segment, index) => {
            currentPath += `/${segment}`;
            const isLast = index === pathSegments.length - 1;
            const title =
                segment.charAt(0).toUpperCase() +
                segment.slice(1).replace(/-/g, " ");

            breadcrumbs.push(<BreadcrumbSeparator key={`sep-${index}`} />);

            breadcrumbs.push(
                isLast ? (
                    <BreadcrumbItem key={currentPath}>
                        <BreadcrumbPage>{title}</BreadcrumbPage>
                    </BreadcrumbItem>
                ) : (
                    <BreadcrumbItem key={currentPath}>
                        <BreadcrumbLink asChild>
                            <Link href={currentPath}>{title}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                )
            );
        });

        return breadcrumbs;
    };

    return (
        <div className="w-screen h-screen relative bg-background text-foreground">
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 data-[orientation=vertical]:h-4"
                            />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    {generateBreadcrumbs()}
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </header>
                    <main className="flex-1 overflow-auto">{children}</main>
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
}
