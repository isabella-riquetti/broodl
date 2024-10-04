import Dashboard from "@/components/Dashboard";
import Main from "@/components/Main";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Moodl · Dashboard"
};

export default function DashboardPage() {

    return (
        <Main>
            <Dashboard />
        </Main>
    )
}