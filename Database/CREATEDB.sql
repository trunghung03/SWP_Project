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
	UserID NVARCHAR(254) PRIMARY KEY,
    Email NVARCHAR(254) NOT NULL,
    Password NVARCHAR(128) NOT NULL,
    Role NVARCHAR(20) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    FirstName NVARCHAR(50) NOT NULL,
    Status BIT NOT NULL,
    Address NVARCHAR(255),
    PhoneNumber NVARCHAR(20) NOT NULL,
    Points BIGINT NOT NULL
);

-- Content table
CREATE TABLE ARTICLE (
    ContentID NVARCHAR(36) PRIMARY KEY,
    Title NVARCHAR(255) NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    Creator NVARCHAR(254) NOT NULL FOREIGN KEY REFERENCES REGISTERUSER(UserID),
    [Date] DATETIME2 NOT NULL,
    [Image] NVARCHAR(255),
    Tag NVARCHAR(50) NOT NULL
);

-- Promotion table
CREATE TABLE PROMOTION (
    PromotionID NVARCHAR(36) PRIMARY KEY,
    Amount DECIMAL(5, 2) NOT NULL CHECK (Amount >= 0 AND Amount <= 100), -- Constrain the percentage to be between 0 and 100
    ValidFrom DATETIME2 NOT NULL,
    ValidTo DATETIME2 NOT NULL,
    [Description] NVARCHAR(MAX),
    Code NVARCHAR(50) NOT NULL,
	[Status] BIT NOT NULL,
);

-- Purchase Order table
CREATE TABLE PURCHASEORDER (
    OrderID NVARCHAR(36) PRIMARY KEY,
    UserID NVARCHAR(254) NOT NULL FOREIGN KEY REFERENCES REGISTERUSER(UserID),
    [Date] DATETIME2 NOT NULL,
    PaymentMethod NVARCHAR(50) NOT NULL,
    ShippingAddress NVARCHAR(255) NOT NULL,
    TotalPrice DECIMAL(18, 2) NOT NULL,
    [Status] NVARCHAR(50) NOT NULL,
    PromotionID NVARCHAR(36) NULL FOREIGN KEY REFERENCES PROMOTION(PromotionID),
    PayWithPoint BIT NOT NULL
);

-- Revised Shell table with ShellID as the primary key
CREATE TABLE SHELL (
    ShellID NVARCHAR(36) NOT NULL PRIMARY KEY,
    [Name] NVARCHAR(100) NOT NULL,
	[Status] BIT NOT NULL,
);

-- New Shell Size table to track sizes and their availability
CREATE TABLE SHELLINVENTORY (
    ShellInventoryID NVARCHAR(36) PRIMARY KEY,
    ShellID NVARCHAR(36) NOT NULL FOREIGN KEY REFERENCES SHELL(ShellID),
    Size TINYINT NOT NULL,
    Price DECIMAL(18, 2) NOT NULL,
    AmountAvailable INT NOT NULL
);


-- Diamond table
CREATE TABLE DIAMOND (
    DiamondID NVARCHAR(36) PRIMARY KEY,
    [Name] NVARCHAR(100) NOT NULL,
    Color NVARCHAR(50) NOT NULL,
    Clarity NVARCHAR(50) NOT NULL,
    Carat DECIMAL(5, 2) NOT NULL,
    Cut NVARCHAR(50) NOT NULL,
    CertificateScan NVARCHAR(MAX) NOT NULL,
    Cost DECIMAL(18, 2) NOT NULL,
    AmountAvailable INT NOT NULL,
	[Status] BIT NOT NULL
);


