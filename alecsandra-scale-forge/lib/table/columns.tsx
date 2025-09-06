"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Member } from "@/types/member";
import { Dot, Circle, CircleAlert, CircleCheck, Ban } from "lucide-react";

export const memberColumns: ColumnDef<Member>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue }) => {
        return <span className="text-[#FBBD2C]">{getValue<string>()}</span>;
    },
  },
  {
    accessorKey: "verificationStatus",
    header: "Verification Status",
    cell: ({ getValue }) => {
      const verification = getValue<string>();

      let color = "";
      let text = "--";
      let icon = <Circle className="w-2 h-2 fill-amber-50" />; // fallback dot
      const iconSize = 8;

      switch (verification) {
        case "VERIFIED":
          text = "Verified";
          color = "border border-[#12B76A] text-[#027A48]";
          icon = <Circle size={iconSize} className="fill-[#12B76A]" />;
          break;
        case "UNVERIFIED":
          text = "Unverified";
          color = "border border-[#F63D68] text-[#C01048]";
          icon = <Circle size={iconSize} className="fill-[#F63D68]" />;
          break;
        case "PENDING":
          text = "Pending";
          color = "border border-[#EF6820] text-[#B93815]";
          icon = <Circle size={iconSize} className="fill-[#EF6820]" />;
          break;
        default:
          color = "border border-[#12B76A] text-gray-400";
      }

      return (
        <span className={`inline-flex items-center gap-1 px-2 rounded-full font-medium ${color}`}>
          {icon}
          {text}
        </span>
      );
    },
  },
  {
    accessorKey: "balance",
    header: "Balance",
  },
  {
    accessorKey: "emailAddress",
    header: "Email address",
  },
  {
    accessorKey: "mobileNumber",
    header: "Mobile",
  },
  {
    accessorKey: "domain",
    header: "Domain",
  },
  {
    accessorKey: "dateTimeCreated",
    header: "Date Registered",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<string>();

      let color = "";
      let text = "--";
      let icon = <Circle className="w-2 h-2 fill-amber-50" />; // fallback dot
      const iconSize = 15;

      switch (status) {
        case "ACTIVE":
          text = "Active";
          color = "bg-[#053321] border border-[#12B76A] text-[#75E0A7]";
          icon = <CircleCheck size={iconSize} color="#75E0A7" strokeWidth={2} />
          break;
        case "VERIFICATION_LOCKED":
          text = "Blacklisted";
          color = "bg-[#55160C] border border-[#F63D68] bg text-[#FDA29B]";
          icon = <CircleAlert size={iconSize} color="#F04438" strokeWidth={2}/>;
          break;
        case "DISABLED":
          text = "Disabled";
          color = "border border-[#EF6820] text-[#CECFD2]";
          icon = <Ban size={iconSize} color="#85888E" strokeWidth={2} />;
          break;
        default:
          color = "border border-[#12B76A] text-gray-400";
      }

      return (
        <span className={`inline-flex items-center gap-1 px-2 rounded-full ${color}`}>
          {icon}          {text}
        </span>
      );
    },
  },
  {
    accessorKey: "dateTimeLastActive",
    header: "Last Active",
  },
];
