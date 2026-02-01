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
  password: z.string().min(8, "Minimum length is 8"),
  email: z.email(),
});


export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
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
      email: "",
      password: "",
    },
     validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({value}) =>{
          const toastId = toast.loading("Login in user");
      try {
        const { data, error } = await authClient.signIn.email(value);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("User Login Successfully", { id: toastId });
          router.push("/");
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
        </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-5">
      <Button form="register-form" type="submit" className="w-full">
          Login
        </Button>
         <Button className="w-full"
                  onClick={() => handleGoogleLogin()}
                  variant="outline"
                  type="button"
                >
                  Continue with Google
                </Button>
                 <FieldDescription className="text-center">
         Don't have an account? <Link href="/register">SignUp</Link>
         </FieldDescription>
      </CardFooter>
      
    </Card>
  );
}