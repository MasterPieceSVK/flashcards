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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import UsernameForm from "./UsernameForm";
import EmailForm from "./EmailForm";
import PasswordForm from "./PasswordForm";
import DeleteAccount from "./DeleteAccount";
export default function EditAccount() {
  return (
    <div className="flex justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-white  ">
            <h1 class=" font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
              Edit Account Details
            </h1>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <h1 className="font-bold text-xl underline ">
            What would you like to do?
          </h1>

          <Accordion type="single" collapsible className="w-full">
            <h1 className="font-bold text-green-600">Change Credentials</h1>
            <AccordionItem value="item-1">
              <AccordionTrigger>Username</AccordionTrigger>
              <AccordionContent>
                <UsernameForm />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Email</AccordionTrigger>
              <AccordionContent>
                <EmailForm />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Password</AccordionTrigger>
              <AccordionContent>
                <PasswordForm />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="mt-5">
              <h1 className="font-bold text-red-500">Delete Account</h1>
              <AccordionTrigger>Delete Account</AccordionTrigger>
              <AccordionContent>
                <DeleteAccount />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </DialogContent>
      </Dialog>
    </div>
  );
}
