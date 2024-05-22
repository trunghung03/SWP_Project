using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
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
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == loginDto.Email.ToLower());

            if (user == null) return Unauthorized("Invalid username!");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized("Username not found and/or password incorrect");

            // Get the user's claims
            var userClaims = await _userManager.GetClaimsAsync(user);

            // Check user claims and redirect to specified resource
            if (userClaims.Any(c => c.Type == ClaimTypes.Role && c.Value == "Manager"))
            {
                // Create a new user DTO with the user's email and token
                var newUserDto = new NewUserDto
                {
                    Email = user.Email,
                    Token = _tokenService.CreateToken(user)
                };

                // Return the new user DTO
                return Ok(newUserDto);
            }
            if (userClaims.Any(c => c.Type == ClaimTypes.Role && c.Value == "Admin"))
            {
                // Create a new user DTO with the user's email and token
                var newUserDto = new NewUserDto
                {
                    Email = user.Email,
                    Token = _tokenService.CreateToken(user)
                };

                // Return the new user DTO
                return Ok(newUserDto);
            }
            else if (userClaims.Any(c => c.Type == ClaimTypes.Role && c.Value == "Customer"))
            {
                // Redirect customer to specified resource
                var newUserDto = new NewUserDto
                {
                    Email = user.Email,
                    Token = _tokenService.CreateToken(user)
                };

                // Return the new user DTO
                return Ok(newUserDto);
            }
            else if (userClaims.Any(c => c.Type == ClaimTypes.Role && c.Value == "SalesStaff"))
            {
                // Redirect sales staff to specified resource
               var newUserDto = new NewUserDto
                {
                    Email = user.Email,
                    Token = _tokenService.CreateToken(user)
                };

                // Return the new user DTO
                return Ok(newUserDto);
            }
            else if (userClaims.Any(c => c.Type == ClaimTypes.Role && c.Value == "DeliveryStaff"))
            {
                // Redirect delivery staff to specified resource
                var newUserDto = new NewUserDto
                {
                    Email = user.Email,
                    Token = _tokenService.CreateToken(user)
                };

                // Return the new user DTO
                return Ok(newUserDto);
            }

            // Add a return statement at the end of the method
            return Ok(); // Replace this with the appropriate return value or action
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var appUser = new AppUser
                {
                    Email = registerDto.Email,
                };

                var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);

                if (createdUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(appUser, registerDto.Password);
                    if (roleResult.Succeeded)
                    {
                        return Ok(
                            new NewUserDto
                            {
                                Email = appUser.Email,
                                Token = _tokenService.CreateToken(appUser)
                            }
                        );
                    }
                    else
                    {
                        return StatusCode(500, roleResult.Errors);
                    }
                }
                else
                {
                    return StatusCode(500, createdUser.Errors);
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

    }
}
