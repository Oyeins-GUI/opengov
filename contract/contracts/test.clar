
(define-data-var my-list (list 16 int) (list))

(define-public (add-to-list (value int))
   ;; #[filter(value)]
   (ok (var-set my-list (unwrap-panic (as-max-len? (append (var-get my-list) value) u16))))
)

(define-read-only (see-list)
   (var-get my-list)
)
