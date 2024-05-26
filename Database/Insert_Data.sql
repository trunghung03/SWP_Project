-- Insert dummy data into CUSTOMER table
INSERT INTO CUSTOMER (Email, Password, LastName, FirstName, Address, PhoneNumber, Points, Status) VALUES
('customer1@example.com', '123', 'Johnson', 'David', '505 Pine St', '456-789-1234', 5000, 1),
('customer2@example.com', '123', 'Williams', 'Laura', '606 Birch St', '789-123-4567', 4500, 1),
('customer3@example.com', '123', 'Brown', 'Sarah', '707 Cedar St', '123-456-7891', 3500, 1),
('customer4@example.com', '123', 'Jones', 'Daniel', '808 Maple St', '321-654-9872', 2500, 1),
('customer5@example.com', '123', 'Garcia', 'Emily', '909 Oak St', '654-987-3211', 3000, 1),
('customer6@example.com', '123', 'Miller', 'Matthew', '1010 Pine St', '987-321-6542', 4000, 1),
('customer7@example.com', '123', 'Martinez', 'Hannah', '1111 Birch St', '456-789-3213', 1500, 1),
('customer8@example.com', '123', 'Davis', 'James', '1212 Cedar St', '789-123-6544', 500, 1),
('customer9@example.com', '123', 'Rodriguez', 'Sophia', '1313 Maple St', '123-456-7895', 6000, 1),
('customer10@example.com', '123', 'Martinez', 'Alexander', '1414 Oak St', '321-654-9876', 3200, 1),
('customer11@example.com', '123', 'Lopez', 'Mason', '1515 Pine St', '654-987-3217', 2700, 1),
('customer12@example.com', '123', 'Gonzalez', 'Isabella', '1616 Birch St', '987-321-6548', 3700, 1),
('customer13@example.com', '123', 'Wilson', 'Oliver', '1717 Cedar St', '456-789-3219', 4700, 1),
('customer14@example.com', '123', 'Anderson', 'Ella', '1818 Maple St', '789-123-6541', 5700, 1),
('customer15@example.com', '123', 'Thomas', 'William', '1919 Pine St', '123-456-7890', 4500, 1),
('customer16@example.com', '123', 'Taylor', 'Sofia', '2020 Birch St', '321-654-9871', 4900, 1),
('customer17@example.com', '123', 'Moore', 'Grace', '2121 Cedar St', '654-987-3212', 3000, 1),
('customer18@example.com', '123', 'Jackson', 'Ethan', '2222 Maple St', '987-321-6543', 2800, 1),
('customer19@example.com', '123', 'Martin', 'Zoe', '2323 Oak St', '456-789-3214', 3600, 1),
('customer20@example.com', '123', 'Lee', 'Michael', '2424 Pine St', '789-123-6545', 4200, 1);

