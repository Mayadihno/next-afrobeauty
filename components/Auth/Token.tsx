"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AlertCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ResetPassword from "./ResetPassword";

const FormSchema = z.object({
  token: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});
const Token = ({ token }: { token: string }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      token: "",
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const data = form.getValues("token");
    e.preventDefault();
    if (Number(token) === Number(data)) {
      setShowNotification(false);
      setOpen(true);
      toast.success("welldone you can now change your password");
    } else {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  };
  return (
    <>
      <div className="bg-white rounded-xl shadow-2xl p-6 flex justify-center items-center">
        <Form {...form}>
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            {showNotification && (
              <Alert
                variant="destructive"
                className="text-red-500 font-ebgaramond"
              >
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle className="text-base pl-2 font-semibold">
                    Incorrect Code
                  </AlertTitle>
                </div>
                <AlertDescription className="text-sm">
                  Wrong Token! Please Check the token and Enter again
                </AlertDescription>
              </Alert>
            )}
            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Code Here</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Please enter the 6-figure pass code sent to your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="">
              <Button
                type="submit"
                className="bg-[#B10C62] hover:bg-[#b10c61b6] text-white px-6 py-2"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
      {open && <ResetPassword setOpen={setOpen} />}
    </>
  );
};

export default Token;
