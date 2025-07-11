import { useEffect, useState } from "react";
import apiClient from "@/api/apiClient";

export interface BloodDonationRequest {
  createdDate: any;
  medicalDeclarationForm(medicalDeclarationForm: any): void;
  id: string;
  code: string;
  fullName: string;
  bloodType: number;
  status: number;
  phoneNo?: string;
  email?: string;
  donatedDateRequest: string;
  reasonReject?: string;
  gender?: boolean;
  description?: string;
  addresss?: string;
  frontUrlIdentity?: string;
  backUrlIdentity?: string;
  age?: number;
  
  identityId?: string;
  healthCheckForm?: {
    note?: string;
  };
}

export default function useBloodDonationRequests() {
  const [data, setData] = useState<BloodDonationRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get("/blood-donation-requests/search");
      setData(response.data.records || []);
    } catch (err: any) {
      setError(err.message || "Lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchData();
    return () => controller.abort();
  }, []);

  return {
    data,
    loading,
    error,
    refresh: fetchData,
  };
}