-- Insert dummy data into EMPLOYEE table
INSERT INTO EMPLOYEE (Role, Email, Password, LastName, FirstName, Address, PhoneNumber, Status) VALUES
('Admin', 'admin1@example.com', '123', 'Brown', 'Kevin', '1111 Oak St', '321-654-1234', 1),
('Customer', 'customer@example.com', '123', 'Green', 'Olivia', '2222 Birch St', '654-321-4321', 1),
('SalesStaff', 'sales1@example.com', '123', 'Adams', 'Lucas', '3333 Pine St', '987-654-3212', 1),
('DeliveryStaff', 'delivery1@example.com', '123', 'Nelson', 'Amelia', '4444 Cedar St', '123-987-6543', 1),
('Manager', 'manager1@example.com', '123', 'Carter', 'Ethan', '5555 Maple St', '321-654-8765', 1),
('SalesStaff', 'sales2@example.com', '123', 'Mitchell', 'Sophia', '6666 Oak St', '654-321-9874', 1),
('DeliveryStaff', 'delivery2@example.com', '123', 'Harris', 'Henry', '7777 Birch St', '987-654-1235', 1),
('Customer', 'customer2@example.com', '123', 'Taylor', 'Emma', '8888 Cedar St', '321-654-5678', 1),
('Admin', 'admin2@example.com', '123', 'Martinez', 'Isabella', '9999 Maple St', '654-321-8765', 1),
('SalesStaff', 'sales3@example.com', '123', 'Clark', 'Liam', '1010 Oak St', '987-654-5432', 1),
('DeliveryStaff', 'delivery3@example.com', '123', 'Lewis', 'Noah', '1111 Pine St', '123-987-7654', 1),
('Manager', 'manager2@example.com', '123', 'Walker', 'Mia', '1212 Birch St', '321-654-0987', 1),
('SalesStaff', 'sales4@example.com', '123', 'Scott', 'James', '1313 Cedar St', '654-321-3456', 1),
('DeliveryStaff', 'delivery4@example.com', '123', 'Young', 'Ava', '1414 Maple St', '987-654-2345', 1),
('Customer', 'customer3@example.com', '123', 'Harris', 'Lily', '1515 Oak St', '123-987-6543', 1),
('Admin', 'admin3@example.com', '123', 'Adams', 'David', '1616 Pine St', '321-654-9871', 1),
('SalesStaff', 'sales5@example.com', '123', 'Baker', 'Emily', '1717 Birch St', '654-321-9870', 1),
('DeliveryStaff', 'delivery5@example.com', '123', 'King', 'Sofia', '1818 Cedar St', '987-654-8765', 1),
('Manager', 'manager3@example.com', '123', 'Wright', 'Lucas', '1919 Maple St', '123-987-6540', 1),
('SalesStaff', 'sales6@example.com', '123', 'Hill', 'Olivia', '2020 Oak St', '321-654-0986', 1);

-- Insert dummy data into ARTICLE table
INSERT INTO ARTICLE (Title, Content, Employee, [Date], [Image], Tag, Status) VALUES
('New Collection Launch', 'We are excited to launch our new collection...', 1, GETDATE(), 'image1.jpg', 'Launch', 1),
('Holiday Sale', 'Enjoy up to 50% off during our holiday sale...', 2, GETDATE(), 'image2.jpg', 'Sale', 1),
('Employee of the Month', 'Congratulations to our employee of the month...', 3, GETDATE(), 'image3.jpg', 'Recognition', 1),
('Product Spotlight', 'Check out our latest product...', 4, GETDATE(), 'image4.jpg', 'Product', 1),
('Customer Testimonial', 'Hear what our customers have to say...', 5, GETDATE(), 'image5.jpg', 'Testimonial', 1),
('Company News', 'Stay updated with our latest company news...', 6, GETDATE(), 'image6.jpg', 'News', 1),
('Upcoming Events', 'Join us for our upcoming events...', 7, GETDATE(), 'image7.jpg', 'Events', 1),
('Summer Collection', 'Introducing our new summer collection...', 8, GETDATE(), 'image8.jpg', 'Launch', 1),
('Winter Deals', 'Enjoy our winter deals...', 9, GETDATE(), 'image9.jpg', 'Sale', 1),
('Employee Award', 'Congratulations to our top performer...', 10, GETDATE(), 'image10.jpg', 'Recognition', 1),
('Featured Product', 'Discover our featured product...', 11, GETDATE(), 'image11.jpg', 'Product', 1),
('Client Feedback', 'Read what our clients are saying...', 12, GETDATE(), 'image12.jpg', 'Testimonial', 1),
('Corporate Update', 'Latest updates from our company...', 13, GETDATE(), 'image13.jpg', 'News', 1),
('Special Events', 'Join us for special events...', 14, GETDATE(), 'image14.jpg', 'Events', 1),
('Autumn Collection', 'Check out our autumn collection...', 15, GETDATE(), 'image15.jpg', 'Launch', 1),
('Spring Sale', 'Spring sale is here...', 16, GETDATE(), 'image16.jpg', 'Sale', 1),
('Top Performer', 'Employee of the month...', 17, GETDATE(), 'image17.jpg', 'Recognition', 1),
('New Product Launch', 'Introducing our latest product...', 18, GETDATE(), 'image18.jpg', 'Product', 1),
('Customer Stories', 'Our customers share their stories...', 19, GETDATE(), 'image19.jpg', 'Testimonial', 1),
('Company Announcements', 'Stay informed with our news...', 20, GETDATE(), 'image20.jpg', 'News', 1);

