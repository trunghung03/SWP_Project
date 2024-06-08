using DIAN_.DTOs.AccountDTO;
using DIAN_.Interfaces;
using DIAN_.Models;
using DIAN_.Services;
using Microsoft.AspNetCore.Routing;
using UserApplication.Interfaces;
using NUnit.Framework;
using Moq;
using DIAN_.Helper;


namespace DIAN_.TestService
{
    [TestFixture]
    public class ResetPassword
    {
        [Test]
        public async Task ResetPasswordRequestAsync_ShouldSendEmail_WhenUserExists()
        {
            // Arrange
            var mockCustomerRepository = new Mock<ICustomerRepository>();
            var mockTokenService = new Mock<ITokenService>();
            var mockEmailService = new Mock<IEmailService>();
            var mockConfiguration = new Mock<IConfiguration>();

            var customerService = new CustomerService(mockCustomerRepository.Object, mockEmailService.Object, mockTokenService.Object, mockConfiguration.Object);

            var resetPasswordDto = new ForgotPasswordDto { Email = "test@example.com" };
            var user = new Customer { Email = "test@example.com" };
            var token = "testToken";

            mockCustomerRepository.Setup(x => x.GetByEmailAsync(resetPasswordDto.Email)).ReturnsAsync(user);
            mockTokenService.Setup(x => x.CreateCustomerToken(user)).Returns(token);

            // Act
            await customerService.ResetPasswordRequestAsync(resetPasswordDto);

            // Assert
            mockEmailService.Verify(x => x.SendEmailAsync(It.Is<MailRequest>(m => m.ToEmail == user.Email)), Times.Once);
        }
    }
}
