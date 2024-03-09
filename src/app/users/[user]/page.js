"use client";
import Nav from "@/components/ui/nav";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import info from "../../../../info";
import UserInfo from "@/components/ui/UserInfo";

export default function UserPage({ params }) {
  const [user, setUser] = useState("");
  const [userInfo, setUserInfo] = useState();
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(true);
  const authMutation = useMutation({
    mutationFn: async (auth) => {
      const token = localStorage.getItem("token");
      return axios.post(
        `${info}/users/${auth}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    },
    onSuccess: (data) => {
      console.log(data);
      setUser(data.data.username);
      setAuthenticated(true);
    },
    onError: (e) => {
      console.log(e);

      setAuthenticated(false);
    },
  });

  const userInfoMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("token");

      return axios.post(
        `${info}/userInfo`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    },
    onSuccess: (data) => {
      setUserInfo(data.data);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  useEffect(() => {
    authMutation.mutate(params.user);
    if (authenticated) {
      userInfoMutation.mutate();
    }
  }, []);

  return authenticated ? (
    <div>
      <Nav user={user} />
      <UserInfo info={userInfo} />
    </div>
  ) : (
    <p>No rights to access this account </p>
  );
}