-- Insert dummy data into PROMOTION table
INSERT INTO PROMOTION ([Name], Amount, ValidFrom, ValidTo, [Description], Code, EmployeeID, Status) VALUES
('Spring Sale', 20.00, GETDATE(), DATEADD(month, 1, GETDATE()), '20% off all items for Spring', 'SPRING20', 1, 1),
('Summer Sale', 15.00, GETDATE(), DATEADD(month, 2, GETDATE()), '15% off all items for Summer', 'SUMMER15', 2, 1),
('Fall Sale', 10.00, GETDATE(), DATEADD(month, 3, GETDATE()), '10% off all items for Fall', 'FALL10', 3, 1),
('Winter Sale', 25.00, GETDATE(), DATEADD(month, 4, GETDATE()), '25% off all items for Winter', 'WINTER25', 4, 1),
('Black Friday', 30.00, GETDATE(), DATEADD(month, 5, GETDATE()), '30% off all items for Black Friday', 'BLACKFRIDAY30', 5, 1),
('Cyber Monday', 35.00, GETDATE(), DATEADD(month, 6, GETDATE()), '35% off all items for Cyber Monday', 'CYBERMONDAY35', 6, 1),
('Holiday Special', 40.00, GETDATE(), DATEADD(month, 7, GETDATE()), '40% off all items for the Holidays', 'HOLIDAY40', 7, 1),
('New Year Sale', 20.00, GETDATE(), DATEADD(month, 1, GETDATE()), '20% off for the new year', 'NEWYEAR20', 1, 1),
('Valentine\'s Day', 15.00, GETDATE(), DATEADD(month, 2, GETDATE()), '15% off for Valentine\'s Day', 'VALENTINE15', 2, 1),
('Easter Special', 10.00, GETDATE(), DATEADD(month, 3, GETDATE()), '10% off for Easter', 'EASTER10', 3, 1),
('Independence Day', 25.00, GETDATE(), DATEADD(month, 4, GETDATE()), '25% off for Independence Day', 'INDEPENDENCE25', 4, 1),
('Labor Day', 30.00, GETDATE(), DATEADD(month, 5, GETDATE()), '30% off for Labor Day', 'LABOR30', 5, 1),
('Halloween', 35.00, GETDATE(), DATEADD(month, 6, GETDATE()), '35% off for Halloween', 'HALLOWEEN35', 6, 1),
('Christmas Special', 40.00, GETDATE(), DATEADD(month, 7, GETDATE()), '40% off for Christmas', 'CHRISTMAS40', 7, 1),
('New Collection Sale', 15.00, GETDATE(), DATEADD(month, 2, GETDATE()), '15% off new collection', 'NEWCOLLECTION15', 3, 1),
('Anniversary Sale', 20.00, GETDATE(), DATEADD(month, 1, GETDATE()), '20% off for our anniversary', 'ANNIVERSARY20', 4, 1),
('Winter Blowout', 30.00, GETDATE(), DATEADD(month, 3, GETDATE()), '30% off all items', 'WINTERBLOWOUT30', 5, 1),
('Spring Fling', 25.00, GETDATE(), DATEADD(month, 2, GETDATE()), '25% off for spring', 'SPRINGFLING25', 6, 1),
('Summer Sizzle', 35.00, GETDATE(), DATEADD(month, 3, GETDATE()), '35% off for summer', 'SUMMERSIZZLE35', 7, 1),
('Fall Frenzy', 40.00, GETDATE(), DATEADD(month, 4, GETDATE()), '40% off for fall', 'FALLFRENZY40', 1, 1);

