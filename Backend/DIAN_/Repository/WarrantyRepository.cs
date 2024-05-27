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
CREATE TABLE CUSTOMER (
    CustomerID INT PRIMARY KEY IDENTITY(1,1),
    Email NVARCHAR(254) NOT NULL,
    Password NVARCHAR(128) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    FirstName NVARCHAR(50) NOT NULL,
    Address NVARCHAR(255),
    PhoneNumber NVARCHAR(20),
    Points BIGINT,
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
	EmployeeID INT NOT NULL FOREIGN KEY REFERENCES EMPLOYEE(EmployeeID),
    Status BIT NOT NULL DEFAULT 1
);

-- Purchase Order table
CREATE TABLE PURCHASEORDER (
    OrderID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL FOREIGN KEY REFERENCES CUSTOMER(CustomerID),
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
CREATE TABLE SHELLMATERIAL (
    ShellMaterialID INT PRIMARY KEY IDENTITY(1,1),
    [Name] NVARCHAR(100) NOT N