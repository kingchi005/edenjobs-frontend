"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  formSchema as EmpRegformSchema,
  applicantProfileFormSchema,
  employerProfileFormSchema,
} from "@/app/lib/definitions";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email().min(2).max(50),
  password: z.string().min(6).max(100),
});

/*
export async function registerAction(  employerData: z.infer<typeof EmpRegformSchema>,
  employerProfile: z.infer<typeof employerProfileFormSchema>) {
   
  {
	"data": {
		"job_type": "part-time",
		"job_fields": "Finance",
		"experience_level": "entry-level",
		"company_size": "small",
		"skill_set": "none",
		"location": "Aba",
		"work_schedule": "night shift",
		"job_stability": "short term",
		"location_type": "remote",
		"job_field":"Tech",
		"user_details":7
	}
}
  

  
 
 
  const STRAPI_URL = process.env.STRAPI_URL;
  if (!STRAPI_URL) throw new Error("Missing STRAPI_URL environment variable.");
  const url = `${STRAPI_URL}/api/auth/local/register`;

  const validatedFields = formSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Login.",
    };
  }

  const { username, email, password } = validatedFields.data;

  try {
    const response: any = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
      cache: "no-cache",
    });

    const data = await response.json();
    if (!response.ok && data.error)
      return { ...prevState, message: data.error.message, errors: null };
    if (response.ok && data.jwt) cookies().set("jwt", data.jwt);
  } catch (error) {
    console.log("error: ", error);
    return { error: "Server error please try again later." };
  }
  redirect("/dashboard");
}
*/

export async function completApplicantRegistration(
  applicantData: z.infer<typeof EmpRegformSchema>,
  applicantProfile: z.infer<typeof applicantProfileFormSchema>
) {
  console.log(applicantData, applicantProfile);

  const STRAPI_URL = process.env.STRAPI_URL;
  const KEY = process.env.STRAPI_API_KEY;
  if (!STRAPI_URL || !KEY)
    throw new Error("Missing STRAPI_URL environment variable.");
  const reg_url = `${STRAPI_URL}/api/auth/local/register`;
  const upload_url = `${STRAPI_URL}/api/upload/`;
  const applicant_url = `${STRAPI_URL}/api/applicants`;

  // register user

  const { confirm_password, ...userData } = applicantData;

  try {
    const response: any = await fetch(reg_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      cache: "no-cache",
    });

    const data = await response.json();
    if (!response.ok || data.error) {
      console.log("data: ", data);

      return { ok: false, message: data.error.message, errors: data.error };
    }

    const user = data.user;
    if (data.jwt) cookies().set("jwt", data.jwt);

    // upload company_log

    const { avatar: img, ...value } = applicantProfile;
    const uri = img[0].dataURL;

    const avatar = await (await fetch(uri)).blob();

    const formData = new FormData();

    // formData.append("files", "");
    formData.append("files", avatar);

    const img_response = await fetch(upload_url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${KEY}`,
        // "content-type":
        //   "multipart/form-data; boundary=---011000010111000001101001",
      },
      body: formData,
      cache: "no-cache",
    });

    const imaeg_res = await img_response.json();

    if (!img_response.ok || imaeg_res.error) {
      console.log("imaeg_res: ", imaeg_res);
      return {
        ok: false,
        message: imaeg_res.error.message,
        errors: imaeg_res.error,
      };
    }

    // create applicant

    const { avatar: cl, ...otherDetails } = applicantProfile;

    const emp_prof = {
      data: {
        ...otherDetails,
        avatar: imaeg_res[0].url,
        user_details: user.id,
      },
    };

    const profile_response = await fetch(applicant_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${KEY}`,
      },
      body: JSON.stringify(emp_prof),
      cache: "no-cache",
    });

    const profile_res = await profile_response.json();

    if (!profile_response.ok || profile_res.error) {
      console.log("profile_res: ", profile_res);
      return {
        ok: false,
        message: profile_res.error.message,
        errors: profile_res.error,
      };
    }
    // return { ok: true, message: "Req received", user, imaeg_res, profile_res };
  } catch (error) {
    console.log("error: ", error);
    return { error: "Server error please try again later." };
  }
  redirect("/dashboard");

  // register employer here
}

