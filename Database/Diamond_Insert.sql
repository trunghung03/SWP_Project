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
EXEC TBL_DIAMOND_INSERT 'DIA006','Radiant Sun', 'Yellow', 'VVS1', '0.8', 'Oval', 'CERTIFICATEPHOTO', 1200, 10, 1
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE TBL_DIAMOND_INSERT
    @DiamondID NVARCHAR(36),
    @Name NVARCHAR(100),
    @Color NVARCHAR(50),
    @Clarity NVARCHAR(50),
    @Carat DECIMAL(5, 2),
    @Cut NVARCHAR(50),
    @CertificateScan NVARCHAR(MAX),
    @Cost DECIMAL(18, 2),
    @AmountAvailable INT,
    @Status BIT
AS
BEGIN
    INSERT INTO DIAMOND (DiamondID, [Name], Color, Clarity, Carat, Cut, CertificateScan, Cost, AmountAvailable, [Status]) 
    VALUES (@DiamondID, @Name, @Color, @Clarity, @Carat, @Cut, @CertificateScan, @Cost, @AmountAvailable, @Status)
END