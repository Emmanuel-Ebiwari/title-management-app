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
import { signIn } from "@/services/auth";
import Link from "next/link";
import { useAuthState } from "@/context/AuthContext";

const signinSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

type SigninFormData = z.infer<typeof signinSchema>;

export default function SigninForm() {
    const [submitStatus, setSubmitStatus] = useState<
        "idle" | "success" | "error"
    >("idle");
    const { logUserIn } = useAuthState();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SigninFormData>({
        resolver: zodResolver(signinSchema),
    });

    const onSubmit = async (data: SigninFormData) => {
        // Simulate API call
        try {
            // In a real application, you would send the data to your API here
            const { token, user } = await signIn(data);
            await logUserIn(user, token);
            setSubmitStatus("success");
        } catch (error) {
            console.error("Submission error:", error);
            setSubmitStatus("error");
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>
                    Create your account to get started
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                    <Button type="submit" className="w-full">
                        Sign In
                    </Button>
                    <p className="text-sm text-grey-100 text-center">
                        Don't have an account?{" "}
                        <Link className="text-blue-500" href="/signup">
                            Signup
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