export async function completEmployerRegistration(
  employerData: z.infer<typeof EmpRegformSchema>,
  employerProfile: z.infer<typeof employerProfileFormSchema>
) {
  const STRAPI_URL = process.env.STRAPI_URL;
  const KEY = process.env.STRAPI_API_KEY;
  if (!STRAPI_URL || !KEY)
    throw new Error("Missing STRAPI_URL environment variable.");
  const reg_url = `${STRAPI_URL}/api/auth/local/register`;
  const upload_url = `${STRAPI_URL}/api/upload/`;
  const emplolyer_url = `${STRAPI_URL}/api/employers`;

  // register user
  /* 
  {
	"email": "zitside@am.ace",
	"username": "Ausdting",
	"password": "testing",
  "first_name":"Katherine",
  "last_name":"Hughes",
  "role":"udjhgbv"
}
  */

  const { confirm_password, ...userData } = employerData;

  try {
    const response: any = await fetch(reg_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      cache: "no-cache",
    });

    const data = await response.json();
    if (!response.ok || data.error) {
      console.log("data: ", data);

      return { ok: false, message: data.error.message, errors: data.error };
    }

    const user = data.user;
    if (data.jwt) cookies().set("jwt", data.jwt);

    // upload company_log

    const { company_logo: img, ...value } = employerProfile;
    const uri = img[0].dataURL;

    const company_logo = await (await fetch(uri)).blob();

    const formData = new FormData();

    // formData.append("files", "");
    formData.append("files", company_logo);

    const img_response = await fetch(upload_url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${KEY}`,
        // "content-type":
        //   "multipart/form-data; boundary=---011000010111000001101001",
      },
      body: formData,
      cache: "no-cache",
    });

    const imaeg_res = await img_response.json();

    if (!img_response.ok || imaeg_res.error) {
      console.log("imaeg_res: ", imaeg_res);
      return {
        ok: false,
        message: imaeg_res.error.message,
        errors: imaeg_res.error,
      };
    }

    // create employer

    /* 
    {
	"data": {
		"company_name": "sdfsdfs djc bndnsdh bsdncbsgdb ncnnsdbc nsdnhc bnsdnc bsdncx",
		"company_email": "hedoca@zivune.om",
		"company_description": "sdfsdfs djc bndnsdh bsdncbsgdb ncnnsdbc nsdnhc bnsdnc bsdncx",
		"company_logo": STRAPI_URL+imaeg_res.url,
		"company_website": "http://mic.cf/wefdo",
		"company_size": "small",
		"industry": "sdfsdfs djc bndnsdh bsdncbsgdb ncnnsdbc nsdnhc bnsdnc bsdncx",
		"location": "sdfsdfs djc bndnsdh bsdncbsgdb ncnnsdbc nsdnhc bnsdnc bsdncx",
		"culture": "sdfsdfs djc bndnsdh bsdncbsgdb ncnnsdbc nsdnhc bnsdnc bsdncx"
    "user_details":user.id
	}
}
*/

    const { company_logo: cl, ...otherDetails } = employerProfile;

    const emp_prof = {
      data: {
        ...otherDetails,
        company_logo: imaeg_res[0].url,
        user_details: user.id,
      },
    };

    const profile_response = await fetch(emplolyer_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${KEY}`,
      },
      body: JSON.stringify(emp_prof),
      cache: "no-cache",
    });

    const profile_res = await profile_response.json();

    if (!profile_response.ok || profile_res.error) {
      console.log("profile_res: ", profile_res);
      return {
        ok: false,
        message: profile_res.error.message,
        errors: profile_res.error,
      };
    }
    // return { ok: true, message: "Req received", user, imaeg_res, profile_res };
  } catch (error) {
    console.log("error: ", error);
    return { error: "Server error please try again later." };
  }
  redirect("/employer/dashboard");

  // register employer here
}
