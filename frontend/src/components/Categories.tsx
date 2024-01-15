type HandleClick = {
   handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => unknown
}

export default function Categories({ handleClick }: HandleClick) {
   return (
      <>
         <button className="category" data-name="all" onClick={(e) => handleClick(e)}>
            All
         </button>
         <button className="category" data-name="developer-tooling" onClick={(e) => handleClick(e)}>
            Developer Tooling
         </button>
         <button className="category" data-name="games" onClick={(e) => handleClick(e)}>
            Games
         </button>
         <button className="category" data-name="growth" onClick={(e) => handleClick(e)}>
            Growth
         </button>
         <button className="category" data-name="nft" onClick={(e) => handleClick(e)}>
            NFT
         </button>
         <button className="category" data-name="irl-event" onClick={(e) => handleClick(e)}>
            IRL Event
         </button>
         <button className="category" data-name="research" onClick={(e) => handleClick(e)}>
            Research
         </button>
         <button className="category" data-name="nodes" onClick={(e) => handleClick(e)}>
            Nodes
         </button>
         <button className="category" data-name="infrastructure" onClick={(e) => handleClick(e)}>
            Infrastructure
         </button>
         <button className="category" data-name="community" onClick={(e) => handleClick(e)}>
            Community
         </button>
         <button className="category" data-name="defi" onClick={(e) => handleClick(e)}>
            DeFi
         </button>
         <button className="category" data-name="developer-education" onClick={(e) => handleClick(e)}>
            Developer Education
         </button>
         <button className="category" data-name="btc-to-stacks-connections" onClick={(e) => handleClick(e)}>
            BTC to Stacks Connection
         </button>
         <button className="category" data-name="bns" onClick={(e) => handleClick(e)}>
            BNS
         </button>
         <button className="category" data-name="sbtc" onClick={(e) => handleClick(e)}>
            SBTC
         </button>
         <button className="category" data-name="social-network" onClick={(e) => handleClick(e)}>
            Social Impact
         </button>
         <button className="category" data-name="daos/governance" onClick={(e) => handleClick(e)}>
            DAOs/Governance
         </button>
         <button className="category" data-name="stablecoins" onClick={(e) => handleClick(e)}>
            Stablecoins
         </button>
         <button className="category" data-name="core-blockchain" onClick={(e) => handleClick(e)}>
            Core Blockchain
         </button>
         <button className="category" data-name="ai" onClick={(e) => handleClick(e)}>
            AI
         </button>
      </>
   )
}
