using DIAN_.VnPay;

namespace DIAN_.Services
{
    public interface IVnPayService
    {
        string CreatePaymentUrl(HttpContext context, VnPaymentRequestModel model);
        VnPaymentResponseModel PaymentExecute(IQueryCollection collections);

        Task<string> GenerateQRCodeAsync(VnPayQrRequestDto payQrRequest);

        Task<(string StatusCode, string Message)> PaymentUpdateDatabase(IQueryCollection collections);

    }
}
