import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SubNav from '../../components/SubNav/SubNav.js';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import BlogInspired from '../../components/BlogInspired/BlogInspired.js';
import { getArticleById, getAllArticles } from '../../services/BlogService.js';
import '../../styles/Active/BlogDetail.scss';
import blogLogo from '../../assets/img/blogLogo.png';

function BlogDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const { articleID } = location.state;
    const [article, setArticle] = useState(null);
    const [relatedArticles, setRelatedArticles] = useState([]);

    const openInstagram = () => {
        window.open('https://www.instagram.com/dian_jewelryy', '_blank');
    };

    useEffect(() => {
        getArticleById(articleID)
            .then(data => {
                setArticle(data);
                getAllArticles().then(allArticles => {
                    const related = allArticles.filter(a => a.tag === data.tag && a.articleID !== data.articleID).slice(0, 4);
                    setRelatedArticles(related);
                });
            })
            .catch(error => {
                console.error('Error fetching article by ID:', error);
            });
    }, [articleID]);

    if (!article) {
        return <div>Loading...</div>;
    }

    const navItems = ['Home', 'Blog', article.title];

    const parseHTMLContent = (htmlString) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlString;

        const mainTitle = tempDiv.querySelector('.main-title')?.outerHTML || '';
        const content = tempDiv.querySelector('.content')?.outerHTML || '';
        const images = [...tempDiv.querySelectorAll('img')].map(img => img.outerHTML).join('');
        const styles = tempDiv.querySelector('style')?.outerHTML || '';

        return { mainTitle, content, images, styles };
    };

    const { mainTitle, content, images, styles } = parseHTMLContent(article.content);

    return (
        <div className="BlogDetail">
            <SubNav items={navItems} />

            <div className='blog_detail_main_container'>
                <div className="blog_detail_header">
                    <p className="blog_detail_created_on">{new Date(article.createdOn).toLocaleDateString()}</p>
                    <h4 className="blog_detail_title">{article.title}</h4>
                    <p className="blog_detail_created_by">Creator: {article.createdBy}</p>
                </div>
                <div className="blog_detail_content">
                    <div className='blog_detail_main_image'>
                        <img src={article.image} alt={article.title} className="blog_detail_image" />
                    </div>
                    {/* <style dangerouslySetInnerHTML={{ __html: styles }} />
                    <div dangerouslySetInnerHTML={{ __html: mainTitle }} />
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                    <div dangerouslySetInnerHTML={{ __html: images }} /> */}
                    <p className="blog_detail_created_by">{article.content}</p>
                </div>
            </div>

            <div className="blogd_social_container">
                <div className="blogd_back_to_blog_list" onClick={() => navigate('/blog')}>
                    <i className="fas fa-arrow-left"></i>
                    <span>Back to blog list</span>
                </div>
                <div className="blogd_social_icons">
                    <a href="https://www.facebook.com/profile.php?id=61560517631582" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://www.instagram.com/dian_jewelryy" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://www.tiktok.com/@dianjewelry" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-tiktok"></i>
                    </a>
                    <a href="/home" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-google"></i>
                    </a>
                    <a href="mailto:diamonddianjewelry@gmail.com">
                        <i className="far fa-envelope"></i>
                    </a>
                </div>
            </div>

            {relatedArticles.length > 0 && (
                <div className="blog_also_like_container">
                    <div className="blog_also_like_header">
                        <h4>You Might Also Like From</h4>
                        <img src={blogLogo} alt="Blog Logo" className="blog_also_like_logo" />
                    </div>
                    <div className="remaining_blogd_container row">
                        {relatedArticles.map(article => (
                            <div key={article.articleID} className="col-md-3 mb-4">
                                <div className="blogd_small_blog_card card">
                                    <img src={article.image} alt={article.title} className="small_blogd_image card-img-top" />
                                    <div className="small_blogd_card_body card-body">
                                        <h6 className="small_blogd_title card-title">{article.title}</h6>
                                        <div className='small_blogd_card_button'>
                                            <button
                                                className="small_blogd_read_more btn btn-link"
                                                onClick={() => navigate('/blog-detail', { state: { articleID: article.articleID } })}
                                            >
                                                Read more <i className="fas fa-arrow-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <BlogInspired openInstagram={openInstagram} />
            <ScrollToTop />
        </div>
    );
}

export default BlogDetail;
