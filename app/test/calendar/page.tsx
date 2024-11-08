import { auth } from "@/auth";
import React from "react";

export default async function page() {
  const session = await auth();

  const createCalendar = async (title: string) => {
    const response = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({
          summary: title,
        }),
      }
    );

    const data = await response.json();
    console.log(data);
  };

  createCalendar("Prueba Agendame :D");

  return <div>page</div>;
}
