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
    },
    {
      name:"password",
      type:"password",
    },
    {
      name:"select",
      type:"select",
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

    }
  ]
  const [isOpen, setIsOpen] = useState(false);
 

  return <>
    <div>
      <div className="flex flex-wrap items-center gap-2 md:flex-row">
        <Button onClick={()=> setIsOpen(true)}>Button</Button>
      </div>
      
      {isOpen && <CrudForm isOpen={isOpen} setIsOpen={setIsOpen} fields={fields} operation="add" asFullPage ></CrudForm> }
      
    </div>
  </>

}
