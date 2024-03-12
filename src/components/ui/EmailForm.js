import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./button";
import { Input } from "./input";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function EmailForm() {
  const formSchema = z.object({
    email: z.string().email(),

    password: z.string().min(8).max(15),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const changeEmailMutation = useMutation({
    mutationFn: async (obj) => {
      const token = localStorage.getItem("token");
      return axios.put(
        `${process.env.NEXT_PUBLIC_BASEURL}/account/change-email`,
        { newEmail: obj.email, actualPassword: obj.password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: async () => {
      location.reload();
    },
    onError: (e) => {
      console.log(e);
      if (e.response.status == 401) {
        form.setError("password", {
          type: "manual",
          message: "Wrong password",
        });
      } else if (e.response.status == 404) {
        form.setError("email", {
          type: "manual",
          message: "This email is already being used",
        });
      } else {
        form.setError("password", {
          type: "manual",
          message: "Failed to change email",
        });
      }
    },
  });

  function handleEmailChange(e) {
    changeEmailMutation.mutate(e);
  }
  return (
    <div className="p-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleEmailChange)}
          className="space-y-5"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="New Email" {...field} />
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
              disabled={changeEmailMutation.isPending}
              type="submit"
            >
              {changeEmailMutation.isPending ? "Loading" : "Change"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
