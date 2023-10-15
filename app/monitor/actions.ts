"use server";

import { apiCall } from "@/lib/api";
import { parse } from "@/lib/parser";

export default async function getDatabase() {
  const res = await apiCall(["sigrid", "monitor"], {});
  const page = await res.text();
  const database = await parse(page);
  return database;
}
