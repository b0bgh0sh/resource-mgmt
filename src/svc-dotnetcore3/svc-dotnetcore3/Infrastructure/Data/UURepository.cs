using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Web.API.Application.Models;
using Web.API.Application.Repository;

namespace Web.API.Infrastructure.Data
{
	public class UURepository : IUURepository
	{
		private readonly string connectionString = string.Empty;

		public UURepository(string connectionString)
		{
			this.connectionString = !string.IsNullOrWhiteSpace(connectionString) ? connectionString : throw new ArgumentNullException(nameof(connectionString));
		}


		public async Task<IEnumerable<UserUtil>> GetUserUtil(string username)
		{
			var sql = @"
                declare @table table (year int,  month int, hours int);
                insert into @table
                 select UP.year, UP.month, coalesce(UP.hours, 0) as hours
                    from UserHours UP
                    INNER JOIN
                    ProjectStatus PS
                    on PS.Id = UP.ProjectId
                 and PS.Status = 'Active'
                 where UP.UserId = (select Id from Users where Username = @Username) and
				    (UP.Year = YEAR(GETDATE()) or UP.Year = YEAR(GETDATE()) + 1);
					if ((select top 1 year from @table where year  = YEAR(GETDATE())) is null)
					BEGIN
							insert into @table
						    (year, month, hours)
					        values(YEAR(GETDATE()), 1, 0)
							insert into @table
						    (year, month, hours)
					        values(YEAR(GETDATE()), 2, 0)
							insert into @table
						    (year, month, hours)
					        values(YEAR(GETDATE()), 3, 0)
							insert into @table
						    (year, month, hours)
					        values(YEAR(GETDATE()), 4, 0)
							insert into @table
						    (year, month, hours)
					        values(YEAR(GETDATE()), 5, 0)
							insert into @table
						    (year, month, hours)
					        values(YEAR(GETDATE()), 6, 0)
							insert into @table
						    (year, month, hours)
					        values(YEAR(GETDATE()), 7, 0)
							insert into @table
						    (year, month, hours)
					        values(YEAR(GETDATE()), 8, 0)
							insert into @table
						    (year, month, hours)
					        values(YEAR(GETDATE()), 9, 0)
							insert into @table
						    (year, month, hours)
					        values(YEAR(GETDATE()), 10, 0)
							insert into @table
						    (year, month, hours)
					        values(YEAR(GETDATE()), 11, 0)
							insert into @table
						    (year, month, hours)
					        values(YEAR(GETDATE()), 12, 0);
				END
				 if ((select top 1 year from @table where year  = YEAR(GETDATE())+1) is null)
				BEGIN
							insert into @table
						    (year, month, hours)
					        values(YEAR(GETDATE())+ 1, 1, 0)
							insert into @table
						    (year, month, hours)
					        values(YEAR(GETDATE())+ 1, 2, 0)
							insert into @table
						    (year, month, hours)
					        values(YEAR(GETDATE())+ 1, 3, 0)
							insert into @table
						    (year, month, hours)
					        values(YEAR(GETDATE())+ 1, 4, 0)
							insert into @table
						    (year, month, hours)
					        values(YEAR(GETDATE())+ 1, 5, 0)
							insert into @table
						    (year, month, hours)
					        values(YEAR(GETDATE())+ 1, 6, 0)
							insert into @table
						    (year, month, hours)
					        values(YEAR(GETDATE())+ 1, 7, 0)
							insert into @table
						    (year, month, hours)
					        values(YEAR(GETDATE())+ 1, 8, 0)
							insert into @table
						    (year, month, hours)
					        values(YEAR(GETDATE())+ 1, 9, 0)
							insert into @table
						    (year, month, hours)
					        values(YEAR(GETDATE())+ 1, 10, 0)
							insert into @table
						    (year, month, hours)
					        values(YEAR(GETDATE())+ 1, 11, 0)
							insert into @table
						    (year, month, hours)
					        values(YEAR(GETDATE())+ 1, 12, 0);
				END

                Select year, ISNULL([1]/176.0, 0) as jan, ISNULL([2]/176.0, 0) as feb, ISNULL([3]/176.0, 0) as mar, ISNULL([4]/176.0, 0) as apr,
                ISNULL([5]/176.0, 0) as may, ISNULL([6]/176.0, 0) as jun, ISNULL([7]/176.0, 0) as jul, ISNULL([8]/176.0, 0) as aug, ISNULL([9]/176.0, 0) as sep,
                ISNULL([10]/176.0, 0) as oct, ISNULL([11]/176.0, 0) as nov, ISNULL([12]/176.0, 0) as dec
                FROM
                (select year, month, coalesce(hours, 0) as hours from @table) AS SourceTable
                PIVOT (
	            sum(hours)
	            for month in ([1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12])
                ) AS PivotTable order by year;
            ;";

			using var connection = new SqlConnection(connectionString);
			connection.Open();
			return await connection.QueryAsync<UserUtil>(sql, new { Username = username });
		}

