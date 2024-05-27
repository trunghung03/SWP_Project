using DIAN_.Models;

namespace DIAN_.DTOs.SizeDTO
{
    public class UpdateSizeRequestDto
    {

        public decimal? MinSize { get; set; }

        public decimal? MaxSize { get; set; }

        public decimal? Step { get; set; }

    }
}
