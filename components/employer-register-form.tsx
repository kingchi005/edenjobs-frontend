"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert } from "./ui/alert";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import * as z from "zod";
import { format } from "path";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Textarea } from "./ui/textarea";
import {
  Select, SelectGroup, SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";
import ImageUploader from "@/components/ui/ImageUploader";
import Image from "next/image";
import { completEmployerRegistration } from "@/app/lib/auth/register-action";
import { formSchema, employerProfileFormSchema } from "@/app/lib/definitions";
import Link from "next/link";
import { useToast } from "./ui/use-toast";



const stepPage = {
  REGISTER: 1,
  QUESTIONARE: 2,
} as const;

const company_size_enum = ["small", "medium", "large", "others"];


export default function EmployerRegisterForm({ registerAction: completRegistration }: any) {
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<number>(stepPage.REGISTER);
  const [images, setImages] = useState<any>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const { toast } = useToast()
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.confirm_password !== values.password) {
      form.setError(
        "confirm_password",
        { message: "passwords don't match" },
        { shouldFocus: true }
      );
      return;
    }

    console.log(values);
    setStep(stepPage.QUESTIONARE);
  }

  const profileForm = useForm<z.infer<typeof employerProfileFormSchema>>({
    resolver: zodResolver(employerProfileFormSchema),
    defaultValues: {
      company_name: "sdfsdfs djc bndnsdh bsdncbsgdb ncnnsdbc nsdnhc bnsdnc bsdncx",
      company_email: "hedoca@zivune.om",
      company_description: "sdfsdfs djc bndnsdh bsdncbsgdb ncnnsdbc nsdnhc bnsdnc bsdncx",
      company_logo: [],
      company_website: "http://mic.cf/wefdo",
      company_size: "small",
      industry: "sdfsdfs djc bndnsdh bsdncbsgdb ncnnsdbc nsdnhc bnsdnc bsdncx",
      location: "sdfsdfs djc bndnsdh bsdncbsgdb ncnnsdbc nsdnhc bnsdnc bsdncx",
      culture: "sdfsdfs djc bndnsdh bsdncbsgdb ncnnsdbc nsdnhc bnsdnc bsdncx",
    },
  });

  async function onProfileFormSubmit(values: z.infer<typeof employerProfileFormSchema>) {

    setLoading(true)
    const employerdata = form.getValues()
    console.log(values);

    const { company_logo: img, ...value } = values
    img[0].file = {}
    const company_logo = img



    const response = await completRegistration(employerdata, { ...value, company_logo })
    // if (!response.ok) toast({ title: "Response", description: response.message })
    if (!response?.ok && response?.message) alert(response.message)
    console.log(response);
    setLoading(false)


  }




  if (step == stepPage.REGISTER)
    return (
      <>
        <Link className="flex flex-row items-center "
          // variant="ghost" 
          // size="icon" 
          href={"/"}
        >
          <ChevronLeft className="h-5 w-5" /> Home
        </Link>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4  justify-center items-center"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="King" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="Chi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Kingchi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Kingchi@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input placeholder="" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className=" md:flex-row content-start">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </>
    );

  if (step == stepPage.QUESTIONARE)
    return (
      <div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setStep(stepPage.REGISTER)}
        >
          <ChevronLeft className="h-5 w-5" /> Back
        </Button>
        <Form {...profileForm}>
          <form

            onSubmit={profileForm.handleSubmit(onProfileFormSubmit)}
            className="space-y-4 flex-col"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={profileForm.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company name</FormLabel>
                    <FormControl>
                      <Input placeholder="Kingchi co" {...field} />
                    </FormControl>
                    <FormDescription title="Your company name" />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={profileForm.control}
                name="company_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company email</FormLabel>
                    <FormControl>
                      <Input placeholder="chi@mail.co" {...field} />
                    </FormControl>
                    <FormDescription title="Your company email" />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={profileForm.control}
              name="company_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About your company</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your company"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">

              <FormField
                control={profileForm.control}
                name="company_logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Logo</FormLabel>
                    <FormControl>
                      <div className="relative flex md:col-span-2 ms-5">
                        <ImageUploader
                          images={field.value}
                          setImages={field.onChange}
                        />
                        {field.value.length > 0 && (<Image
                          width={60}
                          height={60}
                          alt="logo"
                          src={field.value[0].dataURL}
                        />)}
                      </div>
                    </FormControl>
                    <FormDescription title="Image (only jpeg, png) max-size 1mb" />

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={profileForm.control}
                name="company_website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company website URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://www.example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>{" "}
            <div className="grid grid-cols-2 gap-4">

              <FormField
                control={profileForm.control}
                name="company_size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company size</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="select one" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {company_size_enum.map(v => (
                            <SelectItem key={v} value={v}>{v}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={profileForm.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <FormControl>
                      <Input placeholder="Finance" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={profileForm.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company location</FormLabel>
                    <FormControl>
                      <Input placeholder="Lagos" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={profileForm.control}
                name="culture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company values</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us the culture and values of your company"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className=" md:flex-row">
              <Button disabled={loading} type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    );
}
