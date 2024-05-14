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
EXEC TBL_WARRANTY_UPDATE 'ODL1', '2024-07-01', '2025-07-01', 0 
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE TBL_WARRANTY_UPDATE
    @OrderLineID NVARCHAR(36),
    @StartDate DATETIME2,
    @EndDate DATETIME2,
    @Status BIT
AS
BEGIN
    UPDATE WARRANTY 
    SET StartDate = @StartDate, EndDate = @EndDate, [Status] = @Status
    WHERE OrderLineID = @OrderLineID
END
