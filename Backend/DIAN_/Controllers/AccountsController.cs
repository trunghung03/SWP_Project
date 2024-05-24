using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserApplication.Dtos.Account;
using UserApplication.Helpers;
using UserApplication.Interfaces;
using UserApplication.Model;

namespace UserApplication.Controllers
{
    [ApiController]
    [Route("api/account")]
    public class AccountsController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<AppUser> _signInManager;
        public AccountsController(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.Email.ToLower());
            if (user == null) { return Unauthorized("Invalid Username!"); }

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded) { return Unauthorized("Username not found and/or password incorrect!"); }

            return Ok(
                new NewUserDto
                {
                    Email = user.UserName,
                    Token = _tokenService.CreateToken(user, user.Role)
                });
        }

        [HttpPost("registeruser")]
        public async Task<IActionResult> Register(RegisterUserDto user)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); };

                var appUser = new AppUser
                {
                    UserName = user.Email,
                    Role = Roles.User
                };

                var createdUser = await _userManager.CreateAsync(appUser, user.Password);

                if (createdUser.Succeeded)
                {
                    return Ok(
                        new NewUserDto
                        {
                            Email = appUser.UserName,
                            Token = _tokenService.CreateToken(appUser, appUser.Role)
                        });
                }
                else
                {
                    return BadRequest(createdUser.Errors);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("registeradmin")]
        public async Task<IActionResult> RegisterAdmin(RegisterUserDto user)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); };

                var appUser = new AppUser
                {
                    UserName = user.Email,
                };

                var createdUser = await _userManager.CreateAsync(appUser, user.Password);

                if (createdUser.Succeeded)
                {
                    return Ok(
                        new NewUserDto
                        {
                            Email = appUser.UserName,
                            Token = _tokenService.CreateToken(appUser, Roles.Admin)
                        });
                }
                else
                {
                    return BadRequest(createdUser.Errors);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
