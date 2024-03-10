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
import { Button } from "./button";
import { Input } from "./input";
import { useMutation } from "@tanstack/react-query";
import info from "../../../info";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function UsernameForm() {
  const router = useRouter();
  const formSchema = z.object({
    username: z.string().min(4).max(15),
    password: z.string().min(8).max(15),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const changeUsernameMutation = useMutation({
    mutationFn: async (obj) => {
      const token = localStorage.getItem("token");
      return axios.put(
        `${info}/account/change-username`,
        { newUsername: obj.username, password: obj.password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: async (data) => {
      console.log(data);
      await localStorage.setItem("token", data.data.token);
      router.push(`/users/${data.data.newUsername}`);
    },
    onError: (e) => {
      console.log(e);
      if (e.response.status == 401) {
        form.setError("password", {
          type: "manual",
          message: "Wrong password",
        });
      } else if (e.response.status == 404) {
        form.setError("username", {
          type: "manual",
          message: "This username is already being used",
        });
      } else {
        form.setError("password", {
          type: "manual",
          message: "Failed to change username",
        });
      }
    },
  });

  function handleUsernameChange(e) {
    changeUsernameMutation.mutate(e);
  }
  return (
    <div className="p-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUsernameChange)}
          className="space-y-5"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="New Username" {...field} />
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
                <FormControl>
                  <Input
                    type={"password"}
                    placeholder="Confirm with password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button
              className="bg-green-500 text-white hover:bg-green-800 hover:text-gray-300"
              disabled={changeUsernameMutation.isPending}
              type="submit"
            >
              {changeUsernameMutation.isPending ? "Loading" : "Change"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
