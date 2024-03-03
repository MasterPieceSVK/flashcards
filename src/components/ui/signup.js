// "use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import info from "../../../info";

export default function SignUp() {
  const formSchema = z.object({
    username: z.string().min(4).max(15),
    email: z.string().email(),
    password: z.string().min(8).max(15),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const signUpMutation = useMutation({
    mutationFn: async (newUser) => {
      console.log(form.formState);
      return axios.post(`${info}/signup`, newUser);
    },
    onSuccess: (data) => {
      console.log(data);
      localStorage.setItem("token", data.data.token);
      router.push(`/users/${data.data.username}`);
    },
    onError: (e) => {
      console.log(e);
      if (e.response.status == 409) {
        console.log(e.response.status);
      } else {
      }
    },
  });

  async function handleSignUp(values) {
    const newUser = {
      username: values.username,
      password: values.password,
      email: values.email,
    };

    signUpMutation.mutate(newUser);
  }

  return (
    <div className="flex justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Sign Up</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSignUp)}
              className="space-y-5"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Mysterious User" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="flashcards@gmail.com" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type={"password"}
                        placeholder="Strong password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={signUpMutation.isPending} type="submit">
                {signUpMutation.isPending ? "Loading" : "Sign Up"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
