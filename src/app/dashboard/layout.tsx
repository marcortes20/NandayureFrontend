import Nav from "@/modules/dashboard/components/nav/nav";
import SideBar from "@/modules/dashboard/components/sidebar/side-bar";

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