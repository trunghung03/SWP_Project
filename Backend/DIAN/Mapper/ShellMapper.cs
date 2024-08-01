using DIAN_.DTOs.PromotionDto;
using DIAN_.DTOs.ShellDto;
using DIAN_.Models;

namespace DIAN_.Mapper
{
    public static class ShellMapper
    {
        public static Shell ToShellFromCreateDto(this CreateShellRequestDto shellModel, decimal size)
        {
            return new Shell
            {
                ProductId = shellModel.ProductId,
                ShellMaterialId = shellModel.ShellMaterialId,
                Weight = shellModel.Weight,
                AmountAvailable = shellModel.AmountAvailable,
                Size = size,
                Status = shellModel.Status
            };
        }

        public static Shell ToShellFromUpdateDto(this UpdateShellRequestDto shellModel, int id)
        {
            return new Shell
            {
                AmountAvailable = shellModel.AmountAvailable,
            };
        }
        public static Shell ToShellFromUpdateStockDto(this UpdateShellStock shellModel, int id)
        {
            return new Shell
            {
                AmountAvailable = shellModel.Quantity
            };
        }
        public static ShellDto ToShellDetail(this Shell shellModel)
        {
            return new ShellDto
            {
                ShellId = shellModel.ShellId,
                ProductId = shellModel.ProductId ?? 0,
                ShellMaterialId = shellModel.ShellMaterialId ?? 0,
                Weight = shellModel.Weight ?? 0,
                Size = shellModel.Size ?? 0,
                ShellMaterialName = shellModel.ShellMaterial?.Name,
                AmountAvailable = shellModel.AmountAvailable,
                Status = shellModel.Status
            };
        }
    }
}
