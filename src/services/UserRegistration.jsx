import React, { useState } from "react";
import PageHeader from "../components/common/PageHeader"
import Card from "../components/ui/Card";
import { supabase } from "../services/supabaseClient";
import { z } from "zod";
import DOMPurify from "dompurify";
import { toast } from "react-toastify";

function UserRegistration() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Zod schema for user registration validation
  const userRegistrationSchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name too long"),
    mobile: z.string().regex(/^[6-9]\d{9}$/, "Invalid mobile number (10 digits starting with 6-9)"),
    address: z.string().max(500, "Address too long").optional(),
  });

  const breadcrumbs = [
    { label: "Services", href: "/services" },
    { label: "User Registration", href: null },
  ];

  // ✅ Generate unique user ID like U1001, U1002...
  const generateUserId = (number) => {
    return `U${String(number).padStart(4, "0")}`;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    // Validate form using Zod
    try {
      userRegistrationSchema.parse({
        name: name.trim(),
        mobile: mobile.trim(),
        address: address.trim(),
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      }
      setSubmitting(false);
      return;
    }

    try {
      // Step 1️⃣ — Get last inserted user ID to generate next ID
      const { data: users, error: fetchError } = await supabase
        .from("users")
        .select("id")
        .order("created_at", { ascending: false })
        .limit(1);

      if (fetchError) throw fetchError;

      let newId = "U1001";
      if (users && users.length > 0) {
        const lastId = users[0].id.replace("U", "");
        newId = generateUserId(parseInt(lastId) + 1);
      }

      // Step 2️⃣ — Insert user into database with sanitized data
      const { error: insertError } = await supabase.from("users").insert([
        {
          id: newId,
          name: DOMPurify.sanitize(name.trim()),
          mobile: mobile.trim(), // Already validated as number
          address: DOMPurify.sanitize(address.trim()),
        },
      ]);

      if (insertError) throw insertError;

      setSuccessMsg(`✅ User registered successfully! Your User ID: ${newId}`);
      setName("");
      setMobile("");
      setAddress("");
    } catch (err) {
      console.error("Registration error:", err);
      setErrorMsg("Failed to register user. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="User Registration"
        subtitle="Register yourself to access online tax payment services"
        breadcrumbs={breadcrumbs}
      />

      <div className="container py-12">
        <Card>
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              🧍 Register User
            </h2>

            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter your mobile number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Address (optional)
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                {submitting ? "Registering..." : "Register"}
              </button>
            </form>

            {errorMsg && (
              <p className="text-red-500 text-center mt-4">{errorMsg}</p>
            )}
            {successMsg && (
              <p className="text-green-600 text-center mt-4">{successMsg}</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default UserRegistration;
