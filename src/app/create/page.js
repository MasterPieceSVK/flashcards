"use client";
import Nav from "@/components/ui/nav";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Label } from "@/components/ui/label";

export default function Create() {
  const [questionCount, setQuestionCount] = useState(1);
  const [user, setUser] = useState("");
  const router = useRouter();
  const [checked, setChecked] = useState(true);
  // Define a function to generate the form schema dynamically
  function generateFormSchema(questionCount) {
    // Initialize the form schema with the setName field
    let formSchema = {
      setName: z.string().max(25),
    };

    // Add question and answer fields for each question
    for (let i = 0; i < questionCount; i++) {
      formSchema = {
        ...formSchema,
        [`question${i}`]: z.string().max(150),
        [`answer${i}`]: z.string().max(150),
      };
    }

    return z.object(formSchema);
  }

  // Use the generateFormSchema function to create the form schema
  const formSchema = generateFormSchema(questionCount);

  // Update the useForm call to use the dynamic form schema
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      setName: "Set Name",
      ...Array.from({ length: questionCount }, (_, i) => ({
        [`question${i}`]: "",
        [`answer${i}`]: "",
      })),
    },
  });

  const authMutation = useMutation({
    mutationFn: async (token) => {
      return axios.post(
        `http://localhost:5000/dashboard`,
        { sets: false },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    },
    onSuccess: (data) => {
      setUser(data.data.username);
    },
    onError: (e) => {
      console.log(e);
      router.push("/");
    },
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    authMutation.mutate(token);
  }, []);
  function handleAdd() {
    setQuestionCount(() => questionCount + 1);
  }

  const createSetMutation = useMutation({
    mutationFn: async (set) => {
      return axios.post(
        `http://localhost:5000/sets`,
        { set: set },
        {
          headers: { Authorization: `Bearer ${set.token}` },
        }
      );
    },
    onSuccess: () => {
      router.push("/dashboard");
    },
    onError: (e) => {
      console.log(e);
    },
  });

  function onSubmit(data) {
    // Initialize the new object
    let new_object = {
      token: localStorage.getItem("token"),
      setName: data["setName"],
      questionsAndAnswers: [],
      public: checked,
    };

    // Iterate over the data
    for (let i = 0; i < 4; i++) {
      // assuming there are 4 pairs of questions and answers
      let questionKey = "question" + i;
      let answerKey = "answer" + i;
      if (questionKey in data && answerKey in data) {
        // Create a new object for each question-answer pair
        let qa_pair = {
          question: data[questionKey],
          answer: data[answerKey],
        };
        // Append the qa_pair object to the "questionAndAnswers" array
        new_object["questionsAndAnswers"].push(qa_pair);
      }
    }

    const newSet = [new_object];
    console.log(newSet);
    createSetMutation.mutate(newSet);
  }
  function handleCheck() {
    checked ? setChecked(false) : setChecked(true);
  }
  return (
    <div>
      <Nav user={user} />
      <h1 className="text-center font-bold text-3xl mb-4">New set</h1>
      <div className="flex justify-center">
        <div className="xl:w-3/4 w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="setName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="text-center"
                        placeholder="Set name"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col flex-grow gap-3">
                {Array.from({ length: questionCount }, (_, i) => (
                  <div className="flex justify-around gap-2" key={i}>
                    <div className="w-full">
                      <FormField
                        control={form.control}
                        name={`question${i}`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="text-center"
                                placeholder={`Question ${i}`}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full">
                      <FormField
                        control={form.control}
                        name={`answer${i}`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="text-center"
                                placeholder={`Answer ${i}`}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}
                <Button onClick={handleAdd}>Add Question</Button>
              </div>
              <div className="flex justify-center items-center gap-9">
                <div className="flex justify-center items-center gap-2">
                  <Checkbox
                    onClick={handleCheck}
                    checked={checked}
                    id="terms"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Make set public?
                  </label>
                </div>

                <Button type="submit">Create</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
