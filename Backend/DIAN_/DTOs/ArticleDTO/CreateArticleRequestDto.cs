using DIAN_.Models;
using System.ComponentModel.DataAnnotations;


namespace DIAN_.DTOs.ArticleDTO
{
    public class CreateArticleRequestDto
    {
        [Required(ErrorMessage = "Title is required.")]
        [StringLength(100, ErrorMessage = "Title must not exceed 100 characters.")]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "Content is required.")]
        public string Content { get; set; } = string.Empty;

        [Required(ErrorMessage = "Image URL is required.")]
        //[Url(ErrorMessage = "Image must be a valid URL.")]
        public string Image { get; set; } = string.Empty;

        [Required(ErrorMessage = "Tag is required.")]
        [StringLength(50, ErrorMessage = "Tag must not exceed 50 characters.")]
        public string Tag { get; set; } = string.Empty;

        [Required(ErrorMessage = "Employee ID is required.")]
        public int Employee { get; set; }

        [Required(ErrorMessage = "Status is required.")]
        public bool Status { get; set; }

        [Required(ErrorMessage = "Date is required.")]
        [DataType(DataType.Date, ErrorMessage = "Date must be a valid date.")]
        public DateTime Date { get; set; }
    }
}
