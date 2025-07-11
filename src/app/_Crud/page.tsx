"use client"
import React, { Fragment, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


export default function CrudForm(props:any) {

    const {fields,isOpen,setIsOpen,asFullPage} = props;
    console.log(fields);
    const fullPageStyle="!w-screen !h-screen !max-w-none !p-8";
    const [date, setDate] = useState<Date>();

    return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}  >
        <form>
            <DialogContent className={`sm:max-w-[425px] ${asFullPage?fullPageStyle:null}`}>
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                    Make changes to your profile here. Click save when you&apos;re
                    done.
                    </DialogDescription>
                </DialogHeader>
                
                {fields.map((field:Field,index:number)=><Fragment key={index}>{
                ["text","tel","password","number","email","file"].includes(field.type)?
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">{`${field.label}`}</Label>
                            <Input id={`${field.name}`} name={`${field.name}`} type={`${field.type}`}/>
                        </div>
                    </div> :field.type=="select"?

                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={`${field.placeholder}`} />
                        </SelectTrigger>
                        <SelectContent>
                            {field.options?.map((option:FieldOption,index:number)=>
                              <SelectItem key={index} value={`${option.value}`}>{option.placeholder}</SelectItem>
                            )}
                        </SelectContent>
                    </Select>
                    
                    :field.type=="date"?

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                            variant="outline"
                            data-empty={!date}
                            className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
                            >
                            <CalendarIcon />
                            {date ? format(date, "PPP") : <span>{`${field.placeholder}`}</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={date} onSelect={setDate} />
                        </PopoverContent>
                    </Popover>
                    
                    :field.type=="checkbox"?
                    
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <Checkbox id="terms" />
                            <Label htmlFor="terms">{`${field.label}`}</Label>
                        </div>
                    </div>

                    :null
                
                }</Fragment>
                )}
                <DialogFooter>
                    <DialogClose asChild >
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Submit</Button>
                </DialogFooter>
            </DialogContent>
        </form>
    </Dialog>
    )
}
