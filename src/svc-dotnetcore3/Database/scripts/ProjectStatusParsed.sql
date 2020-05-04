/****** Script for SelectTopNRows command from SSMS  ******/
/* SELECT TOP (1000) [Id]
      ,[FromDate]
      ,[ToDate]
      ,[Status]
      ,[Hours]
  FROM [dbo].[ProjectStatus]
  --WHERE JSON_VALUE(Hours, '$.year') = 2020
  WHERE JSON_VALUE(Hours, '$.hours.Jan') = 300; */
 declare @avail table (ProjectId INT, FromDate DateTime,
					ToDate DateTime, Status NVARCHAR(10), year INT, jan INT, feb INT, mar INT, apr INT,
					may INT, jun INT, jul INT, aug INT, sep INT, oct INT, nov INT, dec INT);
  DECLARE @i int; 
  Set @i = 1;
  WHILE @i < 101
  BEGIN
  INSERT INTO @avail
  Select P.Id, P.FromDate, P.ToDate, P.Status, J.* from OPENJSON((select [Hours] from ProjectStatus where Id = @i))
	WITH (
	  year INT 'strict $.year',
		jan INT '$.hours.Jan',
		feb INT '$.hours.Feb',
		mar INT '$.hours.Mar',
		apr INT '$.hours.Apr',
		may INT '$.hours.May',
		jun INT '$.hours.Jun',
		jul INT '$.hours.Jul',
		aug INT '$.hours.Aug',
		sep INT '$.hours.Sep',
		oct INT '$.hours.Oct',
		nov INT '$.hours.Nov',
		dec INT '$.hours.Dec'
  )J
  JOIN ProjectStatus P on P.Id = @i;
  set @i = @i + 1;
  END;
  select * from @avail;