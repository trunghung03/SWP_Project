INSERT INTO REGISTERUSER (UserID, Email, Password, Role, LastName, FirstName, Status, Address, PhoneNumber, Points)
VALUES
('U001', 'john.doe@example.com', 'password123', 'Admin', 'Doe', 'John', 'Active', '123 Baker Street, London', '1234567890', 100),
('U002', 'jane.smith@example.com', 'password123', 'Manager', 'Smith', 'Jane', 'Active', '234 Elm Street, New York', '2345678901', 150),
('U003', 'bob.jones@example.com', 'password123', 'Sales', 'Jones', 'Bob', 'Active', '345 Maple Avenue, Toronto', '3456789012', 200),
('U004', 'alice.johnson@example.com', 'password123', 'Delivery', 'Johnson', 'Alice', 'Active', '456 Pine Road, Sydney', '4567890123', 250),
('U005', 'carol.white@example.com', 'password123', 'Customer', 'White', 'Carol', 'Active', '567 Oak Lane, San Francisco', '5678901234', 300),
('U006', 'dave.black@example.com', 'password123', 'Admin', 'Black', 'Dave', 'Inactive', '678 Cedar Blvd, Tokyo', '6789012345', 350),
('U007', 'eve.green@example.com', 'password123', 'Manager', 'Green', 'Eve', 'Active', '789 Spruce Street, Paris', '7890123456', 400),
('U008', 'frank.brown@example.com', 'password123', 'Sales', 'Brown', 'Frank', 'Active', '890 Willow Path, Berlin', '8901234567', 450),
('U009', 'grace.gray@example.com', 'password123', 'Delivery', 'Gray', 'Grace', 'Inactive', '901 Maple Parkway, Moscow', '9012345678', 500),
('U010', 'hank.wilson@example.com', 'password123', 'Customer', 'Wilson', 'Hank', 'Active', '012 Oak Avenue, Beijing', '0123456789', 550);

INSERT INTO CONTENT (ContentID, Title, Content, Creator, Date, Image, Tag)
VALUES
('C001', 'Welcome to Our Blog', 'This is the first post in our blog...', 'U001', '2023-01-01 10:00:00', 'image1.jpg', 'Blog'),
('C002', 'FAQs Answered', 'Here are some of the most frequently asked questions...', 'U002', '2023-01-02 11:00:00', 'image2.jpg', 'FAQ'),
('C003', 'Our Story', 'Learn more about our journey and mission...', 'U003', '2023-01-03 12:00:00', 'image3.jpg', 'Introduction'),
('C004', 'New Product Line', 'We are excited to introduce our new product line...', 'U004', '2023-01-04 13:00:00', 'image4.jpg', 'Blog'),
('C005', 'How to Use Our Products', 'Get the most out of our products by following these tips...', 'U005', '2023-01-05 14:00:00', 'image5.jpg', 'Blog'),
('C006', 'Upcoming Events', 'Don’t miss our upcoming events scheduled for this year...', 'U006', '2023-01-06 15:00:00', 'image6.jpg', 'Blog'),
('C007', 'Daily Tips', 'Quick tips for your daily needs...', 'U007', '2023-01-07 16:00:00', 'image7.jpg', 'Blog'),
('C008', 'Customer Stories', 'Read about how our products are changing lives...', 'U008', '2023-01-08 17:00:00', 'image8.jpg', 'Blog'),
('C009', 'Behind the Scenes', 'A peek into our day-to-day operations...', 'U009', '2023-01-09 18:00:00', 'image9.jpg', 'Blog'),
('C010', 'Meet the Team', 'Introducing our passionate team members...', 'U010', '2023-01-10 19:00:00', 'image10.jpg', 'Blog');

INSERT INTO PROMOTION (PromotionID, Amount, ValidFrom, ValidTo, Description, Code)
VALUES
('P001', 10.00, '2023-02-01 00:00:00', '2023-02-28 23:59:59', '10% off on all products this February!', 'FEB10'),
('P002', 15.00, '2023-03-01 00:00:00', '2023-03-31 23:59:59', 'Spring Sale - 15% off storewide', 'SPRING15'),
('P003', 20.00, '2023-04-01 00:00:00', '2023-04-30 23:59:59', '20% off for Easter Weekend', 'EASTER20'),
('P004', 25.00, '2023-05-01 00:00:00', '2023-05-07 23:59:59', 'Mothers Day special - 25% off', 'MDAY25'),
('P005', 5.00, '2023-06-01 00:00:00', '2023-06-30 23:59:59', '5% off on all items this June!', 'JUNE5'),
('P006', 30.00, '2023-07-01 00:00:00', '2023-07-04 23:59:59', 'July 4th Sale - 30% off', 'JULY4'),
('P007', 50.00, '2023-08-01 00:00:00', '2023-08-31 23:59:59', 'Summer Clearance - Up to 50% off', 'SUMMER50'),
('P008', 35.00, '2023-09-01 00:00:00', '2023-09-30 23:59:59', 'Back to School - 35% off', 'SCHOOL35'),
('P009', 40.00, '2023-10-01 00:00:00', '2023-10-31 23:59:59', 'Halloween Special - 40% off', 'HALLOWEEN40'),
('P010', 25.00, '2023-11-01 00:00:00', '2023-11-30 23:59:59', 'Thanksgiving Sale - 25% off', 'THANKS25');

