using DIAN_.DTOs;
using DIAN_.Models;
using System.Linq;

namespace DIAN_.Mapper
{
    public static class ShellMapper
    {
        public static ShellDTO ToShellDTO(this Shell shell)
        {
            return new ShellDTO
            {
                Name = shell.Name,
                Sizes = shell.Shellinventories.Select(si => si.Size).ToList()
            };
        }
    }
}
