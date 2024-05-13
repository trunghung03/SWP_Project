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
EXEC TBL_PRODUCT_UPDATE 'PRODUCT001', @Price = 2200.00, @Status = 2
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE TBL_PRODUCT_UPDATE
    @ProductID NVARCHAR(36),
    @Name NVARCHAR(100) = NULL,
    @Price DECIMAL(18, 2) = NULL,
    @Description NVARCHAR(MAX) = NULL,
    @MainDiamondID NVARCHAR(36) = NULL,
    @ChargeUp DECIMAL(5, 2) = NULL,
    @LaborPrice DECIMAL(18, 2) = NULL,
    @ImageLinkList NVARCHAR(MAX) = NULL,
    @SubDiamondAmount INT = NULL,
    @Status BIT = NULL
AS
BEGIN
    UPDATE PRODUCT
    SET [Name] = ISNULL(@Name, [Name]),
        Price = ISNULL(@Price, Price),
        [Description] = ISNULL(@Description, [Description]),
        MainDiamondID = ISNULL(@MainDiamondID, MainDiamondID),
        ChargeUp = ISNULL(@ChargeUp, ChargeUp),
        LaborPrice = ISNULL(@LaborPrice, LaborPrice),
        ImageLinkList = ISNULL(@ImageLinkList, ImageLinkList),
        SubDiamondAmount = ISNULL(@SubDiamondAmount, SubDiamondAmount),
        [Status] = ISNULL(@Status, [Status])
    WHERE ProductID = @ProductID
END