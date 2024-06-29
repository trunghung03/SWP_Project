using DIAN_.DTOs.ShellDTOs;
using DIAN_.Models;

namespace DIAN_.Mapper
{
    public static class ShellMaterialMapper
    {
        public static ShellMaterialDTO ToShellMaterialDTO(this Shellmaterial shell)
        {
            return new ShellMaterialDTO
            {
                ShellMaterialId = shell.ShellMaterialId,
                Name = shell.Name,
            };
        }

        public static Shellmaterial ToShellMaterial(this CreateShellMaterialRequestDTO shellDTO)
        {
            return new Shellmaterial
            {
                Name = shellDTO.Name,
                Status = true
            };
        }

        public static Shellmaterial ToShellMaterial(this UpdateShellMaterialRequestDTO shellDTO, Shellmaterial existingShell)
        {
            existingShell.Name = shellDTO.Name;
            return existingShell;
        }
    }
}
