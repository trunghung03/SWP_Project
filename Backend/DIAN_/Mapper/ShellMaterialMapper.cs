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
                AmountAvailable = shell.AmountAvailable,
                Price = shell.Price
            };
        }
        public static Shellmaterial ToShellMaterial(this CreateShellMaterialRequestDTO dto)
        {
            return new Shellmaterial
            {
                Name = dto.Name,
                AmountAvailable = dto.AmountAvailable,
                Price = dto.Price
            };
        }

        public static Shellmaterial ToShellMaterial(this UpdateShellMaterialRequestDTO dto, Shellmaterial shell)
        {
            shell.Name = dto.Name;
            shell.AmountAvailable = dto.AmountAvailable;
            shell.Price = dto.Price;
            return shell;
        }
    }
}
