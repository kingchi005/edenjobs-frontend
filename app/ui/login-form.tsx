"use client";
import { useFormState } from "react-dom";
import { loginAction } from "@/app/lib/auth/login-action";
import { lusitana } from "@/app/ui/fonts";
import { AtSymbolIcon, KeyIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "./button";
import Link from "next/link";
import EdenJobsLogo from "./acme-logo";

export default function LoginForm() {
  const initialState = {};
  const [state, dispatch] = useFormState(loginAction, initialState);
  return (
    <section className="h-screen">
      <div className="h-full">
        <div
          className="g-6 flex h-full flex-wrap items-center justify-center ">


          <div className="mb-12 md:mb-0 ">
            <form action={dispatch}>
              {/* <div className="flex flex-row items-center justify-start">
                <EdenJobsLogo />
                <p className="font-bold text-lg">EdenJobs</p>
              </div> */}
              <div
                className="flex flex-row items-center justify-between lg:justify-between mb-5">
                <p className="mb-0 mr-4 text-3xl">Login</p>
                <EdenJobsLogo />

              </div>

              {state?.message ? (
                <div className="mt-2 text-sm text-red-500 border border-red-500 p-2 mb-5"><p >{state.message}</p></div>
              ) : null}

              <div className="relative mb-6">
                <label
                  htmlFor="exampleFormControlInput2"
                  className=""
                >Email / Username
                </label>
                <input
                  type="text"
                  className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="exampleFormControlInput2" name="identifier"
                  placeholder="username or email" />
                {state?.errors?.identifier ? state.errors.identifier.map((err: string) => (
                  <div className="mt-2 text-sm text-red-500 border-red-500" key={err}><p >{err}</p></div>
                ))
                  : null}



              </div>

              <div className="relative mb-6">
                <label
                  htmlFor="exampleFormControlInput22"
                  className=""
                >Password
                </label>
                <input
                  type="password"
                  className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="exampleFormControlInput22"
                  name="password"
                  placeholder="Password" />
                {state?.errors?.password ? state.errors.password.map((err: string) => (
                  <div className="mt-2 text-sm text-red-500 border-red-500" key={err}><p >{err}</p></div>
                ))
                  : null}

              </div>

              <div className="mb-6 flex items-center justify-between">
                <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                  <input
                    className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                    type="checkbox"
                    value=""
                    id="exampleCheck2" />
                  <label
                    className="inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="exampleCheck2">
                    Remember me
                  </label>
                </div>

                <Link href="#!">Forgot password?</Link>
              </div>

              <div className="text-center lg:text-left">
                <Button
                  // type="submit"
                  className="inline-block w-full lg:w-auto rounded bg-[#3b71ca] px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#] "

                >
                  Login
                </Button>

                <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                  Don't have an account?
                  <Link href="/register"
                    className="text-danger ms-2 transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                  >Register</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

  );
}

function LoginButton() {
  return (
    <Button className="mt-4 w-full">
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
