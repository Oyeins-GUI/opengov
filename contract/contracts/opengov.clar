
;; title: opengov
;; description:

(define-constant POOL_ADDRESS 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM)
(define-constant CONTRACT_OWNER tx-sender)
(define-constant ERR_UNAUTHORIZED (err u200))
(define-constant ERR_ID_DOES_NOT_EXIST (err u400))
(define-constant ERR_INVALID_AMOUNT (err u401))
(define-constant ERR_VOTED_ALREADY (err u402))
(define-constant ERR_STILL_IN_REVIEW (err u403))
(define-constant ERR_INVALID_ARGS (err u404))

(define-data-var proposals-id uint u0)
(define-data-var pool-percent uint u30)

(define-map Proposals { proposal-id: uint } { 
      id: uint,
      title: (string-ascii 50),
      niche: (string-ascii 30),
      problem: (string-ascii 700),
      solution: (string-ascii 700),
      milestone: (string-ascii 1000),
      amount-needed: uint,
      amount-gotten: uint,
      twitter: (string-ascii 128),
      discord: (string-ascii 128),
      likes: uint,
      dislikes: uint,
      in-review: bool,
      additional-resource: (string-ascii 128),
      proposer: principal
   }
)
(define-map Voters { address: principal, proposal-id: uint } {
      decision: (string-ascii 8) 
   }
)

;; private functions

;; Calculates the amount going to the pool, deduct it from the original amount
;; and transfer it to the proposer then transfer the deducted pool's amount to pool
(define-private (calculate-percentage (amount uint)) 
   (let
      (
         (amount-to-pool (/ (* (var-get pool-percent) amount) u10000))
         (amount-to-proposal (- amount amount-to-pool))
      )
      (try! (stx-transfer? amount-to-pool tx-sender POOL_ADDRESS))
      (ok { amount-to-proposal: amount-to-proposal })
   )
)

;; Checks the amount going to a proposal and decides whether it goes only to the proposal
;; or the proposals `amount-needed` to the proposal and the remainder to the pool
(define-private (transfer (proposal-id uint) (amount uint))
   (let
      (
         (proposal (unwrap! (map-get? Proposals { proposal-id: proposal-id }) ERR_ID_DOES_NOT_EXIST))
         (amount-needed (get amount-needed proposal))
         (amount-gotten (get amount-gotten proposal))
         (in-review (get in-review proposal))
         (proposer (get proposer proposal))
         (percentage (unwrap-panic (calculate-percentage amount)))
         (amount-to-proposal (get amount-to-proposal percentage))
         (remainder (- amount-needed amount-gotten))
      )
      (if (>= amount-to-proposal remainder)
         (if (> (- amount-to-proposal remainder) u0)
            (begin 
               (map-set Proposals { proposal-id: proposal-id } (merge proposal { amount-gotten: (+ amount-gotten remainder), in-review: true }))
               (try! (stx-transfer? remainder tx-sender proposer))
               (stx-transfer? (- amount-to-proposal remainder) tx-sender POOL_ADDRESS)
            )
            (begin 
               (map-set Proposals { proposal-id: proposal-id } (merge proposal { amount-gotten: (+ amount-gotten remainder), in-review: true }))
               (stx-transfer? remainder tx-sender proposer)
            )
         )
         (begin
            (map-set Proposals { proposal-id: proposal-id } (merge proposal { amount-gotten: (+ amount-gotten amount-to-proposal) }))
            (stx-transfer? amount-to-proposal tx-sender proposer)
         )
      )
   )
)

;; public functions

