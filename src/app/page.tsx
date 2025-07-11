"use client";

import { useState } from "react";
import CrudForm from "./_Crud/page";
import { Button } from "@/components/ui/button";
import type { Field } from "../app/interface";

export default function Home() {
  const fields: Field[] = [
    { name: "email", type: "email", label: "Email" },
    { name: "password", type: "password", label: "Password" },
    {
      name: "gender",
      type: "select",
      placeholder: "Select Gender",
      options: [
        { value: "male", placeholder: "Male" },
        { value: "female", placeholder: "Female" },
      ],
    },
    { name: "dob", type: "date", placeholder: "Choose birth date" },
    { name: "terms", type: "checkbox", label: "Accept Terms" },
  ];

  const defaultValues = {
    email: "example@nasa.org",
    password: "123456",
    gender: "male",
    dob: "2000-01-01",
    terms: true,
  };

  const [isOpen, setIsOpen] = useState(false);
  const [operation, setOperation] = useState<"add" | "edit" | "review" | "update">("add");

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

        <Button onClick={() => {
          setOperation("update");
          setIsOpen(true);
        }}>Update</Button>
      </div>

      {isOpen && (
        <CrudForm
          fields={fields}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          operation={operation}
          asDialog={true}
          defaultValues={operation === "add" ? undefined : defaultValues}
        />
      )}
    </div>
  );
}