		public async Task<IEnumerable<UserUtil>> GetProjectData(string project)
		{
			var sql = @"
                select DISTINCT UP.year, UP.jan, UP.feb, UP.mar, UP.apr, UP.may,
                UP.jun, UP.jul, UP.aug, UP.sep ,UP.oct, UP.nov, UP.dec
                from ProjectStatus UP
                where Id = (select Id from Projects where Title = @Project)
            ;";

			using var connection = new SqlConnection(connectionString);
			connection.Open();
			return await connection.QueryAsync<UserUtil>(sql, new { Project = project });
		}

		public async Task<IEnumerable<OrgUtil>> ForecastOrganization(string org, int year, int hours)
		{
			var sql = @"
                declare @table2 table (username nvarchar(max),  jan  float, feb float, mar float, apr float, may float,
				jun float, jul float, aug float, sep float, oct float, nov float, dec float)
				declare @uid int;
				declare  @un nvarchar(max);

				Select Username
				INTO #TEMP
				FROM Users
				Where OrganizationId = (select Id from Organizations where Name = @Org)

				WHILE EXISTS(SELECT * FROM #TEMP)
				BEGIN

				Select TOP 1 @un = Username From #TEMP
				declare @table table (username nvarchar(max), year int, month int, hours int);
				set  @uid = (select Id from Users where Username  = @un);
				insert into @table
                 select U.Username, UP.year, UP.month, coalesce(UP.hours, 0) as hours
                    from UserHours UP
                    INNER JOIN
                    ProjectStatus PS
                    on PS.Id = UP.ProjectId
                 and PS.Status = 'Active'
					INNER JOIN Users U
					on U.Id = UP.UserId
                 where UP.UserId = @uid and
				    (UP.Year = @Year);
					if ((select top 1 username from @table where year  = @Year) is null)
					BEGIN
							declare @n int;
							set @n = 1;
							WHILE (@n <= 12)
							BEGIN
							insert into @table
						    (username, year, month, hours)
							values(@un, @Year, @n, 0);
							set @n = @n+1;
							END
					        
				END
				INSERT INTO @table2
                Select username, ROUND(ISNULL([1]/cast(@Hours as float), 0), 1) as jan, ROUND(ISNULL([2]/cast(@Hours as float), 0),1)
				as feb, ROUND(ISNULL([3]/cast(@Hours as float), 0),1) as mar, ROUND(ISNULL([4]/cast(@Hours as float), 0),1) as apr,
                ROUND(ISNULL([5]/cast(@Hours as float), 0),1) as may, ROUND(ISNULL([6]/cast(@Hours as float), 0),1) as jun, 
				ROUND(ISNULL([7]/cast(@Hours as float), 0),1) as jul, ROUND(ISNULL([8]/cast(@Hours as float), 0),1) as aug, ROUND(ISNULL([9]/cast(@Hours as float), 0),1) as sep,
                ROUND(ISNULL([10]/cast(@Hours as float), 0),1) as oct, ROUND(ISNULL([11]/cast(@Hours as float), 0),1) as nov, ROUND(ISNULL([12]/cast(@Hours as float), 0),1) as dec
                FROM
                (select username, month, coalesce(hours, 0) as hours from @table) AS SourceTable
                PIVOT (
	            sum(hours)
	            for month in ([1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12])
                ) AS PivotTable;
				DELETE @table;
				DELETE #TEMP where Username  = @un
				END

				DROP table #TEMP
				SELECT * FROM @table2;
            ;";

			using var connection = new SqlConnection(connectionString);
			connection.Open();
			return await connection.QueryAsync<OrgUtil>(sql, new { Org = org, Year = year, Hours = hours });
		}

	}
}
