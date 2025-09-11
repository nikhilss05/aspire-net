import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export type DisabilityType = "Blind" | "Deaf" | "Wheelchair" | "Cognitive" | "Other";
export type UserRole = "traveler" | "admin";

export interface User {
  id: number;
  email: string;
  disability_type?: DisabilityType | null;
  role: UserRole;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface Hotel {
  id: number;
  name: string;
  address: string;
  has_ramps: boolean;
  has_accessible_toilets: boolean;
  has_braille_signage: boolean;
  has_auditory_cues: boolean;
  has_elevators: boolean;
}

export type VehicleType = "Standard" | "Wheelchair Van" | "Lift-Enabled Taxi";
export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Booking {
  id: number;
  user_id: number;
  pickup_location: string;
  dropoff_location: string;
  scheduled_time: string;
  vehicle_type: VehicleType;
  special_requirements?: string | null;
  status: BookingStatus;
  created_at: string;
}

export async function login(email: string, password: string): Promise<string> {
  const body = new URLSearchParams();
  body.set("username", email);
  body.set("password", password);
  const { data } = await api.post<TokenResponse>("/auth/login", body, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  localStorage.setItem("access_token", data.access_token);
  return data.access_token;
}

export async function register(payload: { email: string; password: string; disability_type?: DisabilityType | null; }): Promise<User> {
  const { data } = await api.post<User>("/auth/register", payload);
  return data;
}

export async function me(): Promise<User> {
  const { data } = await api.get<User>("/auth/me");
  return data;
}

export async function listHotels(filters?: Partial<Pick<Hotel, "has_ramps" | "has_accessible_toilets" | "has_braille_signage" | "has_auditory_cues" | "has_elevators">>): Promise<Hotel[]> {
  const { data } = await api.get<Hotel[]>("/hotels/", { params: filters });
  return data;
}

export async function createHotel(hotel: Omit<Hotel, "id">): Promise<Hotel> {
  const { data } = await api.post<Hotel>("/hotels/", hotel);
  return data;
}

export async function updateHotel(id: number, hotel: Omit<Hotel, "id">): Promise<Hotel> {
  const { data } = await api.put<Hotel>(`/hotels/${id}`, hotel);
  return data;
}

export async function deleteHotel(id: number): Promise<void> {
  await api.delete(`/hotels/${id}`);
}

export async function listMyBookings(): Promise<Booking[]> {
  const { data } = await api.get<Booking[]>("/bookings/me");
  return data;
}

export async function createBooking(payload: {
  pickup_location: string;
  dropoff_location: string;
  scheduled_time: string; // ISO string
  vehicle_type: VehicleType;
  special_requirements?: string;
}): Promise<Booking> {
  const { data } = await api.post<Booking>("/bookings/", payload);
  return data;
}

export async function listAllBookings(): Promise<Booking[]> {
  const { data } = await api.get<Booking[]>("/bookings/all");
  return data;
}

export async function updateBookingStatus(id: number, status: BookingStatus): Promise<Booking> {
  const { data } = await api.patch<Booking>(`/bookings/${id}/status`, { status });
  return data;
}

