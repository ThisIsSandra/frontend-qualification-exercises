
export interface Member {
  id: string;
  name: string;
  emailAddress: string;
  mobileNumber: string;
  domain: string;
  status: string;
  verificationStatus: string;
  dateTimeCreated: string;
  dateTimeLastActive: string;
}

export interface MembersData {
  members: {
    edges: { node: Member }[];
  };
}
