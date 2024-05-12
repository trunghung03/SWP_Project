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
    Email NVARCHAR(254) PRIMARY KEY,
    Password NVARCHAR(128) NOT NULL,
    Role NVARCHAR(20) NOT NULL CHECK (Role IN('Admin', 'Manager', 'Sales', 'Delivery', 'Customer')),
    LastName NVARCHAR(50) NOT NULL,
    FirstName NVARCHAR(50) NOT NULL,
    Status NVARCHAR(50) NOT NULL CHECK (Status IN('Active', 'Inactive')),
    Address NVARCHAR(255) NOT NULL,
    PhoneNumber NVARCHAR(20) NOT NULL,
    Points BIGINT NOT NULL
);

-- Content table
CREATE TABLE CONTENT (
    ContentID NVARCHAR(36) PRIMARY KEY,
    Title NVARCHAR(255) NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    Creator NVARCHAR(254) NOT NULL FOREIGN KEY REFERENCES REGISTERUSER(Email),
    Date DATETIME2 NOT NULL,
    Image NVARCHAR(255),
    Tag NVARCHAR(50) NOT NULL CHECK (Tag IN('Blog', 'FAQ', 'Introduction'))
);

-- Promotion table
CREATE TABLE PROMOTION (
    PromotionID NVARCHAR(36) PRIMARY KEY,
    Amount DECIMAL(5, 2) NOT NULL CHECK (Amount >= 0 AND Amount <= 100), -- Constrain the percentage to be between 0 and 100
    ValidFrom DATETIME2 NOT NULL,
    ValidTo DATETIME2 NOT NULL,
    Description NVARCHAR(MAX),
    Code NVARCHAR(50) NOT NULL
);

-- Purchase Order table
CREATE TABLE PURCHASEORDER (
    OrderID NVARCHAR(36) PRIMARY KEY,
    Email NVARCHAR(254) NOT NULL FOREIGN KEY REFERENCES REGISTERUSER(Email),
    Date DATETIME2 NOT NULL,
    PaymentMethod NVARCHAR(50) NOT NULL CHECK (PaymentMethod IN ('Cash', 'Bank')),
    ShippingAddress NVARCHAR(255) NOT NULL,
    TotalPrice DECIMAL(18, 2) NOT NULL,
    Status NVARCHAR(50) NOT NULL CHECK (Status IN ('Preparing', 'Completed', 'Cancelled')),
    PromotionID NVARCHAR(36) NULL FOREIGN KEY REFERENCES PROMOTION(PromotionID),
    PayWithPoint BIT NOT NULL
);

-- Revised Shell table with ShellID as the primary key
CREATE TABLE SHELL (
    ShellID NVARCHAR(36) NOT NULL,
    Name NVARCHAR(100) NOT NULL,
    PRIMARY KEY (ShellID)
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
    Name NVARCHAR(100) NOT NULL,
    Color NVARCHAR(50) NOT NULL,
    Clarity NVARCHAR(50) NOT NULL,
    Carat DECIMAL(5, 2) NOT NULL,
    Cut NVARCHAR(50) NOT NULL,
    CertificateScan NVARCHAR(MAX) NOT NULL,
    Cost DECIMAL(18, 2) NOT NULL,
    AmountAvailable INT NOT NULL
);


-- Product table
CREATE TABLE PRODUCT (
    ProductID NVARCHAR(36) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Price DECIMAL(18, 2) NOT NULL,
    Description NVARCHAR(MAX) NOT NULL,
    MainDiamondID NVARCHAR(36) NOT NULL FOREIGN KEY REFERENCES DIAMOND(DiamondID),
    ChargeUp DECIMAL(5, 2) NOT NULL CHECK (ChargeUp >= 0 AND ChargeUp <= 100), -- Constrain the percentage to be between 0 and 100
    LaborPrice DECIMAL(18, 2) NOT NULL,
    ImageLinkList NVARCHAR(MAX) NOT NULL
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
    Status NVARCHAR(50) NOT NULL CHECK (Status IN('Valid', 'Expired'))
);

-- Category table
CREATE TABLE CATEGORY (
    CategoryID NVARCHAR(36) PRIMARY KEY,
    Name NVARCHAR(100) UNIQUE NOT NULL
);

-- Product Category table
CREATE TABLE PRODUCTCATEGORY (
    ProductID NVARCHAR(36) NOT NULL FOREIGN KEY REFERENCES PRODUCT(ProductID),
    CategoryID NVARCHAR(36) NOT NULL FOREIGN KEY REFERENCES CATEGORY(CategoryID),
    PRIMARY KEY (ProductID, CategoryID)
);
