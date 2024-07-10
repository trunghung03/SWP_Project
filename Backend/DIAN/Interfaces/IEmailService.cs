using DIAN_.Helper;
using DIAN_.Models;

namespace DIAN_.Interfaces
{
    public interface IEmailService
    {
        Task SendEmailAsync(MailRequest message);

        Task SendEmailReset(MailResetPassword message);

        Task<string> GetEmailConfirmBody(Purchaseorder order, string htmlTemplatePath);
    }
}
