-- Use master database to perform drop/create database operations
USE master;
GO

-- Check if the database exists
IF EXISTS(SELECT * FROM sys.databases WHERE name = 'DIAN')
BEGIN
    -- If the database exists, drop it
    ALTER DATABASE DIAN SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE DIAN;
END
GO

-- Create the new database
CREATE DATABASE DIAN;
GO

-- Switch context to the new database
USE DIAN;
GO

-- User table
CREATE TABLE REGISTERUSER (
    UserID INT PRIMARY KEY IDENTITY(1,1),
    Email NVARCHAR(254) NOT NULL,
    Password NVARCHAR(128) NOT NULL,
    Role NVARCHAR(20) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    FirstName NVARCHAR(50) NOT NULL,
    Status BIT NOT NULL DEFAULT 1,
    Address NVARCHAR(255),
    PhoneNumber NVARCHAR(20),
    Points BIGINT 
);

-- Content table
CREATE TABLE ARTICLE (
    ContentID INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(255) NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    Creator INT NOT NULL FOREIGN KEY REFERENCES REGISTERUSER(UserID),
    [Date] DATETIME2 NOT NULL,
    [Image] NVARCHAR(255),
    Tag NVARCHAR(50) NOT NULL,
    Status BIT NOT NULL DEFAULT 1
);

-- Promotion table
CREATE TABLE PROMOTION (
    PromotionID INT PRIMARY KEY IDENTITY(1,1),
    [Name] NVARCHAR(50),
    Amount DECIMAL(5, 2) NOT NULL CHECK (Amount >= 0 AND Amount <= 100), -- Constrain the percentage to be between 0 and 100
    ValidFrom DATETIME2 NOT NULL,
    ValidTo DATETIME2 NOT NULL,
    [Description] NVARCHAR(MAX),
    Code NVARCHAR(50) NOT NULL,
    Status BIT NOT NULL DEFAULT 1
);

-- Purchase Order table
CREATE TABLE PURCHASEORDER (
    OrderID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL FOREIGN KEY REFERENCES REGISTERUSER(UserID),
    [Date] DATETIME2 NOT NULL,
    PaymentMethod NVARCHAR(50) NOT NULL,
    ShippingAddress NVARCHAR(255) NOT NULL,
    TotalPrice DECIMAL(18, 2) NOT NULL,
    [OrderStatus] NVARCHAR(50) NOT NULL DEFAULT 'Pending', -- Renamed to OrderStatus
    PromotionID INT NULL FOREIGN KEY REFERENCES PROMOTION(PromotionID),
    PayWithPoint BIT,
    Status BIT NOT NULL DEFAULT 1
);

-- Revised Shell table with ShellID as the primary key
CREATE TABLE SHELL (
    ShellID INT PRIMARY KEY IDENTITY(1,1),
    [Name] NVARCHAR(100) NOT NULL,
    Status BIT NOT NULL DEFAULT 1
);

-- New Shell Size table to track sizes and their availability
CREATE TABLE SHELLINVENTORY (
    ShellInventoryID INT PRIMARY KEY IDENTITY(1,1),
    ShellID INT NOT NULL FOREIGN KEY REFERENCES SHELL(ShellID),
    Size DECIMAL(5, 2) NOT NULL,
    Price DECIMAL(18, 2) NOT NULL,
    AmountAvailable INT NOT NULL,
    Status BIT NOT NULL DEFAULT 1
);

-- Diamond table
CREATE TABLE DIAMOND (
    DiamondID INT PRIMARY KEY IDENTITY(1,1),
    [Name] NVARCHAR(100) NOT NULL,
    Color NVARCHAR(50) ,
    Clarity NVARCHAR(50) ,
    Carat DECIMAL(5, 2) ,
    Cut NVARCHAR(50),
    CertificateScan NVARCHAR(MAX) ,
    Cost DECIMAL(18, 2) NOT NULL,
    AmountAvailable INT NOT NULL,
    Status BIT NOT NULL DEFAULT 1
);

-- Product table
CREATE TABLE PRODUCT (
    proID INT PRIMARY KEY IDENTITY(1,1),
    proCode NVARCHAR(36) UNIQUE NOT NULL,
    [Name] NVARCHAR(100) NOT NULL,
    Price DECIMAL(18, 2) NOT NULL,
    [Description] NVARCHAR(MAX) ,
    MainDiamondID INT NOT NULL FOREIGN KEY REFERENCES DIAMOND(DiamondID),
    ChargeUp DECIMAL(5, 2) CHECK (ChargeUp >= 0 AND ChargeUp <= 100), -- Constrain the percentage to be between 0 and 100
    LaborPrice DECIMAL(18, 2),
    ImageLinkList NVARCHAR(MAX),
    SubDiamondAmount INT,
    Status BIT NOT NULL DEFAULT 1
);

