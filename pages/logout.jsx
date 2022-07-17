import { useEffect } from "react";
import { supabase } from "../supabase";

export default function Logout() {
    useEffect(() => {
        async function out() {
            const { error } = await supabase.auth.signOut()
            location.href = "/";
        }
        out();
    })
}