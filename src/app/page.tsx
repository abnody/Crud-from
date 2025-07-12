"use client";
import { z } from "zod";
import { useState } from "react";
import CrudForm from "./_Crud/page";
import { Button } from "@/components/ui/button";
import type { Field } from "../app/interface";

export default function Home() {
  const fields: Field[] = [
    { name: "email", type: "email", label: "Email", defaultValue:"abcd@gmail.com" },
    { name: "password", type: "password", label: "Password",defaultValue:"01127769663" },
    {
      name: "gender",
      type: "select",
      placeholder: "Select Gender",
      defaultValue:"female",
      options: [
        { value: "male", placeholder: "Male" },
        { value: "female", placeholder: "Female" },
      ],
    },
    { name: "dob", type: "date", placeholder: "Choose birth date", defaultValue:"2000-01-01" },
    { name: "terms", type: "checkbox", label: "Accept Terms", defaultValue: true },
  ];

  const validationSchema = z.object({
    email: z.string().email("Enter a valid Email"),
    password: z.string().min(10, "Password must be at least 10 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });


  const [isOpen, setIsOpen] = useState(false);
  const [operation, setOperation] = useState<"add" | "edit" | "review" >("add");

  return (
    <div className="p-6 space-y-4">
      {/* <h1 className="text-2xl font-bold">NASA Space Apps Form</h1> */}

      <div className="flex flex-wrap gap-2">
        <Button onClick={() => {
          setOperation("add");
          setIsOpen(true);
        }}>Add</Button>

        <Button onClick={() => {
          setOperation("edit");
          setIsOpen(true);
        }}>Edit</Button>

        <Button onClick={() => {
          setOperation("review");
          setIsOpen(true);
        }}>Review</Button>

      </div>

      {isOpen && (
        <CrudForm
          fields={fields}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          operation={operation}
          asDialog={true}
          validationSchema={validationSchema}
        />
      )}
    </div>
  );
}
