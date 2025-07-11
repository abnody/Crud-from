"use client"
import Image from "next/image";
import CrudForm from "./_Crud/page";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Home() {

  let fields:Field[] =[
    {
      name:"email",
      type:"email",
      label:"email"
    },
    {
      name:"password",
      type:"password",
      label:"password"
    },
    {
      name:"select",
      type:"select",
      placeholder:"Gender",
      options:[
        {
        value:"male",
        placeholder:"Male"
        },
        {
        value:"female",
        placeholder:"Female"
        },
      ]
    },
    {
      type:"date",
      name:"date",
      placeholder:"Choose your birth date"
    },
    {
      type:"checkbox",
      name:"checkbox",
      label:"Accept all condirions"
    }
  ]
  const [isOpen, setIsOpen] = useState(false);
 

  return <>
    <div>
      <div className="flex flex-wrap items-center gap-2 md:flex-row">
        <Button onClick={()=> setIsOpen(true)}>Button</Button>
      </div>
      
      {isOpen && <CrudForm isOpen={isOpen} setIsOpen={setIsOpen} fields={fields} operation="add"  ></CrudForm> }
      
    </div>
  </>

}
