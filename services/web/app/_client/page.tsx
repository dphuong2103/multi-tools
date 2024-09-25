"use client";
import { LoadingContext } from "@/context/loading-provider";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "sonner";

export default function ClientPage() {
  const [text, setText] = useState("");
  const authAxios = useAxiosAuth();
  const [bookName, setBookName] = useState("");
  function fetchData(value: string) {
    console.log("value: ", value);
    toast(value);
  }

  const debounceFetchData = useDebounce(fetchData, 500);

  function onTextChange(value: string) {
    setText(value);
    debounceFetchData(value);
  }

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client");
    },
  });

  const { toggleIsLoading, isLoading } = useContext(LoadingContext);

  async function testGet() {
    try {
      var res = await authAxios.post(
        "http://localhost:8080/api/v1/books",
        JSON.stringify({
          name: bookName,
        }),
      );
      console.log("Res: ", res.data);
    } catch (e) {
      console.log("Error: ", e);
    }
  }

  async function testPost() {
    try {
      try {
        var res = await authAxios.put(
          "http://localhost:8080/api/v1/books",
          JSON.stringify({
            id: 1,
            name: bookName,
          }),
        );
        console.log("Res: ", res.data);
      } catch (e) {
        console.log("Error: ", e);
      }
    } catch (e) {
      console.log("Error: ", e);
    }
  }

  return (
    <section className="flex flex-col gap-6">
      <input value={text} onChange={(e) => onTextChange(e.target.value)} />
      <button onClick={testGet}>test Get</button>
      <input value={bookName} onChange={(e) => setBookName(e.target.value)} />
      <button onClick={testPost}>test post</button>
    </section>
  );
}