-- Order Line table
CREATE TABLE ORDERDETAIL (
    OrderDetailID INT PRIMARY KEY IDENTITY(1,1),
    OrderID INT NOT NULL FOREIGN KEY REFERENCES PURCHASEORDER(OrderID),
    LineTotal DECIMAL(18, 2) NOT NULL,
    ProductID INT NOT NULL FOREIGN KEY REFERENCES PRODUCT(proID),
    ShellInventoryID INT NOT NULL FOREIGN KEY REFERENCES SHELLINVENTORY(ShellInventoryID),
    SubDiamondID INT NOT NULL FOREIGN KEY REFERENCES DIAMOND(DiamondID),
    Status BIT NOT NULL DEFAULT 1
);

-- Warranty table
CREATE TABLE WARRANTY (
    OrderDetailID INT PRIMARY KEY FOREIGN KEY REFERENCES ORDERDETAIL(OrderDetailID),
    StartDate DATETIME2 NOT NULL,
    EndDate DATETIME2 NOT NULL,
    Status BIT NOT NULL DEFAULT 1
);

-- Category table
CREATE TABLE CATEGORY (
    CategoryID INT PRIMARY KEY IDENTITY(1,1),
    [Name] NVARCHAR(100) UNIQUE NOT NULL,
    Status BIT NOT NULL DEFAULT 1
);

-- Product Category table
CREATE TABLE PRODUCTCATEGORY (
    ProductID INT NOT NULL FOREIGN KEY REFERENCES PRODUCT(proID),
    CategoryID INT NOT NULL FOREIGN KEY REFERENCES CATEGORY(CategoryID),
    PRIMARY KEY (ProductID, CategoryID),
    Status BIT NOT NULL DEFAULT 1
);

-- Insert dummy data into REGISTERUSER table
INSERT INTO REGISTERUSER (Email, [Password], [Role], LastName, FirstName, [Status], [Address], PhoneNumber, Points) VALUES
('john.doe@example.com', 'password123', 'Manager', 'Doe', 'John', 1, '12st-Oregon', '0125468941', 0),
('admin.user@example.com', 'adminpassword', 'Admin', 'Dang', 'Michael', 1, '143 south avenue, Florida', '036854124', 0),
('mike.manager@example.com', 'managerpass', 'Customer', 'Lee', 'Cindy', 1, '1542st', '0324556874', 1000),
('jane.doe@example.com', 'securepassword123', 'Sale Staff', 'Doe', 'Jane', 1, '14st-Oregon', '0125874963', 10),
('mike.smith@example.com', 'Mikepass123', 'Delivery Staff', 'Smith', 'Mike', 1, '18st-Oregon', '0123654123', 50),
('linda.jones@example.com', 'Lindapassword1', 'Customer', 'Jones', 'Linda', 0, '22nd-Oregon', '0123541289', 20);

-- Insert dummy data into ARTICLE table
INSERT INTO ARTICLE (Title, Content, Creator, [Date], [Image], Tag, Status) 
VALUES 
('The Brilliance of Diamonds', 'An article exploring the brilliance and beauty of diamonds...', 1, '2024-05-14 15:30:00', 'imageLink', 'Diamonds', 1),
('The History of Diamond Mining', 'An in-depth look at the history and impacts of diamond mining...', 2, '2024-05-15 12:00:00', 'imageLink', 'Diamond Mining', 1),
('Famous Diamonds and Their Stories', 'Exploring the stories behind the world''s most famous diamonds...', 3, '2024-05-16 10:15:00', 'imageLink', 'Famous Diamonds', 1),
('The Process of Diamond Cutting', 'Diving into the delicate and precise world of diamond cutting...', 1, '2024-05-18 14:45:00', 'imageLink', 'Diamond Cutting', 1);

-- Insert dummy data into CATEGORY table
INSERT INTO CATEGORY ([Name], Status) VALUES 
('Engagement Rings', 1),
('Wedding Bands', 1),
('Earrings', 1),
('Necklaces', 1),
('Bracelets', 1),
('Pendants', 1),
('Watches', 1),
('Brooches', 1),
('Charms', 1),
('Cufflinks', 1);

-- Insert dummy data into PROMOTION table
INSERT INTO PROMOTION (Amount, [Name], ValidFrom, ValidTo, [Description], Code, Status) VALUES 
(0.10,'Valentine', '2024-05-01 00:00:00', '2024-06-01 00:00:00', 'Spring Fling Sale', 'SPRING10', 1),
(0.15, 'Christmas', '2024-07-01 00:00:00', '2024-07-31 23:59:59', 'July Joy Discount', 'JULY15', 1),
(0.20, 'NewYear', '2024-08-10 00:00:00', '2024-09-05 23:59:59', 'Back to School Bash', 'SCHOOL20', 1),
(0.25, 'Celebrate','2024-11-25 00:00:00', '2024-11-30 23:59:59', 'Black Friday Bonanza', 'BFRIDAY25', 1),
(0.30,'Prize', '2024-12-10 00:00:00', '2024-12-25 23:59:59', 'Holiday Season Saver', 'HOLIDAY30', 1);

