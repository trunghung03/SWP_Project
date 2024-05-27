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
EXEC TBL_REGISTERUSER_CHECK_LOGIN 'john.doe@example.com', 'password123'
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE TBL_REGISTERUSER_CHECK_LOGIN
    @Email NVARCHAR(254),
    @Password NVARCHAR(128)
AS
BEGIN
    SELECT * FROM REGISTERUSER
    WHERE Email = @Email AND Password = @Password
END
