import UserCreationForm from "@/components/auth/UserCreationForm";

export default function SignUpPage() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full ">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        🌟 Create Account
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Welcome to our platform! Sign up to get started
      </p>
      {/* Add your signup form here */}
      <UserCreationForm/>
    </div>
  );
}   