-- Insert dummy data into PURCHASEORDER table
INSERT INTO PURCHASEORDER (UserID, [Date], PaymentMethod, ShippingAddress, TotalPrice, [OrderStatus], PromotionID, PayWithPoint, Status) VALUES
(1, GETDATE(), 'Credit Card', '123 Main St', 200.00, 'Pending', 1, 0, 1),
(2, GETDATE(), 'PayPal', '456 Elm St', 300.00, 'Pending', 2, 1, 1),
(3, GETDATE(), 'Credit Card', '789 Oak St', 150.00, 'Pending', 3, 0, 1),
(4, GETDATE(), 'PayPal', '101 Pine St', 250.00, 'Pending', 4, 1, 1),
(5, GETDATE(), 'Credit Card', '202 Cedar St', 350.00, 'Pending', 5, 0, 1),
(6, GETDATE(), 'PayPal', '303 Birch St', 400.00, 'Pending', 6, 1, 1),
(7, GETDATE(), 'Credit Card', '404 Maple St', 450.00, 'Pending', 7, 0, 1),
(8, GETDATE(), 'Credit Card', '505 Pine St', 250.00, 'Pending', 1, 0, 1),
(9, GETDATE(), 'PayPal', '606 Birch St', 150.00, 'Pending', 2, 1, 1),
(10, GETDATE(), 'Credit Card', '707 Cedar St', 200.00, 'Pending', 3, 0, 1),
(11, GETDATE(), 'PayPal', '808 Maple St', 350.00, 'Pending', 4, 1, 1),
(12, GETDATE(), 'Credit Card', '909 Oak St', 400.00, 'Pending', 5, 0, 1),
(13, GETDATE(), 'PayPal', '1010 Pine St', 450.00, 'Pending', 6, 1, 1),
(14, GETDATE(), 'Credit Card', '1111 Birch St', 300.00, 'Pending', 7, 0, 1),
(15, GETDATE(), 'PayPal', '1212 Cedar St', 600.00, 'Pending', 1, 1, 1),
(16, GETDATE(), 'Credit Card', '1313 Maple St', 700.00, 'Pending', 2, 0, 1),
(17, GETDATE(), 'PayPal', '1414 Oak St', 800.00, 'Pending', 3, 1, 1),
(18, GETDATE(), 'Credit Card', '1515 Pine St', 500.00, 'Pending', 4, 0, 1),
(19, GETDATE(), 'PayPal', '1616 Birch St', 650.00, 'Pending', 5, 1, 1),
(20, GETDATE(), 'Credit Card', '1717 Cedar St', 550.00, 'Pending', 6, 0, 1);

-- Insert dummy data into SHELLMATERIAL table (only 4 types)
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
('Luminous Light', 'J', 'SI2', 2.50, 'Good', 15000.00, 'scan7.png', 2.50, 1, 1),
('Diamond Glow', 'D', 'VVS1', 1.50, 'Excellent', 6000.00, 'scan8.png', 1.50, 7, 1),
('Perfect Clarity', 'E', 'VS2', 1.00, 'Very Good', 4500.00, 'scan9.png', 1.00, 5, 1),
('Glimmering Gem', 'F', 'IF', 2.25, 'Excellent', 13000.00, 'scan10.png', 2.25, 3, 1),
('Shining Bright', 'G', 'SI1', 1.75, 'Good', 7500.00, 'scan11.png', 1.75, 4, 1),
('Radiant Sparkle', 'H', 'VS2', 1.30, 'Very Good', 6000.00, 'scan12.png', 1.30, 9, 1),
('Glistening Light', 'I', 'VVS2', 1.80, 'Excellent', 10000.00, 'scan13.png', 1.80, 8, 1),
('Luminous Glow', 'J', 'SI2', 2.75, 'Good', 16000.00, 'scan14.png', 2.75, 2, 1);

