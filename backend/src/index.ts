import express from "express";
import { Request, Response } from "express";
import {
   StacksPayload,
   StacksTransactionContractCallKind,
} from "@hirosystems/chainhook-client";
import util from "util";
import dotenv from "dotenv";
import { databaseId, proposalCollection, database, ID } from "./db";

const app = express();
app.use(express.json());

dotenv.config();

app.post("/", (req: Request, res: Response) => {
   if (databaseId === undefined || proposalCollection === undefined) {
      return res.status(500).send({ message: "Something went wrong" });
   }

   const payload: StacksPayload = req.body;

   // console.log(
   //    util.inspect(payload, { showHidden: false, depth: null, colors: true })
   // );

   const { apply, chainhook, rollback } = payload;

   if (apply.length > 0) {
      const { timestamp, transactions, metadata: applyMetadata } = apply[0];

      for (let transaction of transactions) {
         console.log(transaction);
         const { transaction_identifier, metadata } = transaction;
         const { success, sender, kind, receipt } = metadata;

         const { data: kindData } = kind as StacksTransactionContractCallKind;
         const { args, contract_identifier, method } = kindData;

         args.forEach((arg) => console.log("contract arguments =>", arg));

         const { events } = receipt;

         const filteredEvent = events.find(
            (event) => event.type === "SmartContractEvent"
         );

         const {
            action,
            sender: txSender,
            time,
         } = (
            filteredEvent!.data as {
               contract_identifier: string;
               raw_value: string;
               topic: string;
               value: { action: string; sender: string; time: number };
            }
         ).value;

         const extracted = {
            args,
            event: action,
            sender: txSender,
            status: success === true ? "success" : "failure",
            time: time,
         };

         const createDocument = database.createDocument(
            databaseId,
            proposalCollection,
            transaction_identifier.hash,
            extracted
         );

         return res.status(201).send(createDocument);
      }

      if (rollback.length > 0) {
         const {
            timestamp,
            transactions,
            metadata: rollbackMetadata,
         } = rollback[0];

         for (let transaction of transactions) {
            let { transaction_identifier, metadata } = transaction;

            const deleted = database.deleteDocument(
               databaseId,
               proposalCollection,
               transaction_identifier.hash
            );
            return res.status(200).send(deleted);
         }
      }
   }
});

app.listen(3000, () => {
   console.log("Server is running on port 3000");
});
