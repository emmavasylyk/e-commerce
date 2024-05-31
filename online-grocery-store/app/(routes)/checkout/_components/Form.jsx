import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Form({ register, errors }) {
  return (
    <form>
      <div className="grid md:grid-cols-2 gap-10 mt-3">
        <Input type="text" {...register("username")} placeholder="Name" />
        <p className="text-red-500">{errors.username?.message}</p>

        <Input type="email" {...register("email")} placeholder="Email" />
        <p className="text-red-500">{errors.email?.message}</p>

        <Input type="number" {...register("phone")} placeholder="Phone" />
        <p className="text-red-500">{errors.phone?.message}</p>

        <Input type="number" {...register("zip")} placeholder="Zip" />
        <p className="text-red-500">{errors.zip?.message}</p>

        <Input type="text" {...register("address")} placeholder="Address" />
        <p className="text-red-500">{errors.address?.message}</p>
      </div>
    </form>
  );
}
