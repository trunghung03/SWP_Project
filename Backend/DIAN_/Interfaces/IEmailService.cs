using DIAN_.Helper;

namespace DIAN_.Interfaces
{
    public interface IEmailService
    {
        Task SendEmailAsync(MailRequest message);

        Task SendEmailReset(MailResetPassword message);
    }
}