-- Insert dummy data into COLLECTION table
INSERT INTO COLLECTION (CollectionID, Name, Status, Description)
VALUES
(1, 'Collection 1', 1, 'Description for Collection 1'),
(2, 'Collection 2', 1, 'Description for Collection 2'),
(3, 'Collection 3', 1, 'Description for Collection 3'),
(4, 'Collection 4', 1, 'Description for Collection 4'),
(5, 'Collection 5', 1, 'Description for Collection 5'),
(6, 'Collection 6', 1, 'Description for Collection 6'),
(7, 'Collection 7', 1, 'Description for Collection 7'),
(8, 'Collection 8', 1, 'Description for Collection 8'),
(9, 'Collection 9', 1, 'Description for Collection 9'),
(10, 'Collection 10', 1, 'Description for Collection 10');

-- Insert dummy data into PRODUCT table
INSERT INTO PRODUCT (productCode, [Name], Price, [Description], MainDiamondID, ChargeUp, LaborPrice, ImageLinkList, MainDiamondAmount, SubDiamondAmount, ShellAmount, Status, CollectionID, CategoryID)
VALUES
('Prod001', 'Product 1', 12000.00, 'Description for Product 1', 1, 10.00, 1500.00, 'Link1', 1, 2, 3.00, 1, 1, 1),
('Prod002', 'Product 2', 15000.00, 'Description for Product 2', 2, 12.50, 2000.00, 'Link2', 1, 3, 3.50, 1, 2, 2),
('Prod003', 'Product 3', 10000.00, 'Description for Product 3', 3, 8.75, 1200.00, 'Link3', 1, 1, 2.50, 1, 3, 3),
('Prod004', 'Product 4', 18000.00, 'Description for Product 4', 4, 15.00, 2500.00, 'Link4', 1, 4, 4.00, 1, 4, 4),
('Prod005', 'Product 5', 11000.00, 'Description for Product 5', 5, 9.00, 1400.00, 'Link5', 1, 2, 3.20, 1, 5, 5),
('Prod006', 'Product 6', 16000.00, 'Description for Product 6', 6, 10.00, 1800.00, 'Link6', 1, 2, 3.50, 1, 6, 6),
('Prod007', 'Product 7', 17000.00, 'Description for Product 7', 7, 12.50, 2200.00, 'Link7', 1, 3, 4.00, 1, 7, 7),
('Prod008', 'Product 8', 18000.00, 'Description for Product 8', 8, 15.00, 2500.00, 'Link8', 1, 4, 4.50, 1, 8, 8),
('Prod009', 'Product 9', 19000.00, 'Description for Product 9', 9, 17.50, 2800.00, 'Link9', 1, 5, 5.00, 1, 9, 9),
('Prod010', 'Product 10', 20000.00, 'Description for Product 10', 10, 20.00, 3000.00, 'Link10', 1, 6, 5.50, 1, 10, 10),
('Prod011', 'Product 11', 21000.00, 'Description for Product 11', 1, 22.00, 3200.00, 'Link11', 1, 7, 6.00, 1, 1, 1),
('Prod012', 'Product 12', 22000.00, 'Description for Product 12', 2, 24.00, 3400.00, 'Link12', 1, 8, 6.50, 1, 2, 2),
('Prod013', 'Product 13', 23000.00, 'Description for Product 13', 3, 26.00, 3600.00, 'Link13', 1, 9, 7.00, 1, 3, 3),
('Prod014', 'Product 14', 24000.00, 'Description for Product 14', 4, 28.00, 3800.00, 'Link14', 1, 10, 7.50, 1, 4, 4),
('Prod015', 'Product 15', 25000.00, 'Description for Product 15', 5, 30.00, 4000.00, 'Link15', 1, 11, 8.00, 1, 5, 5),
('Prod016', 'Product 16', 26000.00, 'Description for Product 16', 6, 32.00, 4200.00, 'Link16', 1, 12, 8.50, 1, 6, 6),
('Prod017', 'Product 17', 27000.00, 'Description for Product 17', 7, 34.00, 4400.00, 'Link17', 1, 13, 9.00, 1, 7, 7),
('Prod018', 'Product 18', 28000.00, 'Description for Product 18', 8, 36.00, 4600.00, 'Link18', 1, 14, 9.50, 1, 8, 8),
('Prod019', 'Product 19', 29000.00, 'Description for Product 19', 9, 38.00, 4800.00, 'Link19', 1, 15, 10.00, 1, 9, 9),
('Prod020', 'Product 20', 30000.00, 'Description for Product 20', 10, 40.00, 5000.00, 'Link20', 1, 16, 10.50, 1, 10, 10);

