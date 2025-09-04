"use client"

import { useQuery } from "@apollo/client/react";

import { Member, MembersData } from "@/types/member";
import { GET_MEMBERS } from "@/lib/queries/members";

export default function Home() {
  
  const { loading, error, data } = useQuery<MembersData>(GET_MEMBERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  
  // name: string;
  // emailAddress: string;
  // mobileNumber: string;
  // domain: string;
  // status: string;
  // verificationStatus: string;

  return (
    <div className="font-sans p-10">
      <main className="flex flex-col gap-[32px] row-start-2 items-start">

        {
          !error && !loading && data?.members.edges.length === 0 ? (
            <p>Something's wrong. Try something else.{` :(`}</p>
          )
          : (
          <>
            <h1>Members. You did it!{` :)`}</h1>
            <ul>
              {data?.members.edges.map(({ node }: { node: Member }) => (
                <li key={node.id} className="mb-4">
                  <div>{node.name} #{node.id}</div>
                  <div>Status: {node.status}</div>
                  <div>Domain: {node.domain || '--'}</div>
                  <div>Verification: {node.verificationStatus}</div>
                </li>
              ))}
            </ul>

          </>
          )
        }
      </main>
    </div>
  );
}