INSERT INTO PURCHASEORDER (OrderID, UserID, Date, PaymentMethod, ShippingAddress, TotalPrice, Status, PromotionID, PayWithPoint)
VALUES
('O001', 'U001', '2023-01-15 10:00:00', 'Bank', '123 Baker Street, London', 1200.00, 'Preparing', 'P001', 0),
('O002', 'U002', '2023-01-16 11:00:00', 'Cash', '234 Elm Street, New York', 1500.00, 'Completed', NULL, 1),
('O003', 'U003', '2023-01-17 12:00:00', 'Bank', '345 Maple Avenue, Toronto', 800.00, 'Cancelled', 'P002', 0),
('O004', 'U004', '2023-01-18 13:00:00', 'Cash', '456 Pine Road, Sydney', 500.00, 'Preparing', NULL, 1),
('O005', 'U005', '2023-01-19 14:00:00', 'Bank', '567 Oak Lane, San Francisco', 1100.00, 'Completed', 'P003', 0),
('O006', 'U006', '2023-01-20 15:00:00', 'Cash', '678 Cedar Blvd, Tokyo', 600.00, 'Preparing', NULL, 1),
('O007', 'U007', '2023-01-21 16:00:00', 'Bank', '789 Spruce Street, Paris', 1300.00, 'Cancelled', 'P004', 0),
('O008', 'U008', '2023-01-22 17:00:00', 'Cash', '890 Willow Path, Berlin', 400.00, 'Completed', NULL, 1),
('O009', 'U009', '2023-01-23 18:00:00', 'Bank', '901 Maple Parkway, Moscow', 950.00, 'Preparing', 'P005', 0),
('O010', 'U010', '2023-01-24 19:00:00', 'Cash', '012 Oak Avenue, Beijing', 700.00, 'Completed', NULL, 1);


INSERT INTO SHELL (ShellID, Name)
VALUES
('S001', 'Classic Round'),
('S002', 'Elegant Oval'),
('S003', 'Modern Cushion'),
('S004', 'Sophisticated Princess'),
('S005', 'Timeless Pear'),
('S006', 'Chic Marquise'),
('S007', 'Bold Radiant'),
('S008', 'Unique Heart'),
('S009', 'Stylish Emerald'),
('S010', 'Vintage Asscher');


INSERT INTO SHELLINVENTORY (ShellInventoryID, ShellID, Size, Price, AmountAvailable)
VALUES
('SI001', 'S001', 6, 100.00, 50),
('SI002', 'S001', 7, 100.00, 40),
('SI003', 'S002', 6, 150.00, 30),
('SI004', 'S002', 7, 150.00, 20),
('SI005', 'S003', 6, 200.00, 10),
('SI006', 'S003', 7, 200.00, 5),
('SI007', 'S004', 6, 250.00, 25),
('SI008', 'S004', 7, 250.00, 15),
('SI009', 'S005', 6, 300.00, 8),
('SI010', 'S005', 7, 300.00, 2);

INSERT INTO DIAMOND (DiamondID, Name, Color, Clarity, Carat, Cut, CertificateScan, Cost, AmountAvailable)
VALUES
('D001', 'Brilliant Star', 'D', 'VVS1', 1.00, 'Excellent', 'cert001.jpg', 5000.00, 10),
('D002', 'Ocean Blue', 'E', 'VS1', 0.75, 'Very Good', 'cert002.jpg', 3500.00, 20),
('D003', 'Fiery Red', 'F', 'SI1', 0.50, 'Good', 'cert003.jpg', 2500.00, 30),
('D004', 'Green Envy', 'G', 'SI2', 0.25, 'Fair', 'cert004.jpg', 1500.00, 40),
('D005', 'Royal Purple', 'H', 'I1', 0.20, 'Poor', 'cert005.jpg', 1000.00, 50),
('D006', 'Midnight Black', 'I', 'I2', 0.15, 'Poor', 'cert006.jpg', 900.00, 60),
('D007', 'Sunset Orange', 'J', 'I3', 0.10, 'Poor', 'cert007.jpg', 800.00, 70),
('D008', 'Ice White', 'K', 'VVS2', 1.50, 'Excellent', 'cert008.jpg', 7500.00, 80),
('D009', 'Mystic Pink', 'L', 'VS2', 2.00, 'Very Good', 'cert009.jpg', 9500.00, 90),
('D010', 'Golden Yellow', 'M', 'VVS1', 2.50, 'Excellent', 'cert010.jpg', 12500.00, 100);


