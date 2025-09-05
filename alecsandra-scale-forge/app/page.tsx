"use client"

import { useQuery } from "@apollo/client/react";

import { MembersQueryData, MembersQueryVars } from "@/types/member";
import { GET_MEMBERS } from "@/lib/queries/members";

export default function Home() {
  
  const { data, loading, error, fetchMore } = useQuery<MembersQueryData, MembersQueryVars>(GET_MEMBERS, {
    variables: { first: 10 },
  });

  const members = data?.members?.edges.map((e: any) => e.node) ?? [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
               {members.map((m) => (
            <tr key={m.id}>
              <td className="px-4 py-2 border">{m.name || '--'}</td>
              <td className="px-4 py-2 border">{m.verificationStatus || '--'}</td>
              <td className="px-4 py-2 border">{m.emailAddress || '--'}</td>
              <td className="px-4 py-2 border">{m.mobileNumber || '--'}</td>
              <td className="px-4 py-2 border">{m.domain || '--'}</td>
              <td className="px-4 py-2 border">{m.status || '--'}</td>
              <td className="px-4 py-2 border">{m.dateTimeLastActive || '--'}</td>
            </tr>
//             dateTimeCreated:"2025-09-05T09:10:55.000Z"
// dateTimeLastActive:"2025-09-05T09:11:10.000Z"
// domain:null
// emailAddress:null
// id:"hdBeCc3tWrL6CD8fr"
// mobileNumber:"+639******374"
// name:"user395094031"
// status:"ACTIVE"
// verificationStatus:"VERIFIED"
// __typename:"Member"
// __typename:"Edge"
          ))}
            </ul>

          </>
          )
        }
      </main>
    </div>
  );
}
