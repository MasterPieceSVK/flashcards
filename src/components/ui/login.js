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
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
require("dotenv").config();

export default function Login() {
  const formSchema = z.object({
    username: z.string(),
    password: z.string(),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
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
      console.log(e);
      if (e.request.status == 0) {
        form.setError("username", {
          type: "manual",
          message: "Network error. Please check your connection.",
        });
        form.setError("password", {
          type: "manual",
          message: "Network error. Please check your connection.",
        });
      } else if (e.response.status == 404) {
        form.setError("username", {
          type: "manual",
          message: "Login or password is invalid  ",
        });
      }
    },
  });

  async function handleLogin(values) {
    const user = {
      username: values.username,
      password: values.password,
    };

    loginMutation.mutate(user);
  }

  return (
    <div className="flex justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Login</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLogin)}
              className="space-y-4"
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Strong password ;)"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={loginMutation.isPending} type="submit">
                {loginMutation.isPending ? "Loading" : "Login"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