INSERT INTO PRODUCT (ProductID, Name, Price, Description, MainDiamondID, ChargeUp, LaborPrice, ImageLinkList, SubDiamondAmount)
VALUES
('P001', 'Royal Engagement Ring', 1500.00, 'A perfect ring for that special someone.', 'D001', 10.00, 200.00, 'imageP001.jpg', 2),
('P002', 'Elegant Necklace', 1200.00, 'An elegant necklace for all occasions.', 'D002', 5.00, 150.00, 'imageP002.jpg', 1),
('P003', 'Stylish Bracelet', 800.00, 'A stylish bracelet to complete your outfit.', 'D003', 15.00, 100.00, 'imageP003.jpg', 3),
('P004', 'Modern Earrings', 500.00, 'Chic earrings for the modern woman.', 'D004', 20.00, 80.00, 'imageP004.jpg', 0),
('P005', 'Vintage Brooch', 300.00, 'A vintage brooch to add to your collection.', 'D005', 25.00, 50.00, 'imageP005.jpg', 4),
('P006', 'Contemporary Watch', 700.00, 'A contemporary watch for everyday wear.', 'D006', 30.00, 120.00, 'imageP006.jpg', 0),
('P007', 'Chic Cufflinks', 450.00, 'Chic cufflinks for the distinguished gentleman.', 'D007', 35.00, 70.00, 'imageP007.jpg', 1),
('P008', 'Traditional Tiara', 2000.00, 'A traditional tiara for your royal moments.', 'D008', 40.00, 250.00, 'imageP008.jpg', 5),
('P009', 'Sophisticated Anklet', 350.00, 'A sophisticated anklet to enhance your look.', 'D009', 45.00, 60.00, 'imageP009.jpg', 2),
('P010', 'Classic Toe Ring', 100.00, 'A classic toe ring for a subtle style statement.', 'D010', 50.00, 30.00, 'imageP010.jpg', 0);


INSERT INTO ORDERLINE (OrderLineID, OrderID, LineTotal, ProductID, ShellInventoryID, SubDiamondID)
VALUES
('OL001', 'O001', 1600.00, 'P001', 'SI001', 'D002'),
('OL002', 'O002', 1350.00, 'P002', 'SI002', 'D003'),
('OL003', 'O003', 850.00, 'P003', 'SI003', 'D004'),
('OL004', 'O004', 580.00, 'P004', 'SI004', 'D005'),
('OL005', 'O005', 1150.00, 'P005', 'SI005', 'D006'),
('OL006', 'O006', 720.00, 'P006', 'SI006', 'D007'),
('OL007', 'O007', 1450.00, 'P007', 'SI007', 'D008'),
('OL008', 'O008', 400.00, 'P008', 'SI008', 'D009'),
('OL009', 'O009', 950.00, 'P009', 'SI009', 'D010'),
('OL010', 'O010', 130.00, 'P010', 'SI010', 'D001');


INSERT INTO WARRANTY (OrderLineID, StartDate, EndDate, Status)
VALUES
('OL001', '2023-01-15', '2024-01-14', 'Valid'),
('OL002', '2023-01-16', '2024-01-15', 'Valid'),
('OL003', '2023-01-17', '2024-01-16', 'Expired'),
('OL004', '2023-01-18', '2024-01-17', 'Valid'),
('OL005', '2023-01-19', '2024-01-18', 'Valid'),
('OL006', '2023-01-20', '2024-01-19', 'Valid'),
('OL007', '2023-01-21', '2024-01-20', 'Expired'),
('OL008', '2023-01-22', '2024-01-21', 'Valid'),
('OL009', '2023-01-23', '2024-01-22', 'Expired'),
('OL010', '2023-01-24', '2024-01-23', 'Valid');

INSERT INTO CATEGORY (CategoryID, Name)
VALUES
('CT001', 'Rings'),
('CT002', 'Necklaces'),
('CT003', 'Bracelets'),
('CT004', 'Earrings'),
('CT005', 'Brooches'),
('CT006', 'Watches'),
('CT007', 'Cufflinks'),
('CT008', 'Tiaras'),
('CT009', 'Anklets'),
('CT010', 'Toe Rings');

INSERT INTO PRODUCTCATEGORY (ProductID, CategoryID)
VALUES
('P001', 'CT001'),
('P002', 'CT002'),
('P003', 'CT003'),
('P004', 'CT004'),
('P005', 'CT005'),
('P006', 'CT006'),
('P007', 'CT007'),
('P008', 'CT008'),
('P009', 'CT009'),
('P010', 'CT010');
