'use client'

import React, { Fragment, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { Field, FieldOption } from "../interface"

export default function CrudForm(props: {
  operation: "add" | "edit" | "review" | "update";
  fields: Field[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  asDialog?: boolean;
  defaultValues?: Record<string, any>;
}) {
  const { operation, fields, isOpen, setIsOpen, asDialog = true, defaultValues = {} } = props;

  const fullPageStyle = "!w-screen !h-screen !max-w-none !p-8";
  const [formValues, setFormValues] = useState(() =>
    fields.reduce((acc: any, field: Field) => {
      acc[field.name!] = defaultValues[field.name!] || (field.type === "checkbox" ? false : "");
      return acc;
    }, {})
  );

  const isReadOnly = operation === "review";
  const isDisabled = operation === "review";

  const handleChange = (name: string, value: any) => {
    setFormValues((prev: any) => ({ ...prev, [name]: value }));
  };

  const FormBody = (
    <>
      <DialogHeader>
        <DialogTitle>{operation.toUpperCase()} Form</DialogTitle>
        <DialogDescription>Fill out the fields and click save.</DialogDescription>
      </DialogHeader>

      <div className="space-y-4 mt-4">
        {fields.map((field: Field, index: number) => (
          <Fragment key={index}>
            {["text", "email", "password", "number"].includes(field.type) && (
              <div>
                <Label htmlFor={field.name}>{field.label}</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={formValues[field.name!] || ""}
                  onChange={(e) => handleChange(field.name!, e.target.value)}
                  readOnly={isReadOnly}
                />
              </div>
            )}

            {field.type === "select" && (
              <div>
                <Label>{field.placeholder}</Label>
                <Select
                  value={formValues[field.name!]}
                  onValueChange={(val) => handleChange(field.name!, val)}
                  disabled={isDisabled}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option: FieldOption, idx) => (
                      <SelectItem key={idx} value={option.value}>
                        {option.placeholder}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {field.type === "date" && (
              <div>
                <Label>{field.placeholder}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !formValues[field.name!] && "text-muted-foreground")}
                      disabled={isDisabled}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formValues[field.name!]
                        ? format(new Date(formValues[field.name!]), "PPP")
                        : field.placeholder}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={formValues[field.name!] ? new Date(formValues[field.name!]) : undefined}
                      onSelect={(date) =>
                        handleChange(field.name!, date?.toISOString().split("T")[0] || "")
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}

            {field.type === "checkbox" && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={field.name}
                  checked={formValues[field.name!] || false}
                  onCheckedChange={(val) => handleChange(field.name!, val)}
                  disabled={isDisabled}
                />
                <Label htmlFor={field.name}>{field.label}</Label>
              </div>
            )}
          </Fragment>
        ))}
      </div>

      <DialogFooter className="mt-6">
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        {!isReadOnly && <Button type="submit">{operation === "edit" ? "Update" : "Submit"}</Button>}
      </DialogFooter>
    </>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogContent className={`sm:max-w-[425px] ${!asDialog ? fullPageStyle : ""}`}>
          {FormBody}
        </DialogContent>
      </form>
    </Dialog>
  );
}
