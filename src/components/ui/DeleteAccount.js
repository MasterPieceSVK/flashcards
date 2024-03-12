import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "./input";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function DeleteAccount() {
  const router = useRouter();
  const formSchema = z.object({
    password: z.string().min(8).max(15),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (obj) => {
      const token = localStorage.getItem("token");
      return axios.delete(
        `${process.env.NEXT_PUBLIC_BASEURL}/account/delete-account`,
        {
          data: {
            actualPassword: obj.password,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      localStorage.setItem("token", "");
      router.push("/browse");
    },
    onError: (e) => {
      console.log(e);
      if (e.response.status == 401) {
        form.setError("password", {
          type: "manual",
          message: "Wrong password",
        });
      } else if (e.response.status == 404) {
        form.setError("password", {
          type: "manual",
          message: "Invalid or no token",
        });
      } else if (e.response.status == 500) {
        form.setError("password", {
          type: "manual",
          message: "Server Error",
        });
      } else {
        form.setError("password", {
          type: "manual",
          message: "Failed to change username",
        });
      }
    },
  });

  function handleDelete(obj) {
    console.log("s");
    deleteMutation.mutate(obj);
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="destructive">Delete Account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
            <div className="p-2 mt-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleDelete)}
                  className="space-y-5"
                >
                  <FormLabel>Password</FormLabel>
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
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <Button variant="destructive" type="submit">
                        Yes delete my account
                      </Button>
                    </AlertDialogFooter>
                  </div>
                </form>
              </Form>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
