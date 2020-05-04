			declare @pid int;
			declare @uid int;
			declare @fd datetime;
			declare @td datetime;
			declare @fm int;
			declare @fy int;
			declare @tm int;
			declare @ty int;
			declare @tempm int;
			declare @tempy int;

			Select DISTINCT Id, FromDate, ToDate, PM
			Into   #Temp
			From   ProjectStatus


			WHILE EXISTS(SELECT * FROM #Temp)
			Begin

			Select Top 1 @pid = Id, @uid = PM, @fd = FromDate, @td = ToDate From #Temp

			set @fy = YEAR(@fd);
			set @fm = MONTH(@fd);
			set @ty = YEAR(@td);
			set @tm = MONTH(@td);
			set @tempy = @fy;
			set @tempm = @fm;
			
			WHILE @tempm <= @tm and @tempy <= @ty
			BEGIN
			INSERT INTO UserHours
			(UserId, ProjectId, Year, Month, Hours)
			values (@uid, @pid, @tempy, @tempm, 0);
			if @tempm = 12
			BEGIN
				set @tempm = 1;
				set @tempy = @tempy+1;
			END
			else
				set @tempm = @tempm + 1;
			END;
            
            update Projects
            set UpdatedAt = SYSUTCDATETIME()
            where Id = @pid

			Delete #Temp Where Id = @pid

			End

			drop table #Temp;