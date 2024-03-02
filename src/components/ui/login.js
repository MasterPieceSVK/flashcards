// "use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

require("dotenv").config();

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [exists, setExists] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const loginMutation = useMutation({
    mutationFn: async (user) => {
      return axios.post("http://localhost:5000/login", user);
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.token);
      router.push(`/users/${data.data.username}`);
    },
    onError: (e) => {
      setWrong(false);
      setError(false);
      setExists(false);

      if (e.request.status == 0) {
        setError(true);
      }
      if (e.response.status == 409) {
        setExists(true);
        console.log(e.response.status);
      } else if (e.response.status == 404) {
        setWrong(true);
      } else {
        setError(true);
      }
    },
  });

  useEffect(() => {
    console.log(exists);
  }, [exists]);
  async function handleLogin() {
    if (username && password) {
      const user = {
        username,
        password,
      };

      loginMutation.mutate(user);
    }
  }

  return (
    <div className="flex justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Login</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>Login</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                placeholder="Mysterious User"
                className="col-span-3"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                placeholder="Strong Password ;)"
                className="col-span-3"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
          </div>
          {wrong && (
            <div>
              <p className="text-red-600 font-bold text-sm text-center">
                Incorrect username or password
              </p>
            </div>
          )}
          {error && (
            <div>
              <p className="text-red-600 font-bold text-sm text-center">
                Something went wrong{" "}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleLogin}
              disabled={loginMutation.isPending}
            >
              Login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
