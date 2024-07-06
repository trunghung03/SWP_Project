using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.ProductDTOs
{
    public class ShellDto
{
    public int ShellId { get; set; }
    public int Quantity { get; set; }
}

public class SubDiamondDto
{
    public int SubDiamondId { get; set; }
    public int Quantity { get; set; }
}

public class MainDiamondDto
{
    public List<int> RequiredDiamondIds { get; set; }
}

public class AddProductDto
{
    public ShellDto Shell { get; set; }
    public SubDiamondDto SubDiamond { get; set; }
    public List<MainDiamondDto> RequiredMainDiamonds { get; set; }
}

}
