-- Insert dummy data into CUSTOMER table
INSERT INTO CUSTOMER (Email, Password, LastName, FirstName, Address, PhoneNumber, Points, Status) VALUES
('john.doe@example.com', '123', 'Doe', 'John', '123 Main St', '123-456-7890', 1000, 1),
('jane.smith@example.com', '123', 'Smith', 'Jane', '456 Elm St', '987-654-3210', 1500, 1),
('michael.jordan@example.com', '123', 'Jordan', 'Michael', '789 Oak St', '123-789-4560', 2000, 1),
('emma.watson@example.com', '123', 'Watson', 'Emma', '101 Pine St', '456-123-7890', 2500, 1),
('oliver.queen@example.com', '123', 'Queen', 'Oliver', '202 Cedar St', '789-456-1230', 3000, 1),
('bruce.wayne@example.com', '123', 'Wayne', 'Bruce', '303 Birch St', '321-654-9871', 3500, 1),
('clark.kent@example.com', '123', 'Kent', 'Clark', '404 Maple St', '654-987-3210', 4000, 1);

-- Insert dummy data into EMPLOYEE table
INSERT INTO EMPLOYEE (Role, Email, Password, LastName, FirstName, Address, PhoneNumber, Status) VALUES
('Admin', 'admin@example.com', '123', 'Admin', 'One', '789 Pine St', '321-654-9870', 1),
('Manager', 'manager@example.com', '123', 'Manager', 'Two', '101 Oak St', '654-321-0987', 1),
('Sales', 'sales@example.com', '123', 'Sales', 'Three', '123 Elm St', '123-987-6540', 1),
('Support', 'support@example.com', '123', 'Support', 'Four', '456 Birch St', '456-789-0123', 1),
('Tech', 'tech@example.com', '123', 'Tech', 'Five', '789 Cedar St', '789-012-3456', 1),
('HR', 'hr@example.com', '123', 'HR', 'Six', '101 Maple St', '321-456-7890', 1),
('Finance', 'finance@example.com', '123', 'Finance', 'Seven', '202 Oak St', '654-321-1234', 1);

-- Insert dummy data into ARTICLE table
INSERT INTO ARTICLE (Title, Content, Employee, [Date], [Image], Tag, Status) VALUES
('New Collection Launch', 'We are excited to launch our new collection...', 1, GETDATE(), 'image1.jpg', 'Launch', 1),
('Holiday Sale', 'Enjoy up to 50% off during our holiday sale...', 2, GETDATE(), 'image2.jpg', 'Sale', 1),
('Employee of the Month', 'Congratulations to our employee of the month...', 3, GETDATE(), 'image3.jpg', 'Recognition', 1),
('Product Spotlight', 'Check out our latest product...', 4, GETDATE(), 'image4.jpg', 'Product', 1),
('Customer Testimonial', 'Hear what our customers have to say...', 5, GETDATE(), 'image5.jpg', 'Testimonial', 1),
('Company News', 'Stay updated with our latest company news...', 6, GETDATE(), 'image6.jpg', 'News', 1),
('Upcoming Events', 'Join us for our upcoming events...', 7, GETDATE(), 'image7.jpg', 'Events', 1);

-- Insert dummy data into PROMOTION table
INSERT INTO PROMOTION ([Name], Amount, ValidFrom, ValidTo, [Description], Code, EmployeeID, Status) VALUES
('Spring Sale', 20.00, GETDATE(), DATEADD(month, 1, GETDATE()), '20% off all items for Spring', 'SPRING20', 1, 1),
('Summer Sale', 15.00, GETDATE(), DATEADD(month, 2, GETDATE()), '15% off all items for Summer', 'SUMMER15', 2, 1),
('Fall Sale', 10.00, GETDATE(), DATEADD(month, 3, GETDATE()), '10% off all items for Fall', 'FALL10', 3, 1),
('Winter Sale', 25.00, GETDATE(), DATEADD(month, 4, GETDATE()), '25% off all items for Winter', 'WINTER25', 4, 1),
('Black Friday', 30.00, GETDATE(), DATEADD(month, 5, GETDATE()), '30% off all items for Black Friday', 'BLACKFRIDAY30', 5, 1),
('Cyber Monday', 35.00, GETDATE(), DATEADD(month, 6, GETDATE()), '35% off all items for Cyber Monday', 'CYBERMONDAY35', 6, 1),
('Holiday Special', 40.00, GETDATE(), DATEADD(month, 7, GETDATE()), '40% off all items for the Holidays', 'HOLIDAY40', 7, 1);

-- Insert dummy data into PURCHASEORDER table
INSERT INTO PURCHASEORDER (UserID, [Date], PaymentMethod, ShippingAddress, TotalPrice, [OrderStatus], PromotionID, PayWithPoint, Status) VALUES
(1, GETDATE(), 'Credit Card', '123 Main St', 200.00, 'Pending', 1, 0, 1),
(2, GETDATE(), 'PayPal', '456 Elm St', 300.00, 'Pending', 2, 1, 1),
(3, GETDATE(), 'Credit Card', '789 Oak St', 150.00, 'Pending', 3, 0, 1),
(4, GETDATE(), 'PayPal', '101 Pine St', 250.00, 'Pending', 4, 1, 1),
(5, GETDATE(), 'Credit Card', '202 Cedar St', 350.00, 'Pending', 5, 0, 1),
(6, GETDATE(), 'PayPal', '303 Birch St', 400.00, 'Pending', 6, 1, 1),
(7, GETDATE(), 'Credit Card', '404 Maple St', 450.00, 'Pending', 7, 0, 1);

