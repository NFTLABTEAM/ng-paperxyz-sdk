/** Possible types of events received from iFrame */
export type PaperSDKPayWithCardEventTypes =
  | 'payWithCardError'
  | 'payWithCardCancel'
  | 'paymentSuccess'
  | 'transferSuccess'
  | 'review'
  | 'openReviewPaymentPopupWindow';
