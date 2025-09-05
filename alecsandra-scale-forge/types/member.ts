export interface Member {
  id: string;
  name: string;
  verificationStatus: string;
  emailAddress: string;
  mobileNumber: string;
  domain: string;
  dateTimeCreated: string;
  dateTimeLastActive: string;
  status: string;
}

export interface MembersQueryData {
  members: {
    edges: { node: Member }[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
}

export interface MembersQueryVars {
  first: number;
  after?: string | null;
  filter?: {
    status?: string;
    verificationStatus?: string;
    // add other filters if needed
  };
}