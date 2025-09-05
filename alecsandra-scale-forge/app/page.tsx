"use client";

import { useQuery } from "@apollo/client/react";
import { GET_MEMBERS } from "@/lib/queries/members";
import { MembersQueryData, MembersQueryVars, Member } from "@/types/member";
import { DataTable } from "@/components/DataTable";
import { memberColumns } from "@/lib/table/columns";

export default function Home() {
  const { data, loading, error } = useQuery<MembersQueryData, MembersQueryVars>(
    GET_MEMBERS,
    { variables: { first: 50 } } // fetch more for pagination demo
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const members: Member[] =
    data?.members?.edges
      .map((e) => e.node as Member)
      .filter((m) => m.name) ?? [];

  return (
    <div className="p-10 font-sans space-y-2">
      <h1 className="text-3xl">Members</h1>
      <p className="">View your members here.</p>
      <DataTable columns={memberColumns} data={members} />
    </div>
  );
}
