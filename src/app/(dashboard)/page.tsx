import ButtonAuth from "@/components/ui/ButtonAuth";
import MaintenancePage from "@/components/ui/maintenance-page";
import { useSession } from "next-auth/react";

export default function HomePage() {

    return (
        <>
            <MaintenancePage title="Inicio" />
            <ButtonAuth />
        </>
    )
}