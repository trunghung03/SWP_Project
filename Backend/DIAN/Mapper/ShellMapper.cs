﻿using DIAN_.DTOs.PromotionDto;
using DIAN_.DTOs.ShellDto;
using DIAN_.Models;

namespace DIAN_.Mapper
{
    public static class ShellMapper
    {
        public static Shell ToShellFromCreateDto(this CreateShellRequestDto shellModel)
        {
            return new Shell
            {
                ProductId = shellModel.ProductId,
                ShellMaterialId = shellModel.ShellMaterialId,
                SubdiamondId = shellModel.SubDiamondId,
                SubDiamondAmount = shellModel.SubDiamondAmount,
                Weight = shellModel.Weight,
                AmountAvailable = shellModel.AmountAvailable,
                Status = shellModel.Status
            };
        }
        public static Shell ToShellFromUpdateDto(this UpdateShellRequestDto shellModel, int id)
        {
            return new Shell
            {
                ProductId = shellModel.ProductId,
                ShellMaterialId = shellModel.ShellMaterialId,
                SubdiamondId = shellModel.SubDiamondId,
                SubDiamondAmount = shellModel.SubDiamondAmount,
                Weight = shellModel.Weight,
                AmountAvailable = shellModel.AmountAvailable,
                Status = shellModel.Status
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
                SubDiamondId = shellModel.SubdiamondId ?? 0,
                SubDiamondAmount = shellModel.SubDiamondAmount ?? 0,
                Weight = shellModel.Weight ?? 0,
                AmountAvailable = shellModel.AmountAvailable,
                Status = shellModel.Status
            };
        }
    }
}