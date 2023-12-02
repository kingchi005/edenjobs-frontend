"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
import * as z from "zod";
import { format } from "path";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectGroup, SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import ImageUploader from "@/components/ui/ImageUploader";
import Image from "next/image";
import { completEmployerRegistration } from "@/app/lib/auth/register-action";
import { formSchema, applicantProfileFormSchema } from "@/app/lib/definitions";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";



const stepPage = {
  REGISTER: 1,
  QUESTIONARE: 2,
} as const;

const company_size_enum = ["startup", "small", "medium", "large", "others"] as const;
const job_type_enum = ["part-time", "full-time", "contract"] as const;
const experience_level_enum = ["entry-level", "mid-level", "advance-level"] as const;
const work_schedule_enum = ["flexibly hours", "night shift", "day time"] as const;
const job_stability_enum = ["long term", "short term"] as const;
const location_type_enum = ["remote", "on-site"] as const;



export default function ApplicantRegisterForm({ registerAction: completRegistration }: any) {
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

  const profileForm = useForm<z.infer<typeof applicantProfileFormSchema>>({
    resolver: zodResolver(applicantProfileFormSchema),
    defaultValues: {
      avatar: [],
      job_field: job_type_enum[0],
      skill_set: "quickly, using, cool, typical",
      experience_level: experience_level_enum[1],
      job_type: job_type_enum[2],
      company_size: company_size_enum[Math.random() < .5 ? 1 : 0],
      work_schedule: work_schedule_enum[Math.random() < .5 ? 1 : 0],
      job_stability: job_stability_enum[Math.random() < .5 ? 1 : 0],
      location_type: location_type_enum[Math.random() < .5 ? 1 : 0],
      location: "",
    },
  });

  async function onProfileFormSubmit(values: z.infer<typeof applicantProfileFormSchema>) {

    setLoading(true)
    const employerdata = form.getValues()
    console.log(values);

    const { avatar: img, ...value } = values
    img[0].file = {}
    const avatar = img



    const response = await completRegistration(employerdata, { ...value, avatar })
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
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile picture</FormLabel>
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
                name="job_field"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Field</FormLabel>
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
                          {job_type_enum.map(v => (
                            <SelectItem key={v} value={v}>{v}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">

              <FormField
                control={profileForm.control}
                name="skill_set"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skill set</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Seperate each with comma eg (Voice over, Digital marketing, codin)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={profileForm.control}
                name="job_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job type</FormLabel>
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
                          {job_type_enum.map(v => (
                            <SelectItem key={v} value={v}>{v}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              /></div>
            <div className="grid grid-cols-2 gap-4">

              <FormField
                control={profileForm.control}
                name="experience_level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience level</FormLabel>
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
                          {experience_level_enum.map(v => (
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
              /></div>
            <div className="grid grid-cols-2 gap-4">

              <FormField
                control={profileForm.control}
                name="work_schedule"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Work schedule</FormLabel>
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
                          {work_schedule_enum.map(v => (
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
                name="job_stability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job stability</FormLabel>
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
                          {job_stability_enum.map(v => (
                            <SelectItem key={v} value={v}>{v}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              /></div>
            <div className="grid grid-cols-2 gap-4">

              <FormField
                control={profileForm.control}
                name="location_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location type</FormLabel>
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
                          {location_type_enum.map(v => (
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

            </div>

            <div className=" md:flex-row">
              <Button disabled={loading} type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    );
}
