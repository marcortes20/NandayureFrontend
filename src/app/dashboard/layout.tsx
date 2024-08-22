import Nav from "@/components/dashboard/nav/nav";
import SideBar from "@/components/dashboard/sidebar/side-bar";

export default function DasboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="min-h-screen flex">
            <SideBar />
            <div className="flex-1 p-4">
                <Nav />
                {children}
            </div>
        </main>
    );
}