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

CREATE TABLE CUSTOMER (
    CustomerID INT PRIMARY KEY IDENTITY(1,1),
    Email NVARCHAR(254) NOT NULL,
    Password NVARCHAR(128) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    FirstName NVARCHAR(50) NOT NULL,
    Address NVARCHAR(255),
    PhoneNumber NVARCHAR(20),
    Points BIGINT,
    AccountType NVARCHAR(128),
    Status BIT NOT NULL DEFAULT 1
);

CREATE TABLE EMPLOYEE (
	EmployeeID INT PRIMARY KEY IDENTITY(1,1),
	Role NVARCHAR(20) NOT NULL,
	Email NVARCHAR(254) NOT NULL,
    Password NVARCHAR(128) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    FirstName NVARCHAR(50) NOT NULL,
	Address NVARCHAR(255),
    PhoneNumber NVARCHAR(20),
    Status BIT NOT NULL DEFAULT 1
);

-- Content table
CREATE TABLE ARTICLE (
    ContentID INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(255) NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    Employee INT NOT NULL FOREIGN KEY REFERENCES EMPLOYEE(EmployeeID),
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
    UserID INT NOT NULL FOREIGN KEY REFERENCES CUSTOMER(CustomerID),
    [Date] DATETIME2 NOT NULL,
    PaymentMethod NVARCHAR(50) NOT NULL,
    Name NVARCHAR(50) NOT NULL,
    PhoneNumber NVARCHAR(20) NOT NULL,
    ShippingAddress NVARCHAR(255) NOT NULL,
    TotalPrice DECIMAL(18, 2) NOT NULL,
    [OrderStatus] NVARCHAR(50) NOT NULL DEFAULT 'Unpaid', -- Renamed to OrderStatus
    PromotionID INT NULL FOREIGN KEY REFERENCES PROMOTION(PromotionID),
    PayWithPoint BIT,
    Note NVARCHAR(MAX),
	SaleStaff INT FOREIGN KEY REFERENCES EMPLOYEE(EmployeeID),
	DeliveryStaff INT FOREIGN KEY REFERENCES EMPLOYEE(EmployeeID)
);

-- Revised Shell table with ShellID as the primary key
CREATE TABLE SHELLMATERIAL (
    ShellMaterialID INT PRIMARY KEY IDENTITY(1,1),
    [Name] NVARCHAR(100) NOT NULL,
    Price DECIMAL(18, 2) NOT NULL,
    Status BIT NOT NULL DEFAULT 1,
);

CREATE TABLE DIAMONDATTRIBUTE(
	DiamondAtrributeID INT PRIMARY KEY IDENTITY(1,1),
	Shape NVARCHAR (50) NOT NULL,
	Color NVARCHAR(50) NOT NULL,
    Clarity NVARCHAR(50) NOT NULL,
    Carat DECIMAL(5, 2) NOT NULL,
    Cut NVARCHAR(50) NOT NULL,
);
CREATE TABLE COLLECTION (
	CollectionID INT PRIMARY KEY IDENTITY(1,1),	
	Name NVARCHAR(128) NOT NULL,
    Status BIT NOT NULL DEFAULT 1,
	Description  NVARCHAR(MAX) NOT NULL,
    CollectionImage NVARCHAR(MAX),
);

-- Category table
CREATE TABLE CATEGORY (
    CategoryID INT PRIMARY KEY IDENTITY(1,1),
    [Name] NVARCHAR(100) UNIQUE NOT NULL,
    Status BIT NOT NULL DEFAULT 1
);

