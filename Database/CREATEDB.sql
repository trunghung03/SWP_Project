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
    Name NVARCHAR(50) NOT NULL,
    PhoneNumber NVARCHAR(20) NOT NULL,
    ShippingAddress NVARCHAR(255) NOT NULL,
    TotalPrice DECIMAL(18, 2) NOT NULL,
    [OrderStatus] NVARCHAR(50) NOT NULL DEFAULT 'Pending', -- Renamed to OrderStatus
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
	AmountAvailable DECIMAL(18,4) NOT NULL,
    Status BIT NOT NULL DEFAULT 1,
);

-- Diamond table
CREATE TABLE DIAMOND (
    DiamondID INT PRIMARY KEY IDENTITY(1,1),
	Shape NVARCHAR (50),
    Color NVARCHAR(50) ,
    Clarity NVARCHAR(50) ,
    Carat DECIMAL(5, 2) ,
    Cut NVARCHAR(50),
    CertificateScan NVARCHAR(MAX),
    AmountAvailable INT NOT NULL,
    Status BIT NOT NULL DEFAULT 1
);

CREATE TABLE COLLECTION (
	CollectionID INT PRIMARY KEY,	
	Name NVARCHAR(128) NOT NULL,
    Status BIT NOT NULL DEFAULT 1,
	Description  NVARCHAR(MAX) NOT NULL
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
    MainDiamondID INT FOREIGN KEY REFERENCES DIAMOND(DiamondID), -- Constrain the percentage to be between 0 and 100
    LaborCost DECIMAL(18, 2),
    ImageLinkList NVARCHAR(MAX),
	MainDiamondAmount INT,
    SubDiamondAmount INT,
	ShellAmount DECIMAL(18, 2),
    Status BIT NOT NULL DEFAULT 1,
	CollectionID INT FOREIGN KEY REFERENCES COLLECTION(CollectionID),
	CategoryID INT FOREIGN KEY REFERENCES CATEGORY(CategoryID),
);

-- Order Detail table
CREATE TABLE ORDERDETAIL (
    OrderDetailID INT PRIMARY KEY IDENTITY(1,1),
    OrderID INT NOT NULL FOREIGN KEY REFERENCES PURCHASEORDER(OrderID),
    LineTotal DECIMAL(18, 2) NOT NULL,
    ProductID INT NOT NULL FOREIGN KEY REFERENCES PRODUCT(productID),
    ShellMaterialID INT FOREIGN KEY REFERENCES SHELLMATERIAL(ShellMaterialID),
    SubDiamondID INT FOREIGN KEY REFERENCES DIAMOND(DiamondID),
	Size DECIMAL(5, 2),
    Status BIT NOT NULL DEFAULT 1
);

-- Warranty table
CREATE TABLE WARRANTY (
    OrderDetailID INT PRIMARY KEY FOREIGN KEY REFERENCES ORDERDETAIL(OrderDetailID),
    StartDate DATETIME2 NOT NULL,
    EndDate DATETIME2 NOT NULL,
    Status BIT NOT NULL DEFAULT 1
);

CREATE TABLE SIZE (
	CategoryID INT NOT NULL PRIMARY KEY FOREIGN KEY REFERENCES CATEGORY(CategoryID),
	MinSize DECIMAL(5, 2),
	MaxSize DECIMAL(5, 2),
	Step DECIMAL(5, 2)
);

CREATE TABLE COMPANY (
	CompanyID NVARCHAR(254) PRIMARY KEY,
	CompanyName NVARCHAR(128) NOT NULL,
	Email NVARCHAR(254) NOT NULL,
    Address NVARCHAR(255) NOT NULL,
    PhoneNumber NVARCHAR(20) NOT NULL,
	MarkupPrice DECIMAL(5, 2) CHECK (MarkupPrice >= 0 AND MarkupPrice <= 100)
);

