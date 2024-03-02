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

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [exists, setExists] = useState(false);
  const [wrongFormat, setWrongFormat] = useState(false);

  const router = useRouter();
  const signUpMutation = useMutation({
    mutationFn: async (newUser) => {
      return axios.post(`http://localhost:5000/signup`, newUser);
    },
    onSuccess: (data) => {
      router.push(`/users/${data.data.username}`);
      localStorage.setItem("token", data.data.token);
    },
    onError: (e) => {
      console.log(e);
      if (e.response.status == 409) {
        setExists(true);
        console.log(e.response.status);
      } else {
        setWrongFormat(true);
      }
    },
  });

  useEffect(() => {
    console.log(exists);
  }, [exists]);
  async function handleSignUp() {
    if (username && password && email) {
      const newUser = {
        username,
        password,
        email,
      };

      signUpMutation.mutate(newUser);
    }
  }

  return (
    <div className="flex justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Sign Up</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sign Up</DialogTitle>
            <DialogDescription>Sign Up</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                placeholder="flashcards@gmail.com"
                className="col-span-3"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                placeholder="At least 4 characters long, max. 15"
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
                placeholder="At least 8 characters long, max. 15 "
                className="col-span-3"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
          </div>
          {exists && (
            <p className="text-red-600 font-bold text-sm text-center">
              This username or email is already being used
            </p>
          )}
          {wrongFormat && (
            <div>
              <p className="text-red-600 font-bold text-sm text-center">
                Please submit the credentials in the following format:
              </p>
              <p className="text-red-600 font-bold text-sm text-center mt-2">
                Password: At least 8 characters long, max. 15 <br></br>{" "}
                Username: At least 4 characters long, max. 1
              </p>
            </div>
          )}
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleSignUp}
              disabled={signUpMutation.isPending}
            >
              Sign Up
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
