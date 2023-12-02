// import EmployerRegisterForm from ""

import EmployerRegisterForm from "@/components/employer-register-form";
import Image from "next/image";
import { completApplicantRegistration, completEmployerRegistration } from '@/app/lib/auth/register-action';
import ApplicantRegisterForm from "../ui/register-form";

export default function RegisterPage() {
  return (
    <main className="flex items-center justify-center md:h-screen bg-blue-50">
      <div className="relative mx-auto flex w-full max-w-[550px] flex-col space-y-2.5 p-4  border bg-slate-50">
        <div className="flex h-20 w-full items-end rounded-lg  p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <Image
              src={"/logo.jpg"}
              alt="edenjobs-logo"
              className="rounded-md"
              width={80}
              height={80}
            />
          </div>
        </div>
        <ApplicantRegisterForm registerAction={completApplicantRegistration} />
      </div>
    </main>
  );
}
