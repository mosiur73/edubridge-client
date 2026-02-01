"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel, } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import {  useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "This field is required"),
  password: z.string().min(8, "Minimum length is 8"),
  email: z.email(),
 role: z.enum(["STUDENT", "TUTOR"]),
});


export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
    const handleGoogleLogin = async () => {
    const data = authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    });

    // console.log(data);
  };
    
   const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
       role: "STUDENT",

    },
     validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({value}) =>{
          const toastId = toast.loading("Creating user");
      try {
        const { data, error } = await authClient.signUp.email(value);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        // toast.success("User Created Successfully", { id: toastId });
         toast.success("Account created successfully. Please login.", {
      id: toastId,
    });
    setTimeout(() => {
      router.push("/login");
    }, 1200);

      } catch (error) {
        toast.error("Something went wrong, please try again.", { id: toastId });
      }
    }
  })

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
        id="register-form"
        onSubmit={(e) =>{
          e.preventDefault();
          form.handleSubmit()
        }}>
        <FieldGroup>
           <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
             <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      type="email"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
             <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
                    <form.Field
  name="role"
  children={(field) => {
    return (
      <Field>
        <FieldLabel>Register as</FieldLabel>

        <div className="flex gap-4 mt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={field.name}
              value="STUDENT"
              checked={field.state.value === "STUDENT"}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            Student
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={field.name}
              value="TUTOR"
              checked={field.state.value === "TUTOR"}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            Tutor
          </label>
        </div>
      </Field>
    );
  }}
/>

        </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-5">
      <Button form="register-form" type="submit" className="w-full">
          Register
        </Button>
         <Button className="w-full"
                  onClick={() => handleGoogleLogin()}
                  variant="outline"
                  type="button"
                >
                  Continue with Google
                </Button>

                 <FieldDescription className="text-center">
         Already have an account? <Link href="/login">Login</Link>
         </FieldDescription>
      </CardFooter>
    </Card>
  );
}