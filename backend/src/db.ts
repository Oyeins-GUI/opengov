import sdk from "node-appwrite";

const client = new sdk.Client();
const ID = sdk.ID;

const databaseId = process.env.DATABASE_ID;
const proposalCollection = process.env.PROPOSAL_COLLECTION_ID;

client
   .setEndpoint(process.env.PROJECT_ENDPOINT || "") // Your API Endpoint
   .setProject(process.env.PROJECT_ID || "") // Your project ID
   .setKey(process.env.DATABASE_ID || ""); // Your secret API key
//  .setSelfSigned() // Use only on dev mode with a self-signed SSL cert

const database = new sdk.Databases(client);

export { databaseId, proposalCollection, database, ID };
