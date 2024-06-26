﻿	use DIAN
	Go
	INSERT INTO CUSTOMER (Email, Password, LastName, FirstName, Address, PhoneNumber, Points, Status) VALUES
	('john.doe@yahoo.com', '123', 'Doe', 'John', '123 Main St', '+1 (212) 555-0198', 1000, 1),
	('jane.smith@gmail.com', '123', 'Smith', 'Jane', '456 Elm St', '+1 (415) 555-0234', 1500, 1),
	('cxhrisB124@gmail.com', '123', 'Chris', 'Burkerly', '789 Oak St', '+1 (310) 555-0745', 2000, 1),
	('emma.watson@gmail.com', '123', 'Watson', 'Emma', '101 Pine St', '+1 (617) 555-0987', 800, 1),
	('oliver.queen@gmail.com', '123', 'Queen', 'Oliver', '202 Cedar St', '+1 (818) 555-0367', 300, 1),
	('lee1103@gmail.com', '123', 'Lee', 'Bruce', '303 Birch St', '+1 (305) 555-0456', 3500, 1),
	('clark08kent@gmail.com', 'clark0809', 'Kent', 'Clark', '404 Maple St', '+1 (702) 555-0823', 200, 1);

	-- Insert dummy data into EMPLOYEE table
	-- Insert dummy data into EMPLOYEE table with updated roles
	INSERT INTO EMPLOYEE (Role, Email, Password, LastName, FirstName, Address, PhoneNumber, Status) VALUES
	('Admin', 'RaveAdmin@gmail.com', '123', 'Steve', 'Ravy', '789 Pine St', '+1 (202) 555-0178', 1),
	('Manager', 'SmithManager@gmail.com', '123', 'Smith', 'John', '101 Oak St', '+1 (303) 555-0192', 1),
	('SalesStaff', 'BrownSales@gmail.com', '123', 'Sarah', 'Brown', '123 Elm St', '+1 (404) 555-0153', 1),
	('DeliveryStaff', 'DanielDelivery@gmail.com', '123', 'Moore', 'Daniel', '456 Birch St', '+1 (505) 555-0147', 1),
	('SalesStaff', 'AmandaSale02@gmail.com', '123', 'Taylor', 'Amanda', '789 Cedar St', '+1 (707) 555-0185', 1),
	('Manager', 'JamesManager02@gmail.com', '123', 'Davis', 'James', '101 Maple St', '+1 (808) 555-0136', 1),
	('Admin', 'JessicaAdmin2@gmail.com', '123', 'Miller', 'Jessica', '202 Oak St', '+1 (315) 555-0176', 1),
	('DeliveryStaff', 'BobbyDelivery@gmail.com', '123', 'Demer', 'Bobby', '412 OakHill St', '+1 (505) 613-0457', 1);
	-- Insert dummy data into ARTICLE table
	INSERT INTO ARTICLE (Title, Content, Employee, [Date], [Image], Tag, Status) VALUES
	('Natural vs. Lab Diamonds', 'Natural and lab-grown diamonds are identical to the naked eye. In fact, most experts can''t even tell them apart without specialized equipment. Ultimately, the main difference is how they''re created. Learn more to understand which diamond type suits your style.', 3, GETDATE(), 'https://image.brilliantearth.com/cdn-cgi/image/width=720,height=545,quality=100,format=auto/https://cdn.builder.io/api/v1/image/assets%2F9f2a69003c86470ea05deb9ecb9887be%2F369828bf6d7c48d6ae52eb7edb069602', 'Blog', 1),
	('Transformational Blockchain Technology', 'Blockchain technology is revolutionizing the natural diamond industry. Our blockchain keeps track of every step in a diamond’s journey – from mining, to market, to the moment it reaches you – safely, securely, and permanently. With our blockchain verified diamonds, you’ll have an enduring digital record about where your diamond comes from and how it was sourced. In 2019, we became one of the first retailers to offer blockchain verified diamonds, and year after year we have increased our offering of blockchain verified diamonds, ahead of our ESG Goals.', 3, GETDATE(), 'https://image.brilliantearth.com/cdn-cgi/image/width=720,height=545,quality=100,format=auto/https://cdn.builder.io/api/v1/image/assets%2F9f2a69003c86470ea05deb9ecb9887be%2Fa6e7c9b72fb840e29ce3d58ef93d4f6d', 'Blog', 1),
	('Colored Diamonds', 'Explore our curated collection of natural and lab created colored diamonds in a variety of stunning shades.', 3, GETDATE(), 'https://image.brilliantearth.com/cdn-cgi/image/width=720,height=545,quality=100,format=auto/https://cdn.builder.io/api/v1/image/assets%2F9f2a69003c86470ea05deb9ecb9887be%2F67a2c143703b4239a605d7b3a10d4420', 'Product Description Section', 1),
	('The Capture Collection', 'We capture CO₂ before it is released into the atmosphere to create the most innovative lab grown diamonds on the planet.', 3, GETDATE(), 'https://image.brilliantearth.com/cdn-cgi/image/width=720,height=545,quality=100,format=auto/https://cdn.builder.io/api/v1/image/assets%2F9f2a69003c86470ea05deb9ecb9887be%2Fa9aa8fd2de794d0581588e4a187d878e', 'News', 1),
	('Design Your Own Earrings', 'Select your setting and diamonds to get exactly what you''re looking for.', 3, GETDATE(), 'https://image.brilliantearth.com/cdn-cgi/image/width=720,height=545,quality=100,format=auto/https://cdn.builder.io/api/v1/image/assets%2F9f2a69003c86470ea05deb9ecb9887be%2Ff4562a479cb049a2b8e5f1787d3f4633', 'Services', 1),
	('Design Your Own Necklace', 'Customize a solitaire necklace with a setting and gemstone that suit your style.', 3, GETDATE(), 'https://image.brilliantearth.com/cdn-cgi/image/width=720,height=545,quality=100,format=auto/https://cdn.builder.io/api/v1/image/assets%2F9f2a69003c86470ea05deb9ecb9887be%2F3f926b3050bd4f6baa39fe0b3db32fd3', 'Services', 1),
	('OUR BEGINNING', 'In 2019, after witnessing the gap in ethical and sustainable options within the diamond industry, visionary entrepreneur Danielle Taylor embarked on a mission to redefine the narrative. Inspired by Beth Gerstein''s journey, Danielle envisioned a diamond jewelry brand that not only symbolized love but also upheld principles of environmental stewardship and ethical sourcing. With a shared commitment to sustainability, Danielle partnered with renowned jeweler Michael Adams to establish DIAN Diamond Jewelry in 2022. Together, they pioneered innovative approaches to diamond sourcing and transparency, leveraging cutting-edge technology to trace each gemstone''s origin. By offering consumers the assurance of ethical practices and environmental responsibility, DIAN quickly gained recognition as a leader in sustainable luxury jewelry, inspiring a new generation of conscientious consumers to adorn themselves with diamonds that shine with integrity and purpose.', 3, GETDATE(), 'https://image.brilliantearth.com/cdn-cgi/image/width=600,height=258,quality=100,format=auto/https://www.brilliantearth.com/bee2-ui/img/mission/about/Mission_About_Static.jpg', 'About', 1);

	-- Insert dummy data into PROMOTION table
	INSERT INTO PROMOTION ([Name], Amount, ValidFrom, ValidTo, [Description], Code, Status) VALUES
	('Spring Sale', 20.00, GETDATE(), DATEADD(month, 1, GETDATE()), '20% off all items for Spring', 'SPRING20',  1),
	('Summer Sale', 15.00, GETDATE(), DATEADD(month, 2, GETDATE()), '15% off all items for Summer', 'SUMMER15',  1),
	('Fall Sale', 10.00, GETDATE(), DATEADD(month, 3, GETDATE()), '10% off all items for Fall', 'FALL10', 1),
	('Winter Sale', 25.00, GETDATE(), DATEADD(month, 4, GETDATE()), '25% off all items for Winter', 'WINTER25', 1),
	('Black Friday', 30.00, GETDATE(), DATEADD(month, 5, GETDATE()), '30% off all items for Black Friday', 'BLACKFRIDAY30', 1),
	('Cyber Monday', 35.00, GETDATE(), DATEADD(month, 6, GETDATE()), '35% off all items for Cyber Monday', 'CYBERMONDAY35',  1),
	('Holiday Special', 40.00, GETDATE(), DATEADD(month, 7, GETDATE()), '40% off all items for the Holidays', 'HOLIDAY40', 1);

	-- Insert dummy data into PURCHASEORDER table
	INSERT INTO PURCHASEORDER (UserID, [Date], PaymentMethod, Name, PhoneNumber, ShippingAddress, TotalPrice, [OrderStatus], PromotionID, PayWithPoint, Note,SaleStaff,DeliveryStaff) VALUES
	(1, GETDATE(), 'Credit Card', 'John Doe', '123-456-7890', '123 Main St', 2000.00, 'Unpaid', 1, 0, 'Shipping with packaging',3,4),
	(2, GETDATE(), 'PayPal', 'Jane Smith', '234-567-8901', '456 Elm St', 3000.00, 'Paid', 2, 1, 'Ship at D2',3,8),
	(3, GETDATE(), 'Credit Card', 'Alice Johnson', '345-678-9012', '789 Oak St', 1500.00, 'Unpaid', 3, 0, 'Shipping without packaging',3,8),
	(4, GETDATE(), 'PayPal', 'Bob Brown', '456-789-0123', '101 Pine St', 2500.00, 'Delivering', 4, 1, 'Shipping with packaging',5,4),
	(5, GETDATE(), 'Credit Card', 'Carol White', '567-890-1234', '202 Cedar St', 3500.00, 'Completed', 5, 0, 'Shipping with packaging',5,4),
	(6, GETDATE(), 'PayPal', 'David Black', '678-901-2345', '303 Birch St', 4000.00, 'Cancelled', 6, 1, 'Shipping with packaging',3,4),
	(7, GETDATE(), 'Credit Card', 'Eve Green', '789-012-3456', '404 Maple St', 4500.00, 'Delivering', 7, 0, 'Shipping with packaging',5,8);
	
	-- Insert dummy data into CATEGORY table
	INSERT INTO CATEGORY ([Name], Status) VALUES
	('Rings', 1),
	('Earrings', 1),
	('Bracelets', 1),
	('Necklaces', 1),
	('Wedding Rings', 1),
	('Wedding Earrings', 1),
	('Wedding Bracelets',1),
	('Wedding Necklaces',1),
	('Engagement Rings',1);

		-- Insert dummy data into SHELLMATERIAL table
	INSERT INTO SHELLMATERIAL ([Name], Price, Status) VALUES
	('Silver', 1500, 1),
	('Gold', 1700, 1),
	('Rose Gold', 2000, 1),
	('White Gold', 2300, 1);

	-- Insert dummy data into COLLECTIONS table
