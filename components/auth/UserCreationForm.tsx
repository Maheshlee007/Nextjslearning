"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../ui/Input";
import Button from "../ui/Button";
import axios from "axios";
import { log } from "console";

interface UserFormData {
  username: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
}

export default function UserCreationForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<UserFormData>>({});

  const [formData, setFormData] = useState<UserFormData>({
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof UserFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<UserFormData> = {};

    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    // if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.firstname) newErrors.firstname = "First name is required";

    setErrors(newErrors);
    console.log("formData", formData, newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await axios.post("/api/auth/signup", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      //       const response = await axios({
      //   method: 'post',
      //   url: '/api/auth/signup',
      //   data: formData,
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // });

      console.log("Registration successful:", response.data);

      router.push("/signin"); // Redirect to login page after successful registration
    } catch (error) {
      console.error("Registration error:", error);
      setErrors((prev) => ({
        ...prev,
        username: "Registration failed. Please try again.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-2  mx-auto p-6 bg-white rounded-lg shadow grid grid-cols-2 gap-2"
    >
      {/* <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2> */}

      <Input
        label="Username"
        name="username"
        type="text"
        value={formData.username}
        onChange={handleChange}
        error={errors.username}
        required
      />

      <Input
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        required
      />

      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />

      <Input
        label="First Name"
        name="firstname"
        type="text"
        value={formData.firstname}
        onChange={handleChange}
        error={errors.firstname}
        required
      />

      <Input
        label="Last Name"
        name="lastname"
        type="text"
        value={formData.lastname}
        onChange={handleChange}
        error={errors.lastname}
      />

      <Button type="submit" className="w-full" isLoading={isLoading}>
        Create Account
      </Button>
    </form>
  );
}
