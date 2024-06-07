using DIAN_.Helper;

namespace DIAN_.Services
{
    public interface IEmailService
    {
        Task SendEmailAsync(MailRequest message);
    }
}
