import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";
import Main from "@/components/Main";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Moodl · Dashboard"
};

export default function DashbaordPage() {
    const isAuthenticated = true;

    const children = isAuthenticated ? (
        <Dashboard />
    ) : (
        <Login />
    )


    return (
        <Main>
            {children}
        </Main>
    )
}