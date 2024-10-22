import { Cl } from "@stacks/transactions";
import { describe, expect, it } from "vitest";

const accounts = simnet.getAccounts();
const deployer = accounts.get("deployer")!;
const address1 = accounts.get("wallet_1")!;
const address2 = accounts.get("wallet_2")!;

const id = 0;
const title = "Open Gov";
const niche = "Governance";
const problem =
   "There is no platform available for projects that are not yet ready for funding.";
const solution = "Creating that one platform";
const milestone = "Q1 & Q3";
const twitter = "@oyeins7";
const discord = "oyeins.dev";
const amountNeeded = 2500;
const additionalResource =
   "https://docs.google.com/document/d/1OvPaYiKWuSkFCnEyufrXUVHeYhGphzysVz-gdV3JQ4c/edit?usp=drivesdk";
const amount = 2000000;

const proposalResponse = {
   "additional-resource": {
      type: 13,
      data: "https://docs.google.com/document/d/1OvPaYiKWuSkFCnEyufrXUVHeYhGphzysVz-gdV3JQ4c/edit?usp=drivesdk",
   },
   "amount-gotten": { type: 1, value: 0n },
   "amount-needed": { type: 1, value: 2500n },
   concluded: { type: 4 },
   description: {
      type: 13,
      data: "Open Gov is a crowfunding platform on stacks blockchain",
   },
   dislikes: { type: 1, value: 0n },
   id: { type: 1, value: 1n },
   likes: { type: 1, value: 0n },
   niche: { type: 13, data: "Governance" },
   proposer: {
      type: 5,
      address: {
         type: 0,
         version: 26,
         hash160: "7321b74e2b6a7e949e6c4ad313035b1665095017",
      },
   },
   title: { type: 13, data: "Open Gov" },
};

describe("test create-proposal function", () => {
   it("should successfully create a proposal", () => {
      const { result } = simnet.callPublicFn(
         "opengov",
         "create-proposal",
         [
            Cl.stringAscii(title),
            Cl.stringAscii(niche),
            Cl.stringAscii(problem),
            Cl.stringAscii(solution),
            Cl.stringAscii(milestone),
            Cl.stringAscii(twitter),
            Cl.stringAscii(discord),
            Cl.uint(amountNeeded),
            Cl.stringAscii(additionalResource),
         ],
         address1
      );

      expect(result).toBeOk(Cl.uint(id + 1));
   });
});

describe("test delegate function", () => {
   // Create a proposal
   it("should successfully create a proposal and allow other users to delegate to the proposal", () => {
      const { result } = simnet.callPublicFn(
         "opengov",
         "create-proposal",
         [
            Cl.stringAscii(title),
            Cl.stringAscii(niche),
            Cl.stringAscii(problem),
            Cl.stringAscii(solution),
            Cl.stringAscii(milestone),
            Cl.stringAscii(twitter),
            Cl.stringAscii(discord),
            Cl.uint(amountNeeded),
            Cl.stringAscii(additionalResource),
         ],
         address1
      );

      expect(result).toBeOk(Cl.uint(id + 1));

      //  Delegate to the just created proposal
      const delegateResponse = simnet.callPublicFn(
         "opengov",
         "delegate",
         [Cl.uint(id + 1), Cl.uint(amount)],
         address2
      );

      expect(delegateResponse.result).toBeOk(Cl.bool(true));
   });

   it("should successfully create a proposal and fail when the amount is zero", () => {
      const { result } = simnet.callPublicFn(
         "opengov",
         "create-proposal",
         [
            Cl.stringAscii(title),
            Cl.stringAscii(niche),
            Cl.stringAscii(problem),
            Cl.stringAscii(solution),
            Cl.stringAscii(milestone),
            Cl.stringAscii(twitter),
            Cl.stringAscii(discord),
            Cl.uint(amountNeeded),
            Cl.stringAscii(additionalResource),
         ],
         address1
      );

      expect(result).toBeOk(Cl.uint(id + 1));

      //  Delegate to the just created proposal
      const delegateResponse = simnet.callPublicFn(
         "opengov",
         "delegate",
         [Cl.uint(id + 1), Cl.uint(0)],
         address2
      );

      expect(delegateResponse.result).toBeErr(Cl.uint(401));
   });
});

