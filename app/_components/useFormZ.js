'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function useFormZ(schema) {
  // استخدام useForm مع zodResolver
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all", // يحدث التحقق مع أي تغيير أو تحديث
    // de package btrbot ben al useForm we zod
    resolver: zodResolver(schema),
  });
  return { register, handleSubmit, setValue, reset, errors };
}
