
(define-public (test (proposal-id uint) (amount uint)) 
   (contract-call? .opengov delegate proposal-id amount)
)

(define-public (test-like (proposal-id uint)) 
   (contract-call? .opengov like-proposal proposal-id)
)
