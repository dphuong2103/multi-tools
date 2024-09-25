// "use client";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { LoginFormModel, loginFormSchema } from "@/models/login-form";
// import { signIn } from "next-auth/react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useCallback, useMemo, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import TextInputFormField from "@/components/form-fields/text-input-form-field";
// import { Form } from "@/components/ui/form";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";

// interface LoginFormDetailsProps {
//   callbackUrl?: string;
// }

// export default function LoginFormDetails({
//   callbackUrl,
// }: LoginFormDetailsProps) {
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();
//   const form = useForm<LoginFormModel>({
//     resolver: zodResolver(loginFormSchema),
//     values: {
//       email: "",
//       password: "",
//     },
//   });

//   const { control, formState, handleSubmit } = useMemo(() => {
//     return form;
//   }, [form]);

//   const onValidSubmit = useCallback(
//     async (data: LoginFormModel) => {
//       setIsLoading(true);
//       try {
//         const res = await signIn("loginCredentials", {
//           email: data.email,
//           password: data.password,
//           redirect: false,
//         });

//         if (res?.ok) {
//           toast.success("Logged in successfully!");
//           router.push("http://localhost:3000");
//         } else {
//           toast.error("Invalid email or password!");
//         }
//       } catch (err) {
//         toast.error("There is something wrong, please try again later!");
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [setIsLoading, router],
//   );

//   return (
//     <Card className="mx-auto max-w-sm">
//       <CardHeader>
//         <CardTitle className="text-2xl">Login</CardTitle>
//         <CardDescription>
//           Enter your email below to login to your account
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Form {...form}>
//           <form onSubmit={handleSubmit(onValidSubmit)}>
//             <div className="grid gap-4">
//               <TextInputFormField
//                 control={control}
//                 name="email"
//                 label="Email"
//                 placeholder="example@gmail.com"
//                 required
//               />

//               <TextInputFormField
//                 control={control}
//                 name="password"
//                 label="Password"
//                 type="password"
//                 placeholder="*********"
//                 required
//               />
//               <Button type="submit" className="w-full" disabled={isLoading}>
//                 {isLoading ? <Loader2 /> : "Login"}
//               </Button>

//               <Button type="button" variant="outline" className="w-full">
//                 Login with Google
//               </Button>
//             </div>
//           </form>
//         </Form>

//         <div className="mt-4 text-center text-sm">
//           Don&apos;t have an account?{" "}
//           <Link href="/sign-up" className="underline">
//             Sign up
//           </Link>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
