namespace DIAN_.VnPay
{
    public class VnPayIpn
    {
         public string vnp_TmnCode { get; set; }
        public decimal vnp_Amount { get; set; }
        public string vnp_BankCode { get; set; }
        public string vnp_BankTranNo { get; set; }
        public string vnp_CardType { get; set; }
        public string vnp_PayDate { get; set; }
        public string vnp_OrderInfo { get; set; }
        public int vnp_TransactionNo { get; set; }
        public int vnp_ResponseCode { get; set; }
        public int vnp_TransactionStatus { get; set; }
        public string vnp_TxnRef { get; set; }
        public string vnp_SecureHashType { get; set; }
        public string vnp_SecureHash { get; set; }
    }
}
