import React, { useState } from "react";

import Input from "./Input";
import Label from "./Label";


export default function InputForm({label, htmlFor ,type, placeholder, name}) {
  return(
    <>
      <Label htmlFor={htmlFor}>{label}</Label>
      <Input type={type} placeholder={placeholder} name={name}/>
    </>
  )
}