-- Product table
CREATE TABLE PRODUCT (
    productID INT PRIMARY KEY IDENTITY(1,1),
    productCode NVARCHAR(36) UNIQUE NOT NULL,
    [Name] NVARCHAR(100) NOT NULL,
    Price DECIMAL(18, 2) NOT NULL,
    [Description] NVARCHAR(MAX) ,
	MainDiamondAtrributeID INT FOREIGN KEY REFERENCES DIAMONDATTRIBUTE(DiamondAtrributeID),
	SubDiamondAtrributeID INT FOREIGN KEY REFERENCES DIAMONDATTRIBUTE(DiamondAtrributeID),
    LaborCost DECIMAL(18, 2),
    ImageLinkList NVARCHAR(MAX),
	MainDiamondAmount INT,
    SubDiamondAmount INT,
    Status BIT NOT NULL DEFAULT 1,
	CollectionID INT FOREIGN KEY REFERENCES COLLECTION(CollectionID),
	CategoryID INT FOREIGN KEY REFERENCES CATEGORY(CategoryID),
);

CREATE TABLE SHELL (
	ShellID INT PRIMARY KEY IDENTITY(1,1),
    ProductID INT FOREIGN KEY REFERENCES PRODUCT(productID),
	ShellMaterialID INT FOREIGN KEY REFERENCES SHELLMATERIAL(ShellMaterialID),
    Weight DECIMAL(18, 2),
	Size DECIMAL(5,2),
    AmountAvailable INT NOT NULL,
    Status BIT NOT NULL DEFAULT 1
)
-- Order Detail table
CREATE TABLE ORDERDETAIL (
    OrderDetailID INT PRIMARY KEY IDENTITY(1,1),
    OrderID INT NOT NULL FOREIGN KEY REFERENCES PURCHASEORDER(OrderID),
    LineTotal DECIMAL(18, 2) NOT NULL,
    ProductID INT NOT NULL FOREIGN KEY REFERENCES PRODUCT(productID),
	ShellId INT FOREIGN KEY REFERENCES SHELL(ShellId),
    Status BIT NOT NULL DEFAULT 1
);
-- Diamond table
CREATE TABLE DIAMOND (
    DiamondID INT PRIMARY KEY IDENTITY(1,1),
	MainDiamondAtrributeID INT FOREIGN KEY REFERENCES DIAMONDATTRIBUTE(DiamondAtrributeID),
	CertificateScan NVARCHAR(MAX),
    OrderDetailID INT FOREIGN KEY REFERENCES ORDERDETAIL(OrderDetailID),
    Price DECIMAL(18, 2) NOT NULL,
    Status BIT NOT NULL DEFAULT 1
);

-- Diamond table
CREATE TABLE SUBDIAMOND (
    DiamondID INT PRIMARY KEY IDENTITY(1,1),
	DiamondAtrributeID INT FOREIGN KEY REFERENCES DIAMONDATTRIBUTE(DiamondAtrributeID),
	AmountAvailable INT NOT NULL,	
    Price DECIMAL(18, 2) NOT NULL,
    Status BIT NOT NULL DEFAULT 1
);

-- Warranty table
CREATE TABLE WARRANTY (
    OrderDetailID INT PRIMARY KEY FOREIGN KEY REFERENCES ORDERDETAIL(OrderDetailID),
    StartDate DATETIME2 NOT NULL,
    EndDate DATETIME2 NOT NULL,
    Status NVARCHAR(128) NOT NULL DEFAULT 'Active',
);

CREATE TABLE COMPANY (
	CompanyID NVARCHAR(254) PRIMARY KEY,
	CompanyName NVARCHAR(128) NOT NULL,
	Email NVARCHAR(254) NOT NULL,
    Address NVARCHAR(255) NOT NULL,
    PhoneNumber NVARCHAR(20) NOT NULL,
	MarkupPrice DECIMAL(5, 2) CHECK (MarkupPrice >= 0 AND MarkupPrice <= 100)
);

CREATE TABLE NOTIFICATION (
    NotificationID INT PRIMARY KEY IDENTITY(1,1),
    RecipientRole NVARCHAR(20) NOT NULL CHECK (RecipientRole IN ('Customer', 'DeliveryStaff')), -- Can only be 'Customer' or 'Employee'
    RecipientID INT NOT NULL,
    Message NVARCHAR(MAX) NOT NULL,
    IsDelivered BIT NOT NULL,
    CreatedAt DATETIME NOT NULL,
    MarkRead BIT NOT NULL DEFAULT 0, -- 0 for unread, 1 for read
);