;; Creates a proposal which others can now delegate to with a unique id
(define-public  (create-proposal 
   (title (string-ascii 50))
   (niche (string-ascii 30))
   (problem (string-ascii 700))
   (solution (string-ascii 700))
   (milestone (string-ascii 1000))
   (twitter (string-ascii 128))
   (discord (string-ascii 128))
   (amount-needed uint)
   (additional-resource (string-ascii 128))
)
   (let 
      (
         (proposal-id (var-get proposals-id))
         (id (+ u1 proposal-id))
      )
      ;; #[filter(title, niche, problem, solution, milestone, amount-needed, additional-resource, twitter, discord)]
      (map-set Proposals { proposal-id: id } { 
            id: id,
            title: title, 
            niche: niche,
            problem: problem,
            solution: solution,
            milestone: milestone,
            amount-needed: amount-needed,
            amount-gotten: u0,
            twitter: twitter,
            discord: discord,
            likes: u0,
            dislikes: u0,
            in-review: true,
            additional-resource: additional-resource,
            proposer: tx-sender
      })
      ;; (asserts! (and (> u200 (len description)) (> amount-needed u1000)) ERR_INVALID_ARGS)
      (var-set proposals-id id)
      (ok id)
   )
)

(define-public (delegate (proposal-id uint) (amount uint))
   (let 
      (
         (proposal (unwrap! (map-get? Proposals { proposal-id: proposal-id }) ERR_ID_DOES_NOT_EXIST))
         (in-review (get in-review proposal))
      )
      ;; #[filter(proposal-id)]
      (asserts! (> amount u1) ERR_INVALID_AMOUNT)
      (asserts! (is-eq in-review true) ERR_STILL_IN_REVIEW)
      (transfer proposal-id amount)
   )
)

(define-public (like-proposal (proposal-id uint))
   (let
      (
         (proposal (unwrap! (map-get? Proposals { proposal-id: proposal-id }) ERR_ID_DOES_NOT_EXIST))
         (likes (get likes proposal))
         (updated-proposal (merge proposal { likes: (+ likes u1)}))
      )
      ;; #[filter(proposal-id)]
      (asserts! (is-none (map-get? Voters { address: tx-sender, proposal-id: proposal-id })) ERR_VOTED_ALREADY)
      (map-set Proposals { proposal-id: proposal-id} updated-proposal)
      (map-set Voters { address: tx-sender, proposal-id: proposal-id } { decision: "liked" })
      (print { id: proposal-id, likes: likes })
      (ok true)
   )
)

(define-public (dislike-proposal (proposal-id uint))
   (let
      (
         (proposal (unwrap! (map-get? Proposals { proposal-id: proposal-id }) ERR_ID_DOES_NOT_EXIST))
         (dislikes (get dislikes proposal))
         (updated-proposal (merge proposal { dislikes: (+ dislikes u1)}))
      )
      ;; #[filter(proposal-id)]
      (asserts! (is-none (map-get? Voters { address: tx-sender, proposal-id: proposal-id })) ERR_VOTED_ALREADY)
      (map-set Proposals { proposal-id: proposal-id} updated-proposal)
      (map-set Voters { address: tx-sender, proposal-id: proposal-id } { decision: "disliked" })
      (print { id: proposal-id, dislikes: dislikes })
      (ok true)
   )
)

(define-public (delete-proposal (proposal-id uint)) 
   (begin
      ;; #[filter(proposal-id)]
      (asserts! (is-eq tx-sender CONTRACT_OWNER) ERR_UNAUTHORIZED)
      (ok (map-delete Proposals { proposal-id: proposal-id }))
   )
)

;; read-only functions
(define-read-only (get-proposal (proposal-id uint))
   (map-get? Proposals { proposal-id: proposal-id })
)

(define-read-only (get-voter (address principal) (proposal-id uint))
   (map-get? Voters { address: address, proposal-id: proposal-id })
)

(define-read-only (get-proposal-likes (proposal-id uint))
   (let
      (
         (proposal (unwrap! (map-get? Proposals { proposal-id: proposal-id }) ERR_ID_DOES_NOT_EXIST))
         (likes (get likes proposal))
      )
      ;; #[filter(proposal-id)]
      (ok likes)
   )
)

(define-read-only (get-proposal-dislikes (proposal-id uint))
   (let
      (
         (proposal (unwrap! (map-get? Proposals { proposal-id: proposal-id }) ERR_ID_DOES_NOT_EXIST))
         (dislikes (get dislikes proposal))
      )
      ;; #[filter(proposal-id)]
      (ok dislikes)
   )
)