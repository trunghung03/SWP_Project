using DIAN_.DTOs;
using DIAN_.Models;

namespace DIAN_.Mapper
{
    public static class ShellMapper
    {
        public static ShellDTO ToShellNameDTO(this Shellmaterial shell)
        {
            return new ShellDTO
            {
                Name = shell.Name
            };
        }
    }
}
