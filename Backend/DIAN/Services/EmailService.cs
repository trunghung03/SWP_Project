﻿using DIAN_.Helper;
using DIAN_.Interfaces;
using DIAN_.Models;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace DIAN_.Services
{
    public class EmailService : IEmailService
    {
        private readonly EmailSettings emailSettings;

        public EmailService(IOptions<EmailSettings> options)
        {
            this.emailSettings = options.Value;
        }
        public async Task<string> GetEmailConfirmBody(Purchaseorder order, string htmlTemplatePath)
        {
            if (!System.IO.File.Exists(htmlTemplatePath))
            {
                throw new Exception($"Template file '{htmlTemplatePath}' not found.");
            }

            string htmlContent = await System.IO.File.ReadAllTextAsync(htmlTemplatePath);

            htmlContent = htmlContent.Replace("{orderId}", order.OrderId.ToString());
            htmlContent = htmlContent.Replace("{customerName}", order.Name);
            htmlContent = htmlContent.Replace("{date}", DateTime.UtcNow.ToString("yyyy-MM-dd"));
            htmlContent = htmlContent.Replace("{address}", order.ShippingAddress);
            htmlContent = htmlContent.Replace("{phoneNumber}", order.PhoneNumber);
            htmlContent = htmlContent.Replace("{total}", order.TotalPrice.ToString());

            return htmlContent;
        }

        public async Task<string> EmailPromotionBody(Promotion promo, string customerName, string htmlTemplatePath)
        {
            if (!System.IO.File.Exists(htmlTemplatePath))
            {
                throw new Exception($"Template file '{htmlTemplatePath}' not found.");
            }

            string htmlContent = await System.IO.File.ReadAllTextAsync(htmlTemplatePath);

            htmlContent = htmlContent.Replace("{promoName}", promo.Name);
            htmlContent = htmlContent.Replace("{promoStart}", promo.ValidFrom.ToString("dd-MM"));
            htmlContent = htmlContent.Replace("{promoEnd}", promo.ValidTo.ToString("dd-MM"));
            htmlContent = htmlContent.Replace("{customerName}", customerName);
            htmlContent = htmlContent.Replace("{promoDesc}", promo.Description);
            htmlContent = htmlContent.Replace("{promoCode}", promo.Code);

            return htmlContent;
        }

        public async Task SendEmailAsync(MailRequest message)
        {
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(emailSettings.Email);
            email.To.Add(MailboxAddress.Parse(message.ToEmail));
            email.Subject = message.Subject;
            var builder = new BodyBuilder();

            //if (message.Attachments != null && message.Attachments.Any())
            //{
            //    byte[] fileBytes;
            //    foreach (var file in message.Attachments)
            //    {
            //        if (file.Length > 0)
            //        {
            //            using (var ms = new MemoryStream())
            //            {
            //                file.CopyTo(ms);
            //                fileBytes = ms.ToArray();
            //            }
            //            builder.Attachments.Add(file.FileName, fileBytes, ContentType.Parse(file.ContentType));
            //        }
            //    }
            //}

            builder.HtmlBody = message.Body;
            email.Body = builder.ToMessageBody();

            using var smtp = new SmtpClient();
            smtp.Connect(emailSettings.Host, emailSettings.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(emailSettings.Email, emailSettings.Password);
            await smtp.SendAsync(email);
            smtp.Disconnect(true);
        }

        public async Task SendEmailReset(MailResetPassword message)
        {
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(emailSettings.Email);
            email.To.Add(MailboxAddress.Parse(message.ToEmail));
            email.Subject = message.Subject;

            var builder = new BodyBuilder();
            builder.HtmlBody = message.Body;
            email.Body = builder.ToMessageBody();

            using var smtp = new SmtpClient();
            smtp.Connect(emailSettings.Host, emailSettings.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(emailSettings.Email, emailSettings.Password);
            await smtp.SendAsync(email);
            smtp.Disconnect(true);
        }
    }
}   