-- Product table
CREATE TABLE PRODUCT (
    ProductID NVARCHAR(36) PRIMARY KEY,
    [Name] NVARCHAR(100) NOT NULL,
    Price DECIMAL(18, 2) NOT NULL,
    [Description] NVARCHAR(MAX) NOT NULL,
    MainDiamondID NVARCHAR(36) NOT NULL FOREIGN KEY REFERENCES DIAMOND(DiamondID),
    ChargeUp DECIMAL(5, 2) NOT NULL CHECK (ChargeUp >= 0 AND ChargeUp <= 100), -- Constrain the percentage to be between 0 and 100
    LaborPrice DECIMAL(18, 2) NOT NULL,
    ImageLinkList NVARCHAR(MAX) NOT NULL,
	SubDiamondAmount INT NOT NULL,
	[Status] BIT NOT NULL,
);

-- Order Line table
CREATE TABLE ORDERLINE (
    OrderLineID NVARCHAR(36) PRIMARY KEY,
    OrderID NVARCHAR(36) NOT NULL FOREIGN KEY REFERENCES PURCHASEORDER(OrderID),
    LineTotal DECIMAL(18, 2) NOT NULL,
    ProductID NVARCHAR(36) NOT NULL FOREIGN KEY REFERENCES PRODUCT(ProductID),
    ShellInventoryID NVARCHAR(36) NOT NULL FOREIGN KEY REFERENCES SHELLINVENTORY(ShellInventoryID),
    SubDiamondID NVARCHAR(36) NOT NULL FOREIGN KEY REFERENCES DIAMOND(DiamondID)
);


-- Warranty table
CREATE TABLE WARRANTY (
    OrderLineID NVARCHAR(36) PRIMARY KEY FOREIGN KEY REFERENCES ORDERLINE(OrderLineID),
    StartDate DATETIME2 NOT NULL,
    EndDate DATETIME2 NOT NULL,
    [Status] BIT NOT NULL
);

-- Category table
CREATE TABLE CATEGORY (
    CategoryID NVARCHAR(36) PRIMARY KEY,
    [Name] NVARCHAR(100) UNIQUE NOT NULL,
	[Status] BIT NOT NULL
);

-- Product Category table
CREATE TABLE PRODUCTCATEGORY (
    ProductID NVARCHAR(36) NOT NULL FOREIGN KEY REFERENCES PRODUCT(ProductID),
    CategoryID NVARCHAR(36) NOT NULL FOREIGN KEY REFERENCES CATEGORY(CategoryID),
    PRIMARY KEY (ProductID, CategoryID)
);


use DIAN

--INSERT INTO REGISTERUSER TABLE

INSERT INTO REGISTERUSER	 ([UserID], Email, [Password], [Role],LastName,FirstName,[Status],[Address],PhoneNumber,Points) VALUES
('U001','john.doe@example.com', 'password123','Manager', 'Doe','John',1,'12st-Oregon','0125468941',0),
('U002','admin.user@example.com', 'adminpassword','Admin','Dang','Michael',1,'143 south avenue,Florida','036854124',0),
('U003','mike.manager@example.com', 'managerpass','Customer','Lee','Cindy',1,'1542st','0324556874',1000),
('U004', 'jane.doe@example.com', 'securepassword123', 'Sale Staff', 'Doe', 'Jane', 1, '14st-Oregon', '0125874963', 10),
('U005', 'mike.smith@example.com', 'Mikepass123', 'Delivery Staff', 'Smith', 'Mike', 1, '18st-Oregon', '0123654123', 50),
('U006', 'linda.jones@example.com', 'Lindapassword1', 'Customer', 'Jones', 'Linda', 0, '22nd-Oregon', '0123541289', 20);

--INSERT INTO ARTICLE TABLE
INSERT INTO ARTICLE (ContentID, Title, Content, Creator, Date, Image, Tag) 
VALUES 
('CT001', 'The Brilliance of Diamonds', 'An article exploring the brilliance and beauty of diamonds...', 'U001', '2024-05-14 15:30:00', 'imageLink', 'Diamonds'),
('CT002', 'The History of Diamond Mining', 'An in-depth look at the history and impacts of diamond mining...', 'U002', '2024-05-15 12:00:00', 'imageLink', 'Diamond Mining'),
('CT003', 'Famous Diamonds and Their Stories', 'Exploring the stories behind the world''s most famous diamonds...', 'U003', '2024-05-16 10:15:00', 'imageLink', 'Famous Diamonds'),
('CT004', 'The Process of Diamond Cutting', 'Diving into the delicate and precise world of diamond cutting...', 'U001', '2024-05-18 14:45:00', 'imageLink', 'Diamond Cutting');

