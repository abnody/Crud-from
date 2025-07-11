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

export default function CrudForm(props:any) {

    const {fields,isOpen,setIsOpen,asFullPage} = props;
    console.log(fields);
    const fullPageStyle="!w-screen !h-screen !max-w-none !p-8"

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
                field.type!='select'?

                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">{`${field.name}`}</Label>
                            <Input id={`${field.name}`} name={`${field.name}`} type={`${field.type}`}/>
                        </div>
                    </div> :

                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={`${field.name}`} />
                        </SelectTrigger>
                        <SelectContent>
                            {field.options?.map((option:FieldOption,index:number)=>
                              <SelectItem key={index} value={`${option.value}`}>{option.placeholder}</SelectItem>
                            )}
                        </SelectContent>
                    </Select>
                
                }</Fragment>
                )}
                <DialogFooter>
                    <DialogClose asChild >
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </form>
    </Dialog>
    )
}