INSERT INTO COLLECTION (CollectionID, [Name], Status, [Description], CollectionImage)
VALUES
(1, 'Lotus Diamond Jewelry Collection', 1, 'An exquisite jewelry set featuring diamonds arranged in a lotus-inspired design, epitomizing elegance and sophistication.', 'https://css.brilliantearth.com/static/img/diamond_shape_new/heart_new.jpg'),
(2, 'Modern Majesty Collection', 1, 'A contemporary collection that combines sleek designs with majestic diamond settings, perfect for the modern monarch.', 'https://css.brilliantearth.com/static/img/diamond_shape_new/heart_new.jpg'),
(3, 'Classic Charm Collection', 1, 'A timeless collection that captures the essence of classic elegance with charming diamond pieces.', 'https://css.brilliantearth.com/static/img/diamond_shape_new/heart_new.jpg'),
(4, 'Pure Perfection Collection', 1, 'An immaculate collection showcasing flawless diamonds that exude purity and perfection in every piece.', 'https://css.brilliantearth.com/static/img/diamond_shape_new/heart_new.jpg'),
(5, 'Royal Radiance Collection', 1, 'A luxurious collection designed to evoke the regal beauty and radiant splendor of royalty.', 'https://css.brilliantearth.com/static/img/diamond_shape_new/heart_new.jpg'),
(6, 'Celestial Sparkle Collection', 1, 'A heavenly collection inspired by the stars, featuring diamonds that sparkle like the night sky.', 'https://css.brilliantearth.com/static/img/diamond_shape_new/heart_new.jpg'),
(7, 'Majestic Mystique Collection', 1, 'An enigmatic collection that blends majestic designs with a touch of mystery, ideal for those who love captivating jewelry.', 'https://css.brilliantearth.com/static/img/diamond_shape_new/heart_new.jpg'),
(8, 'Vintage Virtue Collection', 1, 'A nostalgic collection that brings back the charm and virtue of vintage jewelry, with pieces that tell a story.', 'https://css.brilliantearth.com/static/img/diamond_shape_new/heart_new.jpg');