--INSERT INTO CATEGORY TABLE

INSERT INTO CATEGORY (CategoryID, name,[Status]) VALUES ('C1', 'Engagement Rings',1);
INSERT INTO CATEGORY (CategoryID, name,[Status]) VALUES ('C2', 'Wedding Bands',1);
INSERT INTO CATEGORY (CategoryID, name,[Status]) VALUES ('C3', 'Earrings',1);
INSERT INTO CATEGORY (CategoryID, name,[Status]) VALUES ('C4', 'Necklaces',1);
INSERT INTO CATEGORY (CategoryID, name,[Status]) VALUES ('C5', 'Bracelets',1);
INSERT INTO CATEGORY (CategoryID, name,[Status]) VALUES ('C6', 'Pendants',1);
INSERT INTO CATEGORY (CategoryID, name,[Status]) VALUES ('C7', 'Watches',1);
INSERT INTO CATEGORY (CategoryID, name,[Status]) VALUES ('C8', 'Brooches',1);
INSERT INTO CATEGORY (CategoryID, name,[Status]) VALUES ('C9', 'Charms',1);
INSERT INTO CATEGORY (CategoryID, name,[Status]) VALUES ('C10', 'Cufflinks',1);

--INSERT PROMOTION TABLE

INSERT INTO PROMOTION (PromotionID, Amount, ValidFrom, ValidTo, [Description], Code,[Status]) VALUES 
('P1', 0.10, '2024-05-01 00:00:00', '2024-06-01 00:00:00', 'Spring Fling Sale', 'SPRING10',1),
('P2', 0.15, '2024-07-01 00:00:00', '2024-07-31 23:59:59', 'July Joy Discount', 'JULY15',1),
('P3', 0.20, '2024-08-10 00:00:00', '2024-09-05 23:59:59', 'Back to School Bash', 'SCHOOL20',1),
('P4', 0.25, '2024-11-25 00:00:00', '2024-11-30 23:59:59', 'Black Friday Bonanza', 'BFRIDAY25',1),
('P5', 0.30, '2024-12-10 00:00:00', '2024-12-25 23:59:59', 'Holiday Season Saver', 'HOLIDAY30',1);

--INSERT DIAMOND TABLE

INSERT INTO DIAMOND (DiamondID,[Name], Color, Clarity, Carat, Cut,[CertificateScan], [Cost], [AmountAvailable],[Status]) VALUES 
('DIA001','Brilliant Star', 'White', 'VVS1', '0.5', 'Round','CERTIFICATEPHOTO', 1000, 15,1),
('DIA002','Luminary Glow', 'Yellow', 'VS2', '0.75', 'Princess','CERTIFICATEPHOTO' ,1500, 20,1),
('DIA003', 'Romantic Heart','Pink', 'SI1', '0.6', 'Heart', 'CERTIFICATEPHOTO',2000, 0,0),
('DIA004','Oceanic View' ,'Blue', 'IF', '1.0', 'Emerald', 'CERTIFICATEPHOTO',2500, 20,1),
('DIA005','Mysterious Night' ,'Black', 'VVS2', '1.5', 'Cushion','CERTIFICATEPHOTO', 3000,8,1);


--INSERT PRODUCT TABLE (SUB -DIAMOND )