-- Insert dummy data into ORDERDETAIL table
INSERT INTO ORDERDETAIL (OrderID, LineTotal, ProductID, ShellMaterialID, SubDiamondID, Size, Status) VALUES
(1, 2000.00, 1, 1, 2, 5.5, 1),
(2, 5000.00, 2, 2, 3, 6.0, 1),
(3, 3000.00, 3, 3, 4, 6.5, 1),
(4, 1500.00, 4, 4, 5, 7.0, 1),
(5, 3500.00, 5, 1, 6, 7.5, 1),
(6, 10000.00, 6, 2, 7, 8.0, 1),
(7, 4000.00, 7, 3, 8, 8.5, 1),
(8, 3000.00, 8, 4, 9, 9.0, 1),
(9, 5000.00, 9, 1, 10, 9.5, 1),
(10, 7000.00, 10, 2, 11, 10.0, 1),
(11, 9000.00, 11, 3, 12, 10.5, 1),
(12, 11000.00, 12, 4, 13, 11.0, 1),
(13, 13000.00, 13, 1, 14, 11.5, 1),
(14, 15000.00, 14, 2, 15, 12.0, 1),
(15, 17000.00, 15, 3, 16, 12.5, 1),
(16, 19000.00, 16, 4, 17, 13.0, 1),
(17, 21000.00, 17, 1, 18, 13.5, 1),
(18, 23000.00, 18, 2, 19, 14.0, 1),
(19, 25000.00, 19, 3, 20, 14.5, 1),
(20, 27000.00, 20, 4, 1, 15.0, 1);

-- Insert dummy data into WARRANTY table
INSERT INTO WARRANTY (OrderDetailID, StartDate, EndDate, Status) VALUES
(1, GETDATE(), DATEADD(year, 1, GETDATE()), 1),
(2, GETDATE(), DATEADD(year, 1, GETDATE()), 1),
(3, GETDATE(), DATEADD(year, 1, GETDATE()), 1),
(4, GETDATE(), DATEADD(year, 1, GETDATE()), 1),
(5, GETDATE(), DATEADD(year, 1, GETDATE()), 1),
(6, GETDATE(), DATEADD(year, 1, GETDATE()), 1),
(7, GETDATE(), DATEADD(year, 1, GETDATE()), 1),
(8, GETDATE(), DATEADD(year, 1, GETDATE()), 1),
(9, GETDATE(), DATEADD(year, 1, GETDATE()), 1),
(10, GETDATE(), DATEADD(year, 1, GETDATE()), 1),
(11, GETDATE(), DATEADD(year, 1, GETDATE()), 1),
(12, GETDATE(), DATEADD(year, 1, GETDATE()), 1),
(13, GETDATE(), DATEADD(year, 1, GETDATE()), 1),
(14, GETDATE(), DATEADD(year, 1, GETDATE()), 1),
(15, GETDATE(), DATEADD(year, 1, GETDATE()), 1),
(16, GETDATE(), DATEADD(year, 1, GETDATE()), 1),
(17, GETDATE(), DATEADD(year, 1, GETDATE()), 1),
(18, GETDATE(), DATEADD(year, 1, GETDATE()), 1),
(19, GETDATE(), DATEADD(year, 1, GETDATE()), 1),
(20, GETDATE(), DATEADD(year, 1, GETDATE()), 1);

-- Insert dummy data into SIZE table
INSERT INTO SIZE (CategoryID, MinSize, MaxSize, Step) VALUES
(1, 5.0, 10.0, 0.5),
(2, 16.0, 22.0, 0.5),
(3, 15.0, 21.0, 0.5),
(4, 5.0, 10.0, 0.5),
(5, 16.0, 22.0, 0.5),
(6, 15.0, 21.0, 0.5),
(7, 5.0, 10.0, 0.5);
