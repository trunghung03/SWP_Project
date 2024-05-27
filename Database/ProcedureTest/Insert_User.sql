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
EXEC TBL_REGISTERUSER_INSERT 'U007', 'new.user@example.com', 'password5678', 'Customer', 'New', 'User', 1, '56 Sunset Blvd', '0315551011', 1000

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE TBL_REGISTERUSER_INSERT 
    @UserID NVARCHAR(254),
    @Email NVARCHAR(254),
    @Password NVARCHAR(128),
    @Role NVARCHAR(20),
    @LastName NVARCHAR(50),
    @FirstName NVARCHAR(50),
    @Status BIT,
    @Address NVARCHAR(255),
    @PhoneNumber NVARCHAR(20),
    @Points BIGINT
AS
BEGIN
    INSERT INTO REGISTERUSER (UserID, Email, Password, Role, LastName, FirstName, Status, Address, PhoneNumber, Points)
    VALUES (@UserID, @Email, @Password, @Role, @LastName, @FirstName, @Status, @Address, @PhoneNumber, @Points)
END
