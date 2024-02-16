import { Client, Databases, ID, Models } from "appwrite"

const client = new Client()
const databases = new Databases(client)

const databaseId = import.meta.env.VITE_DATABASE_ID
const proposalCollection = import.meta.env.VITE_PROPOSAL_COLLECTION_ID

client.setEndpoint(import.meta.env.VITE_PROJECT_ENDPOINT).setProject(import.meta.env.VITE_PROJECT_ID)

// console.log({ databaseId, proposalCollection })

export { client, databases, databaseId, proposalCollection, ID }
export type { Models }
