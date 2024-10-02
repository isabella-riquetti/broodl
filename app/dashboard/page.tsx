import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";
import Main from "@/components/Main";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Broodl · Dashboard"
};

export default function DashbaordPage() {
    const isAuthenticated = false;

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