-- Insert dummy data into PRODUCT table
INSERT INTO PRODUCT (productCode, [Name], Price, [Description], LaborCost, ImageLinkList, Status, CollectionID, CategoryID)
VALUES
('PROD001', 'Cocktail Ring', 3190.00, 'Seven rows of shimmering lab diamonds that wrap the finger in light in this glamorous cocktail design.', 71.50, 'https://i5.walmartimages.com/seo/Feledorashia-Rings-for-Women-Valentine-s-Day-Gifts-2PC-Ring-Bridal-Zircon-Diamond-Elegant-Engagement-Wedding-Band-Ring-Set_b1ea52c3-bf4d-4b24-ab8b-3452fccec372.6da512e049be49a0c5539e5fd8f02970.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF',1, 2, 1),
('PROD002', 'Ballad Eternity Ring', 1190.00, 'A stunning ring featuring diamonds that encircle the band for a timeless and elegant look.', 276.00,  'https://image.brilliantearth.com/media/diamond_ring_vto/0M/BE1D54_white_Round_top_2_carat.png;https://image.brilliantearth.com/media/carat_image/84/BE1D54_RD_200ct_white_side1.jpg;https://image.brilliantearth.com/media/product_images/9R/BE1D54-18KW_BE3D20-18KW_3.jpg;https://image.brilliantearth.com/media/product_images/D6/BE1D54_white_additional2.jpeg', 1, 2, 9),
('PROD003', 'Riviera Eternity Ring', 1990.00, 'This ring showcases lab diamonds in a continuous band, creating an eternity effect.', 64.00, 'https://image.brilliantearth.com/media/diamond_ring_vto/3C/BE1M30D_white_Round_top_2_carat.png;https://image.brilliantearth.com/media/carat_image/ED/BE1M30D_RD_200ct_white_side1.jpg;https://image.brilliantearth.com/media/product_images/SF/BE1M30D-18KW-RD_2.jpg;https://image.brilliantearth.com/media/product_images/U1/BE1M30D_white_additional1.jpeg', 1, 2, 9),
('PROD004', 'Ellora Ring', 2750.00, 'Featuring lab diamonds around the entire band, this ring sparkles with sophistication.', 82.10,  'https://image.brilliantearth.com/media/diamond_ring_vto/P9/BE1D14842_yellow_Pear_top_2_carat.png;https://image.brilliantearth.com/media/carat_image/B1/BE1D14842_PS_200ct_yellow_side2.jpg;https://image.brilliantearth.com/media/carat_image/BE/BE1D14842_PS_200ct_yellow_side1.jpg;https://image.brilliantearth.com/media/product_images/3V/BE1D14842LC-yellow_035.jpg', 1, 2, 1),
('PROD005', 'Lab Grown Stud Earrings', 1995.00, 'Elegant stud earrings featuring certified lab grown diamonds.', 69.80, 'https://image.brilliantearth.com/media/product_images/DF/BE304RD100_white_top.jpg;https://image.brilliantearth.com/media/product_images/ZJ/BE304RD100LAB_add_img1_96114.jpeg;https://image.brilliantearth.com/media/product_images/04/BE304RD100-18KW_2.jpg;https://image.brilliantearth.com/media/product_images/VK/BE215-18KW_062.jpg', 1, 2, 2),
('PROD006', 'Heart Stud Earrings', 425.00, 'Beautiful heart-shaped stud earrings with lab grown diamonds.', 53.00, 'https://image.brilliantearth.com/media/product_images/7J/BE3D20-18KY_850_top.jpg;https://image.brilliantearth.com/media/product_images/QO/BE3D20-18KY_additional1.jpeg;https://image.brilliantearth.com/media/product_images/WD/expires_oct2024_102422_SL_HP_MinimalistGifts_HERO.jpg;https://image.brilliantearth.com/media/product_images/HV/BE3D20-18KY_2.jpg', 1, 2, 6),
('PROD007', 'Luxe Ring', 2590.00, 'Luxe design with diamonds set along the band.', 81.00,  'https://image.brilliantearth.com/media/diamond_ring_vto/SA/BE113_white_Round_top_2_carat.png;https://image.brilliantearth.com/media/carat_image/DB/BE113_RD_200ct_white_side1.jpg;https://image.brilliantearth.com/media/product_images/X8/BE113-18KW-N-S6_019.jpg;https://image.brilliantearth.com/media/product_images/A2/BE113_white_additional1.jpg', 1, 2, 1),
('PROD008', 'Secret Garden Eternity Ring', 4790.00, 'Nature-inspired with diamonds resembling leaves and vines.', 61.60, 'https://image.brilliantearth.com/media/product_images/05/BE2D062_yellow_00.jpg;https://image.brilliantearth.com/media/product_images/L2/BE2D062_yellow_02.jpg;https://image.brilliantearth.com/media/product_images/1V/BE2D062-18KY_2.jpg;https://image.brilliantearth.com/media/product_images/VJ/BE1D225-18KY_3.jpg', 1, 2, 9),
('PROD009', 'Twisted Vine Ring', 2490.00, 'Twisted design with diamonds entwined in vines.', 72.00, 'https://image.brilliantearth.com/media/product_new_images/ED/BE2D2110_white_top.jpg;https://image.brilliantearth.com/media/product_new_images/32/BE2D2110_white_side1.jpg;https://image.brilliantearth.com/media/product_images/RZ/BE2D2110-18KW_2.jpg;https://image.brilliantearth.com/media/product_images/PO/BE2D2110_white_additional1.jpeg', 1, 2, 1),
('PROD010', 'Petite Heart Ring', 1690.00, 'Elegant twist design with petite diamonds.', 43.15, 'https://image.brilliantearth.com/media/product_new_images/BA/BE2D621_white_top.jpg;https://image.brilliantearth.com/media/product_new_images/08/BE2D621_white_side1.jpg;https://image.brilliantearth.com/media/product_images/QM/BE2D621-18KW_4.jpg;https://image.brilliantearth.com/media/product_images/5M/BE2D621-18KW_2.jpg', 1, 4, 5),
('PROD011', 'Whisper Eternity Necklace', 2890.00, 'Delicate design with diamonds encircling the band.', 68.30,  'https://image.brilliantearth.com/media/product_images/CB/BE4DTN50_white_top.jpg;https://image.brilliantearth.com/media/product_images/7S/BE4DTN50_top.jpeg;https://image.brilliantearth.com/media/product_images/AM/BE1D4257LC-18KW-N-S6_BE4DTN50-18KW_BE4DTN50LC-14KW_062.jpg;https://image.brilliantearth.com/media/product_images/U0/BE3AD603-S_BE4DTN50-18KW_BE4DTN50LC-14KW_070.jpg', 1, 5, 4),
('PROD012', 'Certified Stud Earrings', 1995.00, 'Elegant stud earrings featuring certified lab grown diamonds.', 79.32, 'https://image.brilliantearth.com/media/product_images/90/BE3DME01318_white_top.jpg;https://image.brilliantearth.com/media/product_images/9X/BE3DME01318_additional1.jpeg;https://image.brilliantearth.com/media/product_images/ZP/BE3DME01318-18KY_top.jpg;https://image.brilliantearth.com/media/product_images/Z5/BE3DME01318-yellow.jpg', 1, 6, 2),
('PROD013', 'Diamond Stud Earrings', 495.00, 'Simple and elegant lab grown diamond stud earrings.', 42.00,  'https://image.brilliantearth.com/media/product_images/D4/BE3D0492E_yellow_top.jpg;https://image.brilliantearth.com/media/product_images/A5/BE3D0492E_white_top.jpg;https://image.brilliantearth.com/media/product_images/0F/BE3D0492E_rose_top.jpg;https://image.brilliantearth.com/media/product_images/FJ/BE3D492E-14KR_060.jpg', 1, 8, 2),
('PROD014', 'Heart Lab Earrings', 425.00, 'Beautiful heart-shaped stud earrings with lab grown diamonds.', 48.00, 'https://image.brilliantearth.com/media/product_images/07/BE3D813_white_top.jpg;https://image.brilliantearth.com/media/product_images/L1/BE3D813-18KW_additional1.jpeg;https://image.brilliantearth.com/media/product_images/74/BE3D813_yellow_top.jpg;https://image.brilliantearth.com/media/product_images/OC/BE3D813-14KY_024.jpg', 1, 5, 6),
('PROD015', 'Stud Earrings', 3495.00, 'Elegant stud earrings featuring certified lab grown diamonds.', 70.00, 'https://image.brilliantearth.com/media/product_images/XJ/BE304RD50_top_white.webp;https://image.brilliantearth.com/media/product_images/ZL/BE304RD50_top_yellow.webp;https://image.brilliantearth.com/media/product_images/QE/BE304RD50_top_rose.webp;https://image.brilliantearth.com/media/product_images/KE/BE2FPD14-18KW_v2_3.jpg', 1, 5, 2),
('PROD016', 'Lab Diamond Heart Ring', 750.00, 'Elegant lab grown diamond stud ring.', 56.00, 'https://image.brilliantearth.com/media/product_images/SU/BE2D15103_yellow_top_5.webp;https://image.brilliantearth.com/media/product_images/FL/BE2D15103_yellow_side1.webp;https://image.brilliantearth.com/media/product_images/EY/BE2D15103-18KY-N-S6_034.jpg;https://image.brilliantearth.com/media/product_images/D7/BE2119_yellow_additional1.jpg', 1, 1, 5),
('PROD017', 'Lab Grown Stud Earrings', 1295.00, 'Classic and elegant lab grown diamond stud earrings.', 75.00,  'https://image.brilliantearth.com/media/product_images/24/BE3H22_white_top.jpg;https://image.brilliantearth.com/media/product_images/AD/BE3H22_yellow_top.jpg;https://image.brilliantearth.com/media/product_images/DS/BE3H22-14KY_034.jpg;https://image.brilliantearth.com/media/product_images/A6/BE3H22-S_2.jpg', 1, 7, 2),
('PROD018', 'Heart Lab Diamond Earrings', 425.00, 'Beautiful heart-shaped stud earrings with lab grown diamonds.', 59.00, 'https://image.brilliantearth.com/media/product_images/17/BE3DVE1225A_yellow_top.jpg;https://image.brilliantearth.com/media/product_images/FB/BE3DVE1225A-14KY_additional1.webp;https://image.brilliantearth.com/media/product_images/3E/BE3DVE1225A_white_top.jpg;https://image.brilliantearth.com/media/product_images/EK/BE3DVE1225A-14KW_additional1.jpeg', 1, 2, 6),
('PROD019', 'Certified Lab Stud Earrings', 1995.00, 'Elegant stud earrings featuring certified lab grown diamonds.', 81.30, 'https://image.brilliantearth.com/media/product_images/9A/BE3D4212_white_top.jpg;https://image.brilliantearth.com/media/product_images/21/BE3D4212_yellow_top.jpg;https://image.brilliantearth.com/media/product_images/DF/BE3D4212_rose_top.jpg;https://image.brilliantearth.com/media/product_images/VP/BE304RD50-14KR_BE3D4212-14KR_007.jpg', 1, 2, 2),
('PROD020', 'Baguette Bracelet', 3990.00, 'A sophisticated bracelet featuring baguette and round diamonds in 18K yellow gold.', 74.20, 'https://image.brilliantearth.com/media/product_images/FQ/BE5dibm65-18KY_top.jpg;https://image.brilliantearth.com/media/product_images/3O/BE5dibm65-14KY_detail.jpg;https://image.brilliantearth.com/media/product_images/0Q/BE5dibm65-14KW_top_850.jpg;https://image.brilliantearth.com/media/product_images/EH/BE5dibm65-14KW_detail.jpg', 1, 2, 3),
('PROD021', 'Paperclip Lab Bracelet', 1295.00, 'A modern paperclip design adorned with lab-grown diamonds in 14K yellow gold.', 68.00,  'https://image.brilliantearth.com/media/product_images/22/BE5D10TB65_white_top.jpg;https://image.brilliantearth.com/media/product_images/27/BE5D10TB65-18KY_additional1.jpg;https://image.brilliantearth.com/media/product_images/OF/BE5D10TB65-18KR_additional1.jpg;https://image.brilliantearth.com/media/product_images/1K/BE5D10TB-18KW_1_1.jpeg', 1, 8, 3),
('PROD022', 'Aster Bracelet', 1795.00, 'Elegant lab diamond tennis bracelet with a classic design.', 73.50,  'https://image.brilliantearth.com/media/product_images/38/BE5D0714BN_yellow_top.jpg;https://image.brilliantearth.com/media/product_images/GN/BE5DIBV65_BE5D714B7-18KY_BE5D714B7-18KW_BE5DIBM65_BE5D1263BNLC_BE5D714B7_BE5DIBV65.jpg;https://image.brilliantearth.com/media/product_images/9F/BE5D0714BN_rose_top.jpg;https://image.brilliantearth.com/media/product_images/FH/BE5D714BN-14KR_2.jpg', 1, 2, 3),
('PROD023', 'Beatrice Bracelet', 1795.00, 'A stunning tennis bracelet featuring lab-grown diamonds.', 80.00, 'https://image.brilliantearth.com/media/product_images/ZB/BE5D302-S_white_top.jpg;https://image.brilliantearth.com/media/product_images/A1/BE5D302-14KY_yellow_top.jpg;https://image.brilliantearth.com/media/product_images/08/BE5D300-14KY_BE1D999-18KY_016.jpg;https://image.brilliantearth.com/media/product_images/S9/BE5D300-S_2_1.jpg', 1, 2, 3),
('PROD024', 'Emerald Diamond Bracelet', 14990.00, 'An exquisite bracelet with emerald-cut diamonds in 18K white gold.', 84.00, 'https://image.brilliantearth.com/media/product_images/19/BE5D501_yellow_top.jpg;https://image.brilliantearth.com/media/product_images/B0/BE5D501_white_top.jpg;https://image.brilliantearth.com/media/product_images/D0/BE5D501.jpeg;https://image.brilliantearth.com/media/product_images/6B/BE22002-18KW-S7_029.jpg', 1, 3, 3),
('PROD025', 'Oval Diamond Bracelet', 13990.00, 'A luxurious oval diamond tennis bracelet set in 14K white gold.', 78.60, 'https://image.brilliantearth.com/media/product_images/CE/BE5dibv65-18KW_top.jpg;https://image.brilliantearth.com/media/product_images/WJ/BE5dibv65-18KW_detail.jpg;https://image.brilliantearth.com/media/product_images/NB/BE5dibv65-18KW_additional1.jpg;https://image.brilliantearth.com/media/product_images/OL/BE5DIBV65_BE2SBT100_BE5D714B7_BE1D5320_BE2D064.jpg', 1, 4, 3),
('PROD026', 'Heart Diamond Bracelet', 6000.00, 'A romantic bracelet featuring heart-shaped lab diamonds in 18K white gold.', 67.00, 'https://image.brilliantearth.com/media/product_images/ED/BE5D010TBLAB_white_top.jpg;https://image.brilliantearth.com/media/product_images/2S/BE5D010TB_white_additional1.jpg;https://image.brilliantearth.com/media/product_images/0P/BE5D010TB-PT_additional3.webp;https://image.brilliantearth.com/media/product_images/G4/BE5D10TB-18KW_1.webp', 1, 5, 7),
('PROD027', 'Heart Ring', 23000.00, 'A magnificent ring with princess-cut diamonds in 14K white gold.', 72.00, 'https://image.brilliantearth.com/media/product_new_images/B7/BE2D7890_yellow_top.jpg;https://image.brilliantearth.com/media/product_new_images/E4/BE2D7890_yellow_side1.jpg;https://image.brilliantearth.com/media/product_images/D2/BE2D1791_yellow_additional1.jpg;https://image.brilliantearth.com/media/product_images/C9/BE2D1791.jpg', 1, 6, 5),
('PROD028', 'Marquise Tennis Bracelet', 6795.00, 'An elegant bracelet featuring marquise-cut lab diamonds in 18K white gold.', 68.00, 'https://image.brilliantearth.com/media/product_images/GV/BE5D251_white_side.jpg;https://image.brilliantearth.com/media/product_images/YE/BE5D251_white_top.jpg;https://image.brilliantearth.com/media/product_images/HG/BE5D251-S_001.jpg;https://image.brilliantearth.com/media/product_images/IC/BE2D2006-18KW_055.jpeg', 1, 7, 3),
('PROD029', 'Olivetta Tennis Bracelet', 5000.00, 'A timeless tennis bracelet adorned with lab-grown diamonds.', 69.00, 'https://image.brilliantearth.com/media/product_images/FQ/BE5dibm65-18KY_top.jpg;https://image.brilliantearth.com/media/product_images/3O/BE5dibm65-14KY_detail.jpg;https://image.brilliantearth.com/media/product_images/0Q/BE5dibm65-14KW_top_850.jpg;https://image.brilliantearth.com/media/product_images/EH/BE5dibm65-14KW_detail.jpg', 1, 2, 3),
('PROD030', 'Willow Diamond Necklace', 2650.00, 'A delicate necklace featuring a diamond-encrusted willow branch design.', 76.00, 'https://image.brilliantearth.com/media/product_images/CB/BE4DTN50_white_top.jpg;https://image.brilliantearth.com/media/product_images/7S/BE4DTN50_top.jpeg;https://image.brilliantearth.com/media/product_images/AM/BE1D4257LC-18KW-N-S6_BE4DTN50-18KW_BE4DTN50LC-14KW_062.jpg;https://image.brilliantearth.com/media/product_images/U0/BE3AD603-S_BE4DTN50-18KW_BE4DTN50LC-14KW_070.jpg', 1, 1, 4),
('PROD031', 'Luna Diamond Ring', 4800.00, 'A stunning ring with a crescent moon design adorned with diamonds.', 81.00, 'https://image.brilliantearth.com/media/diamond_ring_vto/SA/BE113_white_Round_top_2_carat.png;https://image.brilliantearth.com/media/carat_image/DB/BE113_RD_200ct_white_side1.jpg;https://image.brilliantearth.com/media/product_images/X8/BE113-18KW-N-S6_019.jpg;https://image.brilliantearth.com/media/product_images/A2/BE113_white_additional1.jpg', 1, 6, 1),
('PROD032', 'Starburst Necklace', 3400.00, 'A radiant starburst design necklace featuring brilliant diamonds.', 63.00, 'https://image.brilliantearth.com/media/product_images/AE/BE4D706C_white_top.jpg;https://image.brilliantearth.com/media/product_images/5B/BE4D363_additional1.jpg;https://image.brilliantearth.com/media/product_images/LT/BE4D706C-S.jpg;https://image.brilliantearth.com/media/product_images/6J/BE4D706C-S_v2.jpg', 1, 2, 4),
('PROD033', 'Infinity Diamond Necklace', 1790.00, 'An elegant infinity symbol necklace with lab-grown diamonds.', 77.00, 'https://image.brilliantearth.com/media/product_images/VW/BE4SPCC16_yellow_top.jpeg;https://image.brilliantearth.com/media/product_images/EU/expires_oct2024_102422_SL_HP_TrendsettingGifts_HERO.jpg;https://image.brilliantearth.com/media/product_images/S5/BE4LPCC16-14KY_BE4D535-14KY_047.jpg;https://image.brilliantearth.com/media/product_images/MG/BE4LPCC16-14KY_BE4PL14-14KW_025.jpg', 1, 8, 4),
('PROD034', 'Hearts Diamond Necklace', 6200.00, 'A beautiful necklace featuring hearts and arrows design set with diamonds.', 58.90, 'https://image.brilliantearth.com/media/shape_images/Z3/BE401_round_white_top.jpg;https://image.brilliantearth.com/media/product_images/K8/BE401_SIDE_WG_1.jpeg;https://image.brilliantearth.com/media/product_images/NB/BE401_3_4_WG_1.jpeg;https://image.brilliantearth.com/media/shape_images/AI/BE401_RD1_white.png', 1, 6, 8),
('PROD035', 'Blossom Diamond Ring', 395.00, 'A charming pendant with a floral blossom design encrusted with diamonds.', 43.00, 'https://image.brilliantearth.com/media/product_new_images/B2/BE2M3420H_white_top.jpg;https://image.brilliantearth.com/media/product_new_images/D3/BE2M3420H_white_side1.jpg;https://image.brilliantearth.com/media/product_images/I7/BE2M3420H-18KW_2.jpg;https://image.brilliantearth.com/media/product_images/46/BE2M3420H_white_additional1.jpeg', 1, 1, 5),
('PROD036', 'Cocktail Ring', 3190.00, 'Seven rows of shimmering lab diamonds that wrap the finger in light in this glamorous cocktail design.', 71.50, 'https://image.brilliantearth.com/media/product_new_images/B7/BE2D7890_yellow_top.jpg;https://image.brilliantearth.com/media/product_new_images/E4/BE2D7890_yellow_side1.jpg;https://image.brilliantearth.com/media/product_images/D2/BE2D1791_yellow_additional1.jpg;https://image.brilliantearth.com/media/product_images/C9/BE2D1791.jpg', 1, 2, 1),
('PROD037', 'Ballad Eternity Ring', 1190.00, 'A stunning ring featuring diamonds that encircle the band for a timeless and elegant look.', 76.00, 'https://image.brilliantearth.com/media/diamond_ring_vto/0M/BE1D54_white_Round_top_2_carat.png;https://image.brilliantearth.com/media/carat_image/84/BE1D54_RD_200ct_white_side1.jpg;https://image.brilliantearth.com/media/product_images/9R/BE1D54-18KW_BE3D20-18KW_3.jpg;https://image.brilliantearth.com/media/product_images/D6/BE1D54_white_additional2.jpeg', 1, 2, 9),
('PROD038', 'Riviera Eternity Ring', 1990.00, 'This ring showcases lab diamonds in a continuous band, creating an eternity effect.', 64.00, 'https://image.brilliantearth.com/media/diamond_ring_vto/3C/BE1M30D_white_Round_top_2_carat.png;https://image.brilliantearth.com/media/carat_image/ED/BE1M30D_RD_200ct_white_side1.jpg;https://image.brilliantearth.com/media/product_images/SF/BE1M30D-18KW-RD_2.jpg;https://image.brilliantearth.com/media/product_images/U1/BE1M30D_white_additional1.jpeg', 1, 2, 9),
('PROD039', 'Ellora Ring', 2750.00, 'Featuring lab diamonds around the entire band, this ring sparkles with sophistication.', 82.10, 'https://image.brilliantearth.com/media/diamond_ring_vto/P9/BE1D14842_yellow_Pear_top_2_carat.png;https://image.brilliantearth.com/media/carat_image/B1/BE1D14842_PS_200ct_yellow_side2.jpg;https://image.brilliantearth.com/media/carat_image/BE/BE1D14842_PS_200ct_yellow_side1.jpg;https://image.brilliantearth.com/media/product_images/3V/BE1D14842LC-yellow_035.jpg', 1, 2, 1),
('PROD040', 'Lab Grown Stud Earrings', 1995.00, 'Elegant stud earrings featuring certified lab grown diamonds.', 69.80, 'https://image.brilliantearth.com/media/product_images/DF/BE304RD100_white_top.jpg;https://image.brilliantearth.com/media/product_images/ZJ/BE304RD100LAB_add_img1_96114.jpeg;https://image.brilliantearth.com/media/product_images/04/BE304RD100-18KW_2.jpg;https://image.brilliantearth.com/media/product_images/VK/BE215-18KW_062.jpg', 1, 2, 2),
('PROD041', 'Heart Stud Earrings', 425.00, 'Beautiful heart-shaped stud earrings with lab grown diamonds.', 53.00, 'https://image.brilliantearth.com/media/product_images/7J/BE3D20-18KY_850_top.jpg;https://image.brilliantearth.com/media/product_images/QO/BE3D20-18KY_additional1.jpeg;https://image.brilliantearth.com/media/product_images/WD/expires_oct2024_102422_SL_HP_MinimalistGifts_HERO.jpg;https://image.brilliantearth.com/media/product_images/HV/BE3D20-18KY_2.jpg', 1, 2, 6),
('PROD042', 'Luxe Ring', 2590.00, 'Luxe design with diamonds set along the band.', 81.00, 'https://image.brilliantearth.com/media/diamond_ring_vto/SA/BE113_white_Round_top_2_carat.png;https://image.brilliantearth.com/media/carat_image/DB/BE113_RD_200ct_white_side1.jpg;https://image.brilliantearth.com/media/product_images/X8/BE113-18KW-N-S6_019.jpg;https://image.brilliantearth.com/media/product_images/A2/BE113_white_additional1.jpg', 1, 2, 1),
('PROD043', 'Secret Garden Eternity Ring', 4790.00, 'Nature-inspired with diamonds resembling leaves and vines.', 61.60, 'https://image.brilliantearth.com/media/product_images/05/BE2D062_yellow_00.jpg;https://image.brilliantearth.com/media/product_images/L2/BE2D062_yellow_02.jpg;https://image.brilliantearth.com/media/product_images/1V/BE2D062-18KY_2.jpg;https://image.brilliantearth.com/media/product_images/VJ/BE1D225-18KY_3.jpg', 1, 2, 9),
('PROD044', 'Twisted Vine Ring', 2490.00, 'Twisted design with diamonds entwined in vines.', 72.00, 'https://image.brilliantearth.com/media/product_new_images/ED/BE2D2110_white_top.jpg;https://image.brilliantearth.com/media/product_new_images/32/BE2D2110_white_side1.jpg;https://image.brilliantearth.com/media/product_images/RZ/BE2D2110-18KW_2.jpg;https://image.brilliantearth.com/media/product_images/PO/BE2D2110_white_additional1.jpeg', 1, 2, 1),
('PROD045', 'Petite Heart Ring', 1690.00, 'Elegant twist design with petite diamonds.', 43.15, 'https://image.brilliantearth.com/media/product_new_images/BA/BE2D621_white_top.jpg;https://image.brilliantearth.com/media/product_new_images/08/BE2D621_white_side1.jpg;https://image.brilliantearth.com/media/product_images/QM/BE2D621-18KW_4.jpg;https://image.brilliantearth.com/media/product_images/5M/BE2D621-18KW_2.jpg', 1, 4, 5),
('PROD046', 'Whisper Eternity Necklace', 2890.00, 'Delicate design with diamonds encircling the band.', 68.30, 'https://image.brilliantearth.com/media/product_images/CB/BE4DTN50_white_top.jpg;https://image.brilliantearth.com/media/product_images/7S/BE4DTN50_top.jpeg;https://image.brilliantearth.com/media/product_images/AM/BE1D4257LC-18KW-N-S6_BE4DTN50-18KW_BE4DTN50LC-14KW_062.jpg;https://image.brilliantearth.com/media/product_images/U0/BE3AD603-S_BE4DTN50-18KW_BE4DTN50LC-14KW_070.jpg', 1, 5, 4),
('PROD047', 'Certified Stud Earrings', 1995.00, 'Elegant stud earrings featuring certified lab grown diamonds.', 79.32, 'https://image.brilliantearth.com/media/product_images/90/BE3DME01318_white_top.jpg;https://image.brilliantearth.com/media/product_images/9X/BE3DME01318_additional1.jpeg;https://image.brilliantearth.com/media/product_images/ZP/BE3DME01318-18KY_top.jpg;https://image.brilliantearth.com/media/product_images/Z5/BE3DME01318-yellow.jpg', 1, 6, 2),
('PROD048', 'Diamond Stud Earrings', 495.00, 'Simple and elegant lab grown diamond stud earrings.', 42.00, 'https://image.brilliantearth.com/media/product_images/D4/BE3D0492E_yellow_top.jpg;https://image.brilliantearth.com/media/product_images/A5/BE3D0492E_white_top.jpg;https://image.brilliantearth.com/media/product_images/0F/BE3D0492E_rose_top.jpg;https://image.brilliantearth.com/media/product_images/FJ/BE3D492E-14KR_060.jpg', 1, 8, 2);

