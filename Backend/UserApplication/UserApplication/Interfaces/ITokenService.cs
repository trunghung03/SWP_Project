﻿using UserApplication.Model;

namespace UserApplication.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}