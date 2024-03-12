"use client";
import Nav from "@/components/ui/nav";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import UserInfo from "@/components/ui/UserInfo";

export default function UserPage({ params }) {
  const [user, setUser] = useState("");
  const [userInfo, setUserInfo] = useState();
  const [authenticated, setAuthenticated] = useState(true);
  const authMutation = useMutation({
    mutationFn: async (auth) => {
      const token = localStorage.getItem("token");
      return axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/users/${auth}`,
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
        `${process.env.NEXT_PUBLIC_BASEURL}/userInfo`,
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
      {userInfo && <UserInfo info={userInfo} />}
    </div>
  ) : (
    <p>No rights to access this account </p>
  );
}
