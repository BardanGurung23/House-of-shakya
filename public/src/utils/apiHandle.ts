import { PUBLIC_BACKEND_URL } from "../constants";

export async function getData(url: string) {
  // console.log(`${PUBLIC_BACKEND_URL}${url}`);
  const res = await fetch(`${PUBLIC_BACKEND_URL}${url}`, { cache: "no-store" });
  if (!res.ok) {
    console.log("error");
  }
  return res?.json();
}

export async function postData(url: string, data: any) {
  const res = await fetch(`${PUBLIC_BACKEND_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res?.json();
}
