import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { signUp } from "@/services/auth";
import Link from "next/link";
import { useAuthState } from "@/context/AuthContext";

const signupSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupForm() {
    const [submitStatus, setSubmitStatus] = useState<
        "idle" | "success" | "error"
    >("idle");
    const { logUserIn } = useAuthState();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data: SignupFormData) => {
        // Simulate API call
        try {
            // In a real application, you would send the data to your API here
            const { token, user } = await signUp(data);
            await logUserIn(user, token);
            console.log("Form submitted:", data);
            setSubmitStatus("success");
        } catch (error) {
            console.error("Submission error:", error);
            setSubmitStatus("error");
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>
                    Create your account to get started
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" {...register("username")} />
                        {errors.username && (
                            <p className="text-sm text-red-500">
                                {errors.username.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" {...register("email")} />
                        {errors.email && (
                            <p className="text-sm text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <Button type="submit" className="w-full pt-6 pb-6">
                        Sign Up
                    </Button>
                    <p className="text-sm text-grey-100 text-center">
                        Already have an account?{" "}
                        <Link className="text-blue-500" href="/signin">
                            Signin
                        </Link>
                    </p>
                </form>
            </CardContent>
            <CardFooter>
                {submitStatus === "success" && (
                    <Alert className="w-full">
                        <AlertDescription>
                            Signup successful! Check your email for
                            confirmation.
                        </AlertDescription>
                    </Alert>
                )}
                {submitStatus === "error" && (
                    <Alert className="w-full" variant="destructive">
                        <AlertDescription>
                            An error occurred. Please try again.
                        </AlertDescription>
                    </Alert>
                )}
            </CardFooter>
        </Card>
    );
}
