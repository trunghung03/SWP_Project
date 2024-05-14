-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
EXEC TBL_PRODUCT_INSERT 'PRODUCT007', 'New Diamond Ring', 3500.00, 'A new addition to our collection.', 'DIA001', 12, 400.50, 'NewPHOTOLINK', 5, 1

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE TBL_PRODUCT_INSERT 
    @ProductID NVARCHAR(36),
    @Name NVARCHAR(100),
    @Price DECIMAL(18, 2),
    @Description NVARCHAR(MAX),
    @MainDiamondID NVARCHAR(36),
    @ChargeUp DECIMAL(5, 2),
    @LaborPrice DECIMAL(18, 2),
    @ImageLinkList NVARCHAR(MAX),
    @SubDiamondAmount INT,
    @Status BIT
AS
BEGIN	
    INSERT INTO PRODUCT (ProductID, [Name], Price, [Description], [MainDiamondID], [ChargeUp], [LaborPrice],[ImageLinkList],[SubDiamondAmount],[Status])
    VALUES (@ProductID, @Name, @Price, @Description, @MainDiamondID, @ChargeUp, @LaborPrice, @ImageLinkList, @SubDiamondAmount, @Status)
END
