using DIAN_.DTOs.ArticleDTO;
using DIAN_.DTOs.ShellDTOs;
using DIAN_.Models;

namespace DIAN_.Mapper
{
    public static class ArticleMapper
    {
        public static ArticleDto ToArticleDto(this Article article)
        {
            return new ArticleDto
            {
                ArticleID = article.ContentId,
                Title = article.Title,
                Content = article.Content,
                CreatedOn = article.Date,
                CreatedBy = article.EmployeeNavigation?.LastName,
                Image = article.Image,
                Tag = article.Tag

            };
        }

        public static ArticleDetailDto ToArticleDetailDto(this Article article)
        {
            return new ArticleDetailDto
            {
                ArticleID = article.ContentId,
                Title = article.Title,
                Content = article.Content,
                CreatedOn = article.Date,
                CreatedBy = article.EmployeeNavigation?.LastName ?? "Unknown", 
                Image = article.Image,
                Tag = article.Tag

            };
        }
        public static Article ToArticleFromCreate(this CreateArticleRequestDto articleDto)
        {
            return new Article
            {
               Title = articleDto.Title,
               Content = articleDto.Content,
               Date = DateTime.Now,
               Image = articleDto.Image,
                Employee = articleDto.Employee,
                Tag = articleDto.Tag,
            };
        }

        public static Article ToArticleFromUpdate(this UpdateArticleRequestDto articleDto, int contentId)
        {
            return new Article {
                Title = articleDto.Title,
                Content = articleDto.Content,
                Status = articleDto.Status,
                Image = articleDto.Image,
                Tag = articleDto.Tag,
            };
        }

        public static UpdatedArticleDto ToDisplayArticleFromUpdate(this Article articleDto)
        {
            return new UpdatedArticleDto
            {
                Title = articleDto.Title,
                Content = articleDto.Content,
                Date = articleDto.Date,
                Image = articleDto.Image,
                Tag = articleDto.Tag,
            };
        }

        public static ArticleList ToArticleList(this Article articleDto)
        {
            return new ArticleList
            {
                ArticleID= articleDto.ContentId,
                Title = articleDto.Title,
                CreatedBy = articleDto.EmployeeNavigation.LastName,
                Date = articleDto.Date,
                Image = articleDto.Image,
                Tag = articleDto.Tag

            };
        }
    }
}