-- Note the generated product ids
-- Insert updated data into DIAMOND table using the generated product ids:
-- Placeholder for illustration: Assume product ids starting from 1 to the last generated
-- You need to replace actual product ids if not sequential

-- Insert dummy data into DIAMOND table
INSERT INTO DIAMOND (Shape, Color, Clarity, Carat, Cut, CertificateScan, Price, ProductID, Status)
VALUES
('Round', 'F', 'VVS2', 1.03, 'Super Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/round_new.jpg', 3000, 1, 1),
('Round', 'G', 'VVS2', 1.00, 'Super Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/round_new.jpg', 3000, 1, 1),
('Round', 'F', 'VVS2', 0.56, 'Super Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/round_new.jpg', 3000, 2, 1),
('Round', 'G', 'VS2', 1.20, 'Super Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/round_new.jpg', 3000, 2, 1),
('Round', 'H', 'VS1', 2.01, 'Super Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/round_new.jpg', 3000, 3, 1),
('Round', 'I', 'VVS2', 0.31, 'Very Good', 'https://css.brilliantearth.com/static/img/diamond_shape_new/round_new.jpg', 3000, 3, 1),
('Oval', 'G', 'VS1', 1.50, 'Super Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/oval_new.jpg', 3000, 4, 1),
('Oval', 'J', 'VS1', 1.51, 'Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/oval_new.jpg', 3000, 4, 1),
('Oval', 'F', 'VS1', 1.00, 'Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/oval_new.jpg', 3000, 5, 1),
('Oval', 'J', 'VS1', 1.51, 'Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/oval_new.jpg', 3000, 5, 1),
('Oval', 'G', 'VVS2', 1.70, 'Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/oval_new.jpg', 3000, 6, 1),
('Oval', 'G', 'VS1', 1.50, 'Super Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/oval_new.jpg', 3000, 6, 1),
('Oval', 'F', 'VVS2', 1.00, 'Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/oval_new.jpg', 3000, 7, 1),
('Oval', 'F', 'VVS2', 1.01, 'Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/oval_new.jpg', 3000, 7, 1),
('Emerald', 'F', 'VVS2', 1.30, 'Super Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/emerald_new.jpg', 3000, 8, 1),
('Emerald', 'G', 'VS1', 2.01, 'Super Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/emerald_new.jpg', 4000, 8, 1),
('Emerald', 'G', 'IF', 2.01, 'Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/emerald_new.jpg', 4000, 9, 1),
('Emerald', 'H', 'VVS2', 2.02, 'Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/emerald_new.jpg', 4000, 9, 1),
('Emerald', 'H', 'VVS1', 1.21, 'Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/emerald_new.jpg', 4000, 10, 1),
('Emerald', 'H', 'IF', 2.00, 'Super Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/emerald_new.jpg', 4000, 10, 1),
('Cushion', 'H', 'VS2', 1.03, 'Super Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/cushion_new.jpg', 4000, 11, 1),
('Cushion', 'G', 'VVS1', 1.01, 'Super Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/cushion_new.jpg', 4000, 11, 1),
('Cushion', 'G', 'VVS2', 1.51, 'Super Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/cushion_new.jpg', 4000, 12, 1),
('Cushion', 'G', 'IF', 1.50, 'Super Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/cushion_new.jpg', 4000, 12, 1),
('Cushion', 'I', 'VS2', 2.01, 'Very Good', 'https://css.brilliantearth.com/static/img/diamond_shape_new/cushion_new.jpg', 4000, 13, 1),
('Cushion', 'G', 'VVS2', 1.51, 'Super Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/cushion_new.jpg', 4000, 13, 1),
('Cushion', 'I', 'VS1', 1.90, 'Super Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/cushion_new.jpg', 4000, 14, 1),
('Pear', 'J', 'SI1', 3.01, 'Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/pear_new.jpg', 4000, 14, 1),
('Pear', 'I', 'SI1', 1.75, 'Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/pear_new.jpg', 4000, 15, 1),
('Pear', 'J', 'SI1', 0.96, 'Very Good', 'https://css.brilliantearth.com/static/img/diamond_shape_new/pear_new.jpg', 4000, 15, 1),
('Pear', 'F', 'VVS2', 1.02, 'Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/pear_new.jpg', 4000, 16, 1),
('Pear', 'F', 'VS1', 1.21, 'Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/pear_new.jpg', 4000, 16, 1),
('Pear', 'F', 'VS2', 1.43, 'Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/pear_new.jpg', 4000, 17, 1),
('Radiant', 'J', 'VS2', 2.01, 'Super Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/radiant_new.jpg', 4000, 17, 1),
('Radiant', 'F', 'VVS1', 1.03, 'Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/radiant_new.jpg', 4000, 18, 1),
('Radiant', 'I', 'VS1', 2.01, 'Super Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/radiant_new.jpg', 2750, 18, 1),
('Radiant', 'H', 'VS1', 2.02, 'Super Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/radiant_new.jpg', 2750, 19, 1),
('Radiant', 'G', 'VVS1', 1.50, 'Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/radiant_new.jpg', 2750, 19, 1),
('Princess', 'F', 'VVS2', 1.00, 'Super Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/princess_new.jpg', 2750, 20, 1),
('Princess', 'J', 'VVS1', 2.02, 'Super Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/princess_new.jpg', 2750, 20, 1),
('Princess', 'F', 'VS1', 0.80, 'Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/princess_new.jpg', 2750, 21, 1),
('Princess', 'F', 'VVS2', 1.01, 'Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/princess_new.jpg', 2750, 21, 1),
('Princess', 'G', 'VVS1', 1.51, 'Super Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/princess_new.jpg', 2750, 22, 1),
('Princess', 'G', 'VS1', 1.01, 'Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/princess_new.jpg', 2750, 22, 1),
('Princess', 'F', 'VVS1', 0.92, 'Super Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/princess_new.jpg', 2750, 23, 1),
('Marquise', 'J', 'VS2', 1.00, 'Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/marquise_new.jpg', 2750, 23, 1),
('Marquise', 'G', 'VVS1', 0.53, 'Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/marquise_new.jpg', 2750, 24, 1),
('Marquise', 'F', 'SI1', 0.32, 'Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/marquise_new.jpg', 2750, 24, 1),
('Marquise', 'I', 'VS2', 0.50, 'Very Good', 'https://css.brilliantearth.com/static/img/diamond_shape_new/marquise_new.jpg', 2750, 25, 1),
('Marquise', 'G', 'VS1', 0.50, 'Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/marquise_new.jpg', 2750, 25, 1),
('Asscher', 'J', 'VVS2', 1.01, 'Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/asscher_new.jpg', 2750, 26, 1),
('Asscher', 'F', 'VS1', 0.91, 'Super Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/asscher_new.jpg', 2750, 26, 1),
('Asscher', 'F', 'VVS2', 0.70, 'Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/asscher_new.jpg', 2750, 27, 1),
('Asscher', 'G', 'IF', 0.71, 'Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/asscher_new.jpg', 2750, 27, 1),
('Asscher', 'F', 'VS1', 0.51, 'Super Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/asscher_new.jpg', 1740, 28, 1),
('Asscher', 'F', 'VVS2', 1.00, 'Super Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/asscher_new.jpg', 1740, 28, 1),
('Heart', 'F', 'VS1', 0.91, 'Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/heart_new.jpg', 1740, 29, 1),
('Heart', 'G', 'VS1', 0.90, 'Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/heart_new.jpg', 1740, 29, 1),
('Heart', 'F', 'VS2', 0.71, 'Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/heart_new.jpg', 1740, 30, 1),
('Heart', 'F', 'IF', 0.52, 'Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/heart_new.jpg', 1740, 30, 1),
('Heart', 'F', 'VVS2', 0.56, 'Very Good', 'https://css.brilliantearth.com/static/img/diamond_shape_new/heart_new.jpg', 1740, 31, 1),
('Heart', 'F', 'VS1', 1.05, 'Ideal', 'https://css.brilliantearth.com/static/img/diamond_shape_new/heart_new.jpg', 1740, 31, 1);
-- Define default values
DECLARE @ShellAmount DECIMAL(18, 2) = 50.00;
DECLARE @AmountAvailable INT = 100;

