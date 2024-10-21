import { CONTACT_US_URL } from "@/constants/api";
import axios from "../axios";
import { CreateContactMessageRequest } from "@/types/request-types";

export function createContactMessage(request: CreateContactMessageRequest) {
  return axios.post(CONTACT_US_URL, JSON.stringify(request));
}