-- Insert dummy data into DIAMOND table
INSERT INTO DIAMOND ([Name], Color, Clarity, Carat, Cut, [CertificateScan], [Cost], [AmountAvailable], [Status]) VALUES 
('Brilliant Star', 'White', 'VVS1', 0.5, 'Round', 'CERTIFICATEPHOTO', 1000, 15, 1),
('Luminary Glow', 'Yellow', 'VS2', 0.75, 'Princess', 'CERTIFICATEPHOTO', 1500, 20, 1),
('Romantic Heart', 'Pink', 'SI1', 0.6, 'Heart', 'CERTIFICATEPHOTO', 2000, 0, 1),
('Oceanic View', 'Blue', 'IF', 1.0, 'Emerald', 'CERTIFICATEPHOTO', 2500, 20, 1),
('Mysterious Night', 'Black', 'VVS2', 1.5, 'Cushion', 'CERTIFICATEPHOTO', 3000, 8, 1);

-- Insert dummy data into PRODUCT table
INSERT INTO PRODUCT (proCode, [Name], Price, [Description], MainDiamondID, [ChargeUp], [LaborPrice], [ImageLinkList], [SubDiamondAmount], [Status]) VALUES
('P001', 'Eternal Love Ring', 2000.00, 'The perfect ring to symbolize endless love.', 1, 10, 325.50, 'PHOTOLINK', 6, 1),
('P002', 'Glamorous Gold Necklace', 1500.50, 'A simple but elegant piece.', 2, 15, 125.50, 'PHOTOLINK', 12, 1),
('P003', 'Dazzling Diamond Earrings', 2500.00, 'Adds a fine touch to your outfit.', 3, 12, 205.00, 'PHOTOLINK', 3, 1),
('P004', 'Sparkling Silver Bracelet', 1800.75, 'For showing off your classy style.', 4, 5.6, 225.50, 'PHOTOLINK', 0, 1),
('P005', 'Romantic Heart Pendant', 3000.25, 'A great gift for a loved one.', 5, 10.7, 260.50, 'PHOTOLINK', 2, 1);

-- Insert dummy data into SHELL table
INSERT INTO SHELL ([Name], [Status]) VALUES 
('Ocean Whisper', 1),
('Sea Serenity', 1),
('Tides Treasure', 1),
('Coral Charm', 1),
('Waves Embrace', 1);

-- Insert dummy data into SHELLINVENTORY table
INSERT INTO SHELLINVENTORY (ShellID, [Size], [Price], [AmountAvailable], [Status]) VALUES
(1, 1, 500, 120, 1),
(3, 0.6, 450, 115, 1),
(4, 0.9, 400, 50, 1),
(2, 0.8, 350, 123, 1),
(5, 0.8, 300, 23, 1);

-- Insert dummy data into PURCHASEORDER table
INSERT INTO PURCHASEORDER (UserID, [Date], [PaymentMethod], [ShippingAddress], [TotalPrice], [OrderStatus], PromotionID, [PayWithPoint]) VALUES -- Column renamed to OrderStatus
(3, '2024-05-11 00:00:00', 'Bank Transfer', '1542st', 958.50, 'Shipping', 1, 1),
(6, '2024-06-14 00:00:00', 'Credit Card', '18st-Oregon', 1200.90, 'In progress', 3, 1),
(6, '2024-07-21 00:00:00', 'Cash', '14st-Oregon', 850.75, 'Delivered', 2, 1),
(3, '2024-08-10 00:00:00', 'Bank Transfer', '12st-Oregon', 3200.00, 'Cancelled', 3, 0),
(6, '2024-09-15 00:00:00', 'Cash', '22nd-Oregon', 1055.50, 'Pending', 1, 0);

-- Insert dummy data into PRODUCTCATEGORY table
INSERT INTO PRODUCTCATEGORY (ProductID, CategoryID, [Status]) VALUES
(1, 1, 1),
(4, 3, 1),
(3, 2, 1),
(5, 4, 1),
(2, 5, 1);

-- Insert dummy data into ORDERDETAIL table
INSERT INTO ORDERDETAIL (OrderID, [LineTotal], ProductID, ShellInventoryID, SubDiamondID, [Status]) VALUES
(1, 11.5, 1, 1, 1, 1),
(2, 15.6, 2, 2, 2, 1),
(3, 21.6, 3, 3, 3, 1),
(4, 22.9, 4, 4, 4, 1),
(5, 30.2, 5, 5, 5, 1);

-- Insert dummy data into WARRANTY table
INSERT INTO WARRANTY (OrderDetailID, StartDate, EndDate, [Status]) VALUES
(1, '2024-06-15', '2025-06-15', 1),
(2, '2024-07-28', '2025-07-28', 1),
(3, '2024-08-30', '2025-08-30', 1),
(4, '2024-09-20', '2025-09-20', 1),
(5, '2024-10-10', '2025-10-10', 1);
