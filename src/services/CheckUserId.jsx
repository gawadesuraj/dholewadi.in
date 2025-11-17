 import React, { useState } from "react";
import { supabase } from "./supabaseClient";
import PageHeader from "../components/common/PageHeader";
import Card from "../components/ui/Card";
import { z } from "zod";
import { toast } from "react-toastify";

function CheckUserId() {
  const [mobile, setMobile] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  // Zod schema for mobile validation
  const mobileSchema = z.string().regex(/^[6-9]\d{9}$/, "Invalid mobile number (10 digits starting with 6-9)");

  const handleSearch = async () => {
    setError("");
    setUserData(null);

    // Validate mobile number
    try {
      mobileSchema.parse(mobile.trim());
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      }
      return;
    }

    const { data, error } = await supabase
      .from("users")
      .select("id, name")
      .eq("mobile", mobile.trim())
      .single();

    if (error || !data) {
      setError("❌ No user found for this mobile number.");
    } else {
      setUserData(data);
    }
  };

  return (
    <div>
      <PageHeader
        title="Find Your User ID"
        subtitle="Enter your mobile number to find your registered User ID"
        breadcrumbs={[{ label: "Services", href: "/services" }, { label: "Find User ID", href: null }]}
      />

      <div className="container py-12">
        <Card>
          <div className="p-6 space-y-4">
            <input
              type="tel"
              placeholder="Enter your mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
            >
              Check User ID
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}
            {userData && (
              <div className="mt-4 text-center text-green-600">
                ✅ User Found! <br />
                <strong>Name:</strong> {userData.name} <br />
                <strong>User ID:</strong> {userData.id}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default CheckUserId;
