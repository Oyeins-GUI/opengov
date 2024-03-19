import {
   BooleanCV,
   BufferCV,
   OptionalCV,
   PrincipalCV,
   ResponseErrorCV,
   ResponseOkCV,
   StringAsciiCV,
   TupleCV,
   UIntCV,
} from "@stacks/transactions";

// readonly functions
export type GetProposal = {
   functionName: "get-proposal";
   functionArgs: [proposal_id: StringAsciiCV];
   functionReturn: OptionalCV<
      TupleCV<{ "data-hash": BufferCV; proposer: PrincipalCV }>
   >;
};

export type GetVoter = {
   functionName: "get-voter";
   functionArgs: [address: PrincipalCV, proposal_id: StringAsciiCV];
   functionReturn: OptionalCV<TupleCV<{ decision: StringAsciiCV }>>;
};

// public functions
export type CreateProposal = {
   functionName: "create-proposal";
   functionArgs: [id: StringAsciiCV, proposal: BufferCV];
   functionReturn: ResponseOkCV<StringAsciiCV> | ResponseErrorCV<never>;
};

export type DeleteProposal = {
   functionName: "delete-proposal";
   functionArgs: [proposal_id: StringAsciiCV];
   functionReturn: ResponseOkCV<BooleanCV> | ResponseErrorCV<UIntCV>;
};

export type UpdateProposal = {
   functionName: "update-proposal";
   functionArgs: [proposal_id: StringAsciiCV, new_data_hash: BufferCV];
   functionReturn: ResponseOkCV<BooleanCV> | ResponseErrorCV<UIntCV>;
};

// contract type
export type OpengovMainContract =
   | GetProposal
   | GetVoter
   | CreateProposal
   | DeleteProposal
   | UpdateProposal;
