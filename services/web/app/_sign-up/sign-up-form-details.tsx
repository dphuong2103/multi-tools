"use client"
import TextInputFormField from "@/components/form-fields/text-input-form-field"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { SignUpFormModel, signUpFormSchema } from "@/models/sign-up-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export default function SignUpForm() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const form = useForm<SignUpFormModel>(
        {
            resolver: zodResolver(signUpFormSchema),
            values: {
                email: "",
                password: "",
                confirmPassword: "",
                firstName: "",
                lastName: ""
            },
        }
    );

    const { control, formState, handleSubmit } = useMemo(() => {
        return form
    }, [form])

    const onValidSubmit = useCallback(
        async (data: SignUpFormModel) => {
            try {
                const res = await signIn("signUpCredentials", {
                    email: data.email,
                    password: data.password,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    redirect: false,
                });

                if (res?.ok) {
                    toast.success("Sign up successfully!");
                    router.push("http://localhost:3000");
                }
                else {
                    toast.error("Invalid email or password!");
                }
            } catch (err) {
                toast.error("There is something wrong, please try again later!");
            } finally {
                setIsLoading(false);
            }
        }, [setIsLoading, router]);

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">Sign Up</CardTitle>
                <CardDescription>
                    Enter your information to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onValidSubmit)}>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <TextInputFormField
                                    control={control}
                                    name="firstName"
                                    required
                                    label="First Name"
                                    placeholder="Max"
                                />
                                <TextInputFormField
                                    control={control}
                                    name="lastName"
                                    required
                                    label="Last Name"
                                    placeholder="Robinson"
                                />
                            </div>
                            <div className="grid gap-2">
                                <TextInputFormField
                                    control={control}
                                    name="email"
                                    required
                                    label="Email"
                                    placeholder="example@gmail.com"
                                />
                            </div>
                            <div className="grid gap-2">
                                <TextInputFormField
                                    control={control}
                                    name="password"
                                    required
                                    label="Password"
                                    placeholder="********"
                                    type="password"
                                />
                            </div>
                            <div className="grid gap-2">
                                <TextInputFormField
                                    control={control}
                                    name="confirmPassword"
                                    required
                                    label="Confirm password"
                                    placeholder="********"
                                    type="password"
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {
                                    isLoading ? <Loader2 /> : "Create an account"
                                }
                            </Button>
                            <Button variant="outline" className="w-full">
                                Sign up with GitHub
                            </Button>
                        </div>
                    </form>

                </Form>

                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link href="#" className="underline">
                        Sign in
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
