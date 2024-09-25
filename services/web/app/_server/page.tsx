import { options } from "../_api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

interface PageProps {
  data: { name: string }[];
}

export default async function ServerPage({ data }: PageProps) {
  console.log("data: ", data);
  // const session = await getServerSession(options)
  // if (!session) {
  //     redirect('/api/auth/signin?callbackUrl=/server')
  // }

  return (
    <section className="flex flex-col gap-6">{/* {session.user} */}</section>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = [{ name: "1" }, { name: "2" }, { name: "3" }];

  // Pass data to the page via props
  return { props: { res } };
}