describe("test like proposal function", () => {
   it("should successfully create a proposal and allow other users to like the proposal", () => {
      const { result } = simnet.callPublicFn(
         "opengov",
         "create-proposal",
         [
            Cl.stringAscii(title),
            Cl.stringAscii(niche),
            Cl.stringAscii(problem),
            Cl.stringAscii(solution),
            Cl.stringAscii(milestone),
            Cl.stringAscii(twitter),
            Cl.stringAscii(discord),
            Cl.uint(amountNeeded),
            Cl.stringAscii(additionalResource),
         ],
         address1
      );

      expect(result).toBeOk(Cl.uint(id + 1));

      //  Like a proposal
      const likeProposalResponse = simnet.callPublicFn(
         "opengov",
         "like-proposal",
         [Cl.uint(id + 1)],
         address2
      );

      expect(likeProposalResponse.result).toBeOk(Cl.bool(true));
   });

   it("should successfully create a proposal and fail when when a user has already liked the proposal", () => {
      const { result } = simnet.callPublicFn(
         "opengov",
         "create-proposal",
         [
            Cl.stringAscii(title),
            Cl.stringAscii(niche),
            Cl.stringAscii(problem),
            Cl.stringAscii(solution),
            Cl.stringAscii(milestone),
            Cl.stringAscii(twitter),
            Cl.stringAscii(discord),
            Cl.uint(amountNeeded),
            Cl.stringAscii(additionalResource),
         ],
         address1
      );

      expect(result).toBeOk(Cl.uint(id + 1));

      //  Like proposal
      const likeProposalResponse = simnet.callPublicFn(
         "opengov",
         "like-proposal",
         [Cl.uint(id + 1)],
         address2
      );

      expect(likeProposalResponse.result).toBeOk(Cl.bool(true));

      const likeProposalResponse2 = simnet.callPublicFn(
         "opengov",
         "like-proposal",
         [Cl.uint(id + 1)],
         address2
      );

      expect(likeProposalResponse2.result).toBeErr(Cl.uint(402));
   });
});

describe("test dislike proposal function", () => {
   it("should successfully create a proposal and allow other users to dislike the proposal", () => {
      const { result } = simnet.callPublicFn(
         "opengov",
         "create-proposal",
         [
            Cl.stringAscii(title),
            Cl.stringAscii(niche),
            Cl.stringAscii(problem),
            Cl.stringAscii(solution),
            Cl.stringAscii(milestone),
            Cl.stringAscii(twitter),
            Cl.stringAscii(discord),
            Cl.uint(amountNeeded),
            Cl.stringAscii(additionalResource),
         ],
         address1
      );

      expect(result).toBeOk(Cl.uint(id + 1));

      //  Like a proposal
      const dislikeProposalResponse = simnet.callPublicFn(
         "opengov",
         "dislike-proposal",
         [Cl.uint(id + 1)],
         address2
      );

      expect(dislikeProposalResponse.result).toBeOk(Cl.bool(true));
   });

   it("should successfully create a proposal and fail when when a user has already disliked the proposal", () => {
      const { result } = simnet.callPublicFn(
         "opengov",
         "create-proposal",
         [
            Cl.stringAscii(title),
            Cl.stringAscii(niche),
            Cl.stringAscii(problem),
            Cl.stringAscii(solution),
            Cl.stringAscii(milestone),
            Cl.stringAscii(twitter),
            Cl.stringAscii(discord),
            Cl.uint(amountNeeded),
            Cl.stringAscii(additionalResource),
         ],
         address1
      );

      expect(result).toBeOk(Cl.uint(id + 1));

      //  dislike proposal
      const dislikeProposalResponse = simnet.callPublicFn(
         "opengov",
         "dislike-proposal",
         [Cl.uint(id + 1)],
         address2
      );

      expect(dislikeProposalResponse.result).toBeOk(Cl.bool(true));

      const dislikeProposalResponse2 = simnet.callPublicFn(
         "opengov",
         "dislike-proposal",
         [Cl.uint(id + 1)],
         address2
      );

      expect(dislikeProposalResponse2.result).toBeErr(Cl.uint(402));
   });
});

describe("test delete proposal function", () => {
   it("should successfully create a proposal and allow only proposer to delete it", () => {
      const { result } = simnet.callPublicFn(
         "opengov",
         "create-proposal",
         [
            Cl.stringAscii(title),
            Cl.stringAscii(niche),
            Cl.stringAscii(problem),
            Cl.stringAscii(solution),
            Cl.stringAscii(milestone),
            Cl.stringAscii(twitter),
            Cl.stringAscii(discord),
            Cl.uint(amountNeeded),
            Cl.stringAscii(additionalResource),
         ],
         address1
      );

      expect(result).toBeOk(Cl.uint(id + 1));

      //  delete a proposal
      const deleteProposalResponse = simnet.callPublicFn(
         "opengov",
         "delete-proposal",
         [Cl.uint(id + 1)],
         address1
      );

      expect(deleteProposalResponse.result).toBeOk(Cl.bool(true));
   });

   it("should successfully create a proposal and fail when its not the proposer deleting it", () => {
      const { result } = simnet.callPublicFn(
         "opengov",
         "create-proposal",
         [
            Cl.stringAscii(title),
            Cl.stringAscii(niche),
            Cl.stringAscii(problem),
            Cl.stringAscii(solution),
            Cl.stringAscii(milestone),
            Cl.stringAscii(twitter),
            Cl.stringAscii(discord),
            Cl.uint(amountNeeded),
            Cl.stringAscii(additionalResource),
         ],
         address1
      );

      expect(result).toBeOk(Cl.uint(id + 1));

      //  delete a proposal
      const deleteProposalResponse = simnet.callPublicFn(
         "opengov",
         "delete-proposal",
         [Cl.uint(id + 1)],
         address2
      );

      expect(deleteProposalResponse.result).toBeErr(Cl.uint(200));
   });
});
