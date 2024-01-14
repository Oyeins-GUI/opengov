import { Cl } from "@stacks/transactions";
import { describe, expect, it } from "vitest";

const accounts = simnet.getAccounts();
const deployer = accounts.get("deployer")!;
const address1 = accounts.get("wallet_1")!;
const address2 = accounts.get("wallet_2")!;

const id = 0
const title = "Open Gov"
const niche = "Governance"
const description = "Open Gov is a crowfunding platform on stacks blockchain"
const amountNeeded = 2500
const additionalResource = "https://docs.google.com/document/d/1OvPaYiKWuSkFCnEyufrXUVHeYhGphzysVz-gdV3JQ4c"
const amount = 2000000

const getProposalRes = {
   'additional-resource': {
     type: 13,
     data: 'https://docs.google.com/document/d/1OvPaYiKWuSkFCnEyufrXUVHeYhGphzysVz-gdV3JQ4c/edit?usp=drivesdk'
   },
   'amount-gotten': { type: 1, value: 0n },
   'amount-needed': { type: 1, value: 2500n },
   concluded: { type: 4 },
   description: {
     type: 13,
     data: 'Open Gov is a crowfunding platform on stacks blockchain'
   },
   dislikes: { type: 1, value: 0n },
   id: { type: 1, value: 1n },
   likes: { type: 1, value: 0n },
   niche: { type: 13, data: 'Governance' },
   proposer: {
     type: 5,
     address: {
       type: 0,
       version: 26,
       hash160: '7321b74e2b6a7e949e6c4ad313035b1665095017'
     }
   },
   title: { type: 13, data: 'Open Gov' }
}
 

describe("test create-proposal function", () => {
  it("should successfully create a proposal", () => {
    const { result } = simnet.callPublicFn(
      'opengov',
      'create-proposal',
      [
         Cl.stringAscii(title),
         Cl.stringAscii(niche),
         Cl.stringAscii(description),
         Cl.uint(amountNeeded),
         Cl.stringAscii(additionalResource)
      ],
      address1
   )

   expect(result).toBeOk(Cl.uint(id + 1))

   const getProposalResponse = simnet.callReadOnlyFn('opengov', 'get-proposal', [Cl.uint(id + 1)], address1)

   expect(getProposalResponse.result.value.data).toStrictEqual(getProposalRes);
  });
});
