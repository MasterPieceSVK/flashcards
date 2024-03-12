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
import axios from "axios";
import { useRouter } from "next/navigation";

export default function PasswordForm() {
  const router = useRouter();
  const formSchema = z.object({
    oldPassword: z.string().min(8).max(15),
    newPassword: z.string().min(8).max(15),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: async (obj) => {
      const token = localStorage.getItem("token");
      return axios.put(
        `${process.env.NEXT_PUBLIC_BASEURL}/account/change-password`,
        { newPassword: obj.newPassword, oldPassword: obj.oldPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: async () => {
      localStorage.setItem("token", "");
      router.push("/browse");
    },
    onError: (e) => {
      console.log(e);
      if (e.response.status == 401) {
        form.setError("oldPassword", {
          type: "manual",
          message: "Wrong password",
        });
      } else if (e.response.status == 500) {
        form.setError("newPassword", {
          type: "manual",
          message: "Server Error",
        });
      } else {
        form.setError("newPassword", {
          type: "manual",
          message: "Failed to change password",
        });
      }
    },
  });

  function handlePasswordChange(e) {
    changePasswordMutation.mutate(e);
  }
  return (
    <div className="p-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handlePasswordChange)}
          className="space-y-5"
        >
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type={"password"}
                    placeholder="Old Password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type={"password"}
                    placeholder="New Password"
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
              disabled={changePasswordMutation.isPending}
              type="submit"
            >
              {changePasswordMutation.isPending ? "Loading" : "Change"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