INSERT INTO PRODUCT (ProductID, [Name], Price, [Description], [MainDiamondID], [ChargeUp], [LaborPrice],[ImageLinkList],[SubDiamondAmount],[Status]) VALUES
('PRODUCT001', 'Eternal Love Ring', 2000.00, 'The perfect ring to symbolize endless love.', 'DIA001',10,325.50,'PHOTOLINK',6,1),
('PRODUCT002', 'Glamorous Gold Necklace', 1500.50, 'A simple but elegant piece.', 'DIA002',15,125.50,'PHOTOLINK',12,0),
('PRODUCT003', 'Dazzling Diamond Earrings', 2500.00, 'Adds a fine touch to your outfit.', 'DIA003',12,205.00,'PHOTOLINK',3,1),
('PRODUCT004', 'Sparkling Silver Bracelet', 1800.75, 'For showing off your classy style.', 'DIA004',5.6,225.50,'PHOTOLINK',0,1),
('PRODUCT005', 'Romantic Heart Pendant', 3000.25, 'A great gift for a loved one.', 'DIA005',10.7,260.50,'PHOTOLINK',2,1);

--INSERT SHELL TABLE

INSERT INTO SHELL (ShellID, [Name], [STATUS]) VALUES 
('S1','Ocean Whisper',1),
('S2','Sea Serenity',1),
('S3','Tides Treasure',1),
('S4','Coral Charm',0),
('S5','Waves Embrace',0);

--INSERT INTO SHELLINVENTORY 

INSERT INTO SHELLINVENTORY ([ShellInventoryID],[ShellID],[Size],[Price],[AmountAvailable]) VALUES
('SI1','S1',1, 500,120),
('SI2','S3',0.6 ,450,115),
('SI3','S4', 0.9,400,50),
('SI4','S2', 0.8,350,123),
('SI5','S5', 0.8,300,23);






--INSERT INTO PURCHASE ORDER

INSERT INTO PURCHASEORDER ([OrderID],[UserID],[Date],[PaymentMethod],[ShippingAddress],[TotalPrice],[Status],[PromotionID],[PayWithPoint]) VALUES
('OD1','U003','2024-05-11 00:00:00','Bank Transfer','1542st',958.50,'Shipping','P1',1),
('OD2', 'U006', '2024-06-14 00:00:00', 'Credit Card', '18st-Oregon', 1200.90, 'In progress','P3', 1),
('OD3', 'U006', '2024-07-21 00:00:00', 'Cash', '14st-Oregon', 850.75, 'Delivered','P2', 1),
('OD4', 'U003', '2024-08-10 00:00:00', 'Bank Transfer', '12st-Oregon', 3200.00, 'Cancelled', 'P3',0),
('OD5', 'U006', '2024-09-15 00:00:00', 'Cash', '22nd-Oregon', 1055.50, 'Pending', 'P1',0);

--INSERT INTO PRODUCTCATEGORY

INSERT INTO PRODUCTCATEGORY([ProductID],[CategoryID]) VALUES
('PRODUCT001','C1'),
('PRODUCT004','C3'),
('PRODUCT003','C2'),
('PRODUCT005','C4'),
('PRODUCT002','C5')

--INSERT ORDERLINE (VAN DE O CHO SUBDIAMOND)
INSERT INTO ORDERLINE ([OrderLineID], OrderID,[LineTotal], ProductID, [ShellInventoryID], [SubDiamondID]) VALUES
('ODL1', 'OD1',11.5 ,'PRODUCT001', 'SI1', 'DIA001'),
('ODL2', 'OD2', 15.6,'PRODUCT002', 'SI2', 'DIA002'),
('ODL3', 'OD3',21.6, 'PRODUCT003', 'SI3',  'DIA003'),
('ODL4', 'OD4', 22.9,'PRODUCT004', 'SI4', 'DIA004'),
('ODL5', 'OD5',30.2, 'PRODUCT005', 'SI5', 'DIA005');

-- INSERT INTO WARRANTY TABLE

INSERT INTO WARRANTY ([OrderLineID], StartDate, EndDate, [Status]) VALUES
('ODL1', '2024-06-15', '2025-06-15', 1),
('ODL2', '2024-07-28', '2025-07-28', 0),
('ODL3', '2024-08-30', '2025-08-30', 0),
('ODL4', '2024-09-20', '2025-09-20', 1),
('ODL5', '2024-10-10', '2025-10-10', 1);
