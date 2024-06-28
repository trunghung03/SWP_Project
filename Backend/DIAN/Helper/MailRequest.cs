using System.Net.Mail;

namespace DIAN_.Helper
{
    public class MailRequest
    {
        public string ToEmail { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        //public IFormFileCollection Attachments { get; set; }
        //public List<Attachment> Attachments { get; set; } 
    }
}