-- Insert dummy data into SHELLMATERIAL table
INSERT INTO SHELLMATERIAL ([Name], AmountAvailable, Price, Status) VALUES
('Diamond', 100.00, 5000.00, 1),
('Gold', 200.00, 50.00, 1),
('Rose Gold', 150.00, 55.00, 1),
('White Gold', 120.00, 60.00, 1);

-- Insert dummy data into DIAMOND table
INSERT INTO DIAMOND ([Name], Color, Clarity, Carat, Cut, Cost, CertificateScan, DiamondSize, AmountAvailable, Status)
VALUES
('Brilliant Rose', 'D', 'VVS1', 1.25, 'Excellent', 5000.00, 'scan1.png', 1.25, 10, 1),
('Perfect Princess', 'E', 'VS1', 0.95, 'Very Good', 4000.00, 'scan2.png', 0.95, 5, 1),
('Sparkling Emerald', 'F', 'IF', 2.00, 'Excellent', 12000.00, 'scan3.png', 3.00, 2, 1),
('Shining Star', 'G', 'SI1', 1.50, 'Good', 7000.00, 'scan4.png', 1.50, 3, 1),
('Radiant Beauty', 'H', 'VS2', 1.20, 'Very Good', 5500.00, 'scan5.png', 1.20, 8, 1),
('Glistening Gem', 'I', 'VVS2', 1.75, 'Excellent', 9500.00, 'scan6.png', 1.75, 6, 1),
('Luminous Light', 'J', 'SI2', 2.50, 'Good', 15000.00, 'scan7.png', 2.50, 1, 1);


-- Insert dummy data into COLLECTIONS table
INSERT INTO COLLECTION (CollectionID, Name, Status, Description)
VALUES
(1, 'Collection 1', 1, 'Description for Collection 1'),
(2, 'Collection 2', 1, 'Description for Collection 2'),
(3, 'Collection 3', 1, 'Description for Collection 3'),
(4, 'Collection 4', 1, 'Description for Collection 4'),
(5, 'Collection 5', 1, 'Description for Collection 5');

-- Insert dummy data into PRODUCT table
INSERT INTO PRODUCT (productCode, [Name], Price, [Description], MainDiamondID, ChargeUp, LaborPrice, ImageLinkList, MainDiamondAmount, SubDiamondAmount, ShellAmount, Status, CollectionID)
VALUES
('PROD001', 'Product 1', 12000.00, 'Description for Product 1', 1, 10.00, 1500.00, 'Link1', 1, 2, 3.00, 1, 1),
('PROD002', 'Product 2', 15000.00, 'Description for Product 2', 2, 12.50, 2000.00, 'Link2', 1, 3, 3.50, 1, 2),
('PROD003', 'Product 3', 10000.00, 'Description for Product 3', 3, 8.75, 1200.00, 'Link3', 1, 1, 2.50, 1, 3),
('PROD004', 'Product 4', 18000.00, 'Description for Product 4', 4, 15.00, 2500.00, 'Link4', 1, 4, 4.00, 1, 4),
('PROD005', 'Product 5', 11000.00, 'Description for Product 5', 5, 9.00, 1400.00, 'Link5', 1, 2, 3.20, 1, 5);

-- Insert dummy data into ORDERDETAIL table
INSERT INTO ORDERDETAIL (OrderID, LineTotal, ProductID, ShellMaterialID, SubDiamondID, Size, Status) VALUES
(1, 2000.00, 1, 2, 3, 7.5, 1),
(2, 5000.00, 2, 2, 3, 18.0, 1),
(3, 3000.00, 3, 3, 4, 16.0, 1),
(4, 1500.00, 4, 4, 5, 6.0, 1),
(5, 3500.00, 5, 3, 6, 20.0, 1), -- Changed ShellMaterialID to 3
(6, 10000.00, 1, 3, 7, 22.0, 1), -- Changed ProductID to 1 and ShellMaterialID to 3
(7, 4000.00, 2, 1, 1, 12.0, 1); -- Changed ProductID to 2 and ShellMaterialID to 1

-- Insert dummy data into WARRANTY table
INSERT INTO WARRANTY (OrderDetailID, StartDate, EndDate, Status) VALUES
(1, GETDATE(), DATEADD(year, 1, GETDATE()), 1),
(2, GETDATE(), DATEADD(year, 1, GETDATE()), 1),
(3, GETDATE(), DATEADD(year, 1, GETDATE()), 1),
(4, GETDATE(), DATEADD(year, 1, GETDATE()), 1),
(5, GETDATE(), DATEADD(year, 1, GETDATE()), 1),
(6, GETDATE(), DATEADD(year, 1, GETDATE()), 1),
(7, GETDATE(), DATEADD(year, 1, GETDATE()), 1);

-- Insert dummy data into CATEGORY table
INSERT INTO CATEGORY ([Name], Status) VALUES
('Rings', 1),
('Necklaces', 1),
('Bracelets', 1),
('Earrings', 1),
('Pendants', 1),
('Tiaras', 1),
('Cufflinks', 1);

-- Insert dummy data into SIZE table
INSERT INTO SIZE (CategoryID, MinSize, MaxSize, Step) VALUES
(1, 5.0, 10.0, 0.5),
(2, 16.0, 22.0, 0.5),
(3, 15.0, 21.0, 0.5),
(4, 5.0, 10.0, 0.5),
(5, 16.0, 22.0, 0.5),
(6, 15.0, 21.0, 0.5),
(7, 5.0, 10.0, 0.5);
