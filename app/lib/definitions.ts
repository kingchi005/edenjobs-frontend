import * as z from "zod";

// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: "pending" | "paid";
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, "amount"> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: "pending" | "paid";
};

export type CustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer: {
    id: string;
    name: string;
  };
  amount: number;
  status: "pending" | "paid";
};

export const formSchema = z.object({
  first_name: z.string({ required_error: "First name is required" }),
  last_name: z.string({ required_error: "Last name is required" }),
  username: z
    .string({ required_error: "Username is required" })
    .min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  confirm_password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  // "role":"udjhgbv"
});

export const employerProfileFormSchema = z.object({
  company_name: z
    .string({ required_error: "Company name is required" })
    .min(1, { message: "Company name is required" }),
  company_email: z
    .string({ required_error: "Company email is required" })
    .email(),
  company_description: z
    .string({ required_error: "Company description is required" })
    .min(20, { message: "Company description nust be at least 10 words" }),
  company_logo: z
    .array(z.any({ required_error: "Company logo is required" }))
    .min(1, { message: "Please upload your company's logo" }),
  company_website: z.string().url(),
  company_size: z
    .string({ required_error: "Company size is required" })
    .min(1, { message: "Company industry is required" }),

  industry: z
    .string({ required_error: "Company industry is required" })
    .min(1, { message: "Company industry is required" }),
  location: z
    .string({ required_error: "Company location is required" })
    .min(1, { message: "Company location is required" }),
  culture: z
    .string({ required_error: "Company culture is required" })
    .min(1, { message: "Company culture is required" }),
});

export const applicantProfileFormSchema = z.object({
  /* 
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
  */
  job_type: z
    .string({ required_error: "Job type is required" })
    .min(1, { message: "job-type is required" }),
  company_size: z
    .string({ required_error: "Company size is required" })
    .min(1, { message: "Company size is required" }),

  job_field: z
    .string({ required_error: "Job fields is required" })
    .min(1, { message: "Job field is required" }),

  experience_level: z
    .string({ required_error: "Experience level is required" })
    .min(1, { message: "Experience level is required" }),

  avatar: z
    .array(z.any({ required_error: "Profile picture is required" }))
    .min(1, { message: "Please upload your  profile picture" }),
  skill_set: z
    .string({ required_error: "Skill set is required" })
    .min(1, { message: "Skill set is required" }),

  work_schedule: z
    .string({ required_error: "Work schedule is required" })
    .min(1, { message: "Work schedule is required" }),

  job_stability: z
    .string({ required_error: "Job stability is required" })
    .min(1, { message: "Job stability is required" }),

  location_type: z
    .string({ required_error: "Location type is required" })
    .min(1, { message: "Location type is required" }),

  location: z
    .string({ required_error: "Company location is required" })
    .min(1, { message: "location is required" }),
});
