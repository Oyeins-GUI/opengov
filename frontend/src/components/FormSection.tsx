import { UseFormRegister } from "react-hook-form"
import { DefaultFormValues } from "./ProposalForm"

type FormSelect = {
   register: UseFormRegister<DefaultFormValues>
   setError: React.Dispatch<React.SetStateAction<string>>
}

export default function FormSection({ register, setError }: FormSelect) {
   return (
      <select id="niche" {...register("niche")} onChange={() => setError("")}>
         <option value="none">Select Niche</option>
         <option value="developer-tooling">Developer Tooling</option>
         <option value="games">Games</option>
         <option value="growth">Growth</option>
         <option value="nft">NFT</option>
         <option value="irl-event">IRL Event</option>
         <option value="research">Research</option>
         <option value="nodes">Nodes</option>
         <option value="infrastructure">Infrastructure</option>
         <option value="community">Community</option>
         <option value="defi">DeFi</option>
         <option value="developer-education">Developer Education</option>
         <option value="bns">BNS</option>
         <option value="sbtc">SBTC</option>
         <option value="social-impact">Social Impact</option>
         <option value="daos/governance">DAOs/Governance</option>
         <option value="stablecoins">Stablecoins</option>
         <option value="core-blockchain">Core Blockchain</option>
         <option value="ai">AI</option>
      </select>
   )
}
