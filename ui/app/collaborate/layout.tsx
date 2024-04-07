import NavBar from "@/app/components/navbar/navbar";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  async function getUser(): Promise<string> {
    const res = await fetch("http://localhost:3000/api/get-logged-in-user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      return data.email;
    } else {
      console.error("Failed to get logged in user");
      return "";
    }
  }

  const logout = async () => {
    "use server";
    const logout = await fetch("http://localhost:3000/api/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (logout.ok) {
      redirect("/sign-in");
    } else {
      console.error("Failed to logout user");
    }
  };

  const email = await getUser();
  return (
    <>
      <NavBar email={email} logout={logout} />{children}
    </>
  );
}