-- Insert shell records
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (1, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (2, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (3, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (4, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (5, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (6, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (7, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (8, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (9, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (10, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (11, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (12, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (13, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (14, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (15, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (16, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (17, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (18, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (19, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (20, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (21, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (22, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (23, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (24, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (25, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (26, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (27, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (28, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (29, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (30, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (31, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (32, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (33, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (34, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (35, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (36, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (37, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (38, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (39, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (40, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (41, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (42, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (43, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (44, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (45, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (46, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (47, @ShellAmount, @AmountAvailable, 1);
INSERT INTO SHELL (ProductID, ShellAmount, AmountAvailable, Status) VALUES (48, @ShellAmount, @AmountAvailable, 1);

	-- Insert dummy data into ORDERDETAIL table
	INSERT INTO ORDERDETAIL (OrderID, LineTotal, ProductID, ShellMaterialID, Size, Status) VALUES
	(1, 2300.00, 1, 2, 7.5, 1),
	(2, 3100.00, 2, 2, 18.0, 1),
	(3, 2000.00, 3, 3, 16.0, 1),
	(4, 3200.00, 4, 4, 6.0, 1),
	(5, 4000.00, 5, 3, 20.0, 1), -- Changed ShellMaterialID to 3
	(6, 5000.00, 1, 3, 22.0, 1), -- Changed ProductID to 1 and ShellMaterialID to 3
	(7, 4500.00, 2, 1, 12.0, 1); -- Changed ProductID to 2 and ShellMaterialID to 1

	-- Insert dummy data into WARRANTY table
	INSERT INTO WARRANTY (OrderDetailID, StartDate, EndDate, Status) VALUES
	(1, GETDATE(), DATEADD(year, 1, GETDATE()), 'Active'),
	(2, GETDATE(), DATEADD(year, 1, GETDATE()), 'Active'),
	(3, GETDATE(), DATEADD(year, 1, GETDATE()), 'Active'),
	(4, GETDATE(), DATEADD(year, 1, GETDATE()), 'Active'),
	(5, GETDATE(), DATEADD(year, 1, GETDATE()), 'Active'),
	(6, GETDATE(), DATEADD(year, 1, GETDATE()), 'Active'),
	(7, GETDATE(), DATEADD(year, 1, GETDATE()), 'Active');

	-- Insert dummy data into SIZE table
	INSERT INTO SIZE (CategoryID, MinSize, MaxSize, Step) VALUES
	(1, 5.0, 12.0, 0.5),
	(2, 8.0, 16.0, 2.0),
	(3, 50.0, 56.0, 1.0),
	(4, 400.0, 700.0, 100.0),
	(5, 5.0, 12.0, 0.5),
	(6, 8.0, 16.0, 2.0),
	(7, 50.0, 56.0, 1.0),
	(8, 400.0, 700.0, 100.0),
	(9,  5.0, 12.0, 0.5);


	INSERT INTO COMPANY(CompanyID, CompanyName, Email, Address, PhoneNumber, MarkupPrice) VALUES
	(1, 'DIAN Jewelry', 'diamondianjewelry@gmail.com', 'San Francisco, CA', '415-354-4623', 0.2)


	-- Insert more dummy data into PURCHASEORDER table with different dates
INSERT INTO PURCHASEORDER (UserID, [Date], PaymentMethod, Name, PhoneNumber, ShippingAddress, TotalPrice, [OrderStatus], PromotionID, PayWithPoint, Note, SaleStaff, DeliveryStaff) VALUES
(1, '2023-01-15', 'Credit Card', 'John Doe', '123-456-7890', '123 Main St', 2200.00, 'Pending', 1, 0, 'Expedited shipping', 1, 2),
(2, '2023-02-20', 'PayPal', 'Jane Smith', '234-567-8901', '456 Elm St', 3050.00, 'Shipped', 2, 1, 'Deliver ASAP', 3, 4),
(3, '2023-02-28', 'Credit Card', 'Alice Johnson', '345-678-9012', '789 Oak St', 1750.00, 'Delivered', 1, 0, 'Extra packaging needed', 2, 3),
(4, '2023-03-05', 'PayPal', 'Bob Brown', '456-789-0123', '101 Pine St', 2900.00, 'Completed', 3, 1, 'Handle with care', 1, 5),
(5, '2023-04-10', 'Credit Card', 'Carol White', '567-890-1234', '202 Cedar St', 3800.00, 'Pending', 4, 0, 'Leave at doorstep', 3, 6),
(6, '2023-05-15', 'PayPal', 'David Black', '678-901-2345', '303 Birch St', 4200.00, 'Cancelled', 5, 1, 'Hold for pickup', 2, 3),
(7, '2023-06-25', 'Credit Card', 'Eve Green', '789-012-3456', '404 Maple St', 4400.00, 'Pending', 6, 0, 'Signature required', 4, 7);

-- Insert more dummy data into ORDERDETAIL table using existing IDs
INSERT INTO ORDERDETAIL (OrderID, LineTotal, ProductID, ShellMaterialID, Size, Status) VALUES
(8, 2300.00, 1, 1, 8.0, 1),
(9, 3100.00, 2, 2, 19.0, 1), 
(10, 2100.00, 3, 3, 17.0, 1),
(11, 3200.00, 4, 4, 15.0, 1),
(12, 4000.00, 5, 3, 21.0, 1),
(13, 5000.00, 1, 3, 23.0, 1),
(14, 4500.00, 2, 1, 10.0, 1);