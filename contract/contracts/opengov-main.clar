
;; title: opengov-main
;; version:
;; summary:
;; description:

(define-constant POOL_ADDRESS 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM)
(define-constant CONTRACT_OWNER tx-sender)
(define-constant ERR_UNAUTHORIZED (err u200))
(define-constant ERR_ID_DOES_NOT_EXIST (err u400))

(define-map Proposals { proposal-id: (string-ascii 23) } { 
      data-hash: (buff 32),
      proposer: principal
   }
)

(define-map Voters { address: principal, proposal-id: (string-ascii 23) } {
      decision: (string-ascii 8) 
   }
)

;; private functions

;; public functions

;; Creates a proposal which others can now delegate to with a unique id
(define-public  (create-proposal (id (string-ascii 23)) (proposal (buff 32)))
   (begin 
      ;; #[filter(proposal, id)]
      (map-set Proposals { proposal-id: id } { 
            data-hash: proposal,
            proposer: tx-sender
      })
      (ok id)
   )
)

(define-public (update-proposal (proposal-id (string-ascii 23)) (new-data-hash (buff 32)))
   (let 
      (
         (proposal (unwrap! (map-get? Proposals { proposal-id: proposal-id }) ERR_ID_DOES_NOT_EXIST))
         (proposer (get proposer proposal))
      )
      ;; #[filter(proposal-id, new-data-hash)]
      (asserts! (is-eq contract-caller proposer) ERR_UNAUTHORIZED)
      (ok (map-set Proposals { proposal-id: proposal-id } {data-hash: new-data-hash, proposer: tx-sender}))
   )
)

(define-public (delete-proposal (proposal-id (string-ascii 23))) 
   (begin
      ;; #[filter(proposal-id)]
      (asserts! (is-eq tx-sender CONTRACT_OWNER) ERR_UNAUTHORIZED)
      (ok (map-delete Proposals { proposal-id: proposal-id }))
   )
)

;; read-only functions
(define-read-only (get-proposal (proposal-id (string-ascii 23)))
   (map-get? Proposals { proposal-id: proposal-id })
)

(define-read-only (get-voter (address principal) (proposal-id (string-ascii 23)))
   (map-get? Voters { address: address, proposal-id: proposal-id })
)
 