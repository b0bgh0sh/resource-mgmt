using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Web.API.Application.Models;
using Web.API.Application.Repository;

namespace Web.API.Infrastructure.Data
{
	public class PURepository : IPURepository
	{
		private readonly string connectionString = string.Empty;

		public PURepository(string connectionString)
		{
			this.connectionString = !string.IsNullOrWhiteSpace(connectionString) ? connectionString : throw new ArgumentNullException(nameof(connectionString));
		}


		public async Task<IEnumerable<ProjectUtil>> GetProjectUtil(string project)
		{
			var sql = @"
                declare @table table (UserId int, Year int, month int, hours int);
				declare @pid int;
				declare @yr1 int, @yr2 int
				set @yr1= YEAR(GETDATE());
				set @yr2 = YEAR(GETDATE()) + 1;
                set @pid = (select Id from Projects where Title = @Project);
                insert into @table
                 select UP.UserId,  UP.Year, UP.month, coalesce(UP.hours, 0) as hours
                    from UserHours UP
                 where UP.ProjectId  = @pid and
				    (Year = @yr1 or Year = @yr2);
                declare @table2 table (Resource nvarchar(max), jan int, feb int, mar int, apr int, may int, jun int,
                jul int, aug int, sep int, oct int, nov int, dec int);
				declare @table3 table (Resource nvarchar(max), jan int, feb int, mar int, apr int, may int, jun int,
                jul int, aug int, sep int, oct int, nov int, dec int);

                if (select year from ProjectStatus where Id = @pid and year = @yr1) IS NOT NULL
				insert into @table2
                select 'Total', jan, feb, mar,apr, may, jun, jul,
				aug, sep, oct, nov, dec from ProjectStatus where Id = @pid 
				and year = @yr1;
				else
					insert into @table2
					select 'Total', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0;

                insert into @table2
					Select Username as Resource, 
					ISNULL([1], 0) as jan,
					ISNULL([2], 0) as feb,
					ISNULL([3], 0) as mar,
					ISNULL([4], 0) as apr,
					ISNULL([5], 0) as may,
					ISNULL([6], 0) as jun,
					ISNULL([7], 0) as jul,
					ISNULL([8], 0) as aug,
					ISNULL([9], 0) as sep,
					ISNULL([10], 0) as oct,
					ISNULL([11], 0) as nov,
					ISNULL([12], 0) as dec
				FROM
                (select U.Username as Username, month, coalesce(hours, 0) as hours from @table T  INNER JOIN Users U on U.Id = T.UserId where year = @yr1) AS SourceTable 
                PIVOT (
	            sum(hours)
	            for month in ([1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12])
                ) AS PivotTable;
                insert into @table2
                select 'Required Resource',
                (select TOP 1 jan from @table2) - sum(CASE WHEN Resource != 'Total' THEN jan ELSE 0 END) as jan,
                (select TOP 1 feb from @table2) - sum(CASE WHEN Resource != 'Total' THEN feb ELSE 0 END) as feb,
                (select TOP 1 mar from @table2) - sum(CASE WHEN Resource != 'Total' THEN mar ELSE 0 END) as mar,
                (select TOP 1 apr from @table2) - sum(CASE WHEN Resource != 'Total' THEN apr ELSE 0 END) as apr,
                (select TOP 1 may from @table2) - sum(CASE WHEN Resource != 'Total' THEN may ELSE 0 END) as may,
                (select TOP 1 jun from @table2) - sum(CASE WHEN Resource != 'Total' THEN jun ELSE 0 END) as jun,
                (select TOP 1 jul from @table2) - sum(CASE WHEN Resource != 'Total' THEN jul ELSE 0 END) as jul,
                (select TOP 1 aug from @table2) - sum(CASE WHEN Resource != 'Total' THEN aug ELSE 0 END) as aug,
                (select TOP 1 sep from @table2) - sum(CASE WHEN Resource != 'Total' THEN sep ELSE 0 END) as sep,
                (select TOP 1 oct from @table2) - sum(CASE WHEN Resource != 'Total' THEN oct ELSE 0 END) as oct,
                (select TOP 1 nov from @table2) - sum(CASE WHEN Resource != 'Total' THEN nov ELSE 0 END) as nov,
                (select TOP 1 dec from @table2) - sum(CASE WHEN Resource != 'Total' THEN dec ELSE 0 END) as dec
                from @table2

				if (select year from ProjectStatus where Id = @pid and year = @yr2) IS NOT NULL
				insert into @table3
                select 'Total', jan, feb, mar, apr, may, jun ,jul, aug
				, sep, oct, nov, dec from ProjectStatus where Id = @pid and year = @yr2;
				else
				insert into @table3
				select 'Total', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0;

                insert into @table3
					Select Username as Resource, 
					ISNULL([1], 0) as jan,
					ISNULL([2], 0) as feb,
					ISNULL([3], 0) as mar,
					ISNULL([4], 0) as apr,
					ISNULL([5], 0) as may,
					ISNULL([6], 0) as jun,
					ISNULL([7], 0) as jul,
					ISNULL([8], 0) as aug,
					ISNULL([9], 0) as sep,
					ISNULL([10], 0) as oct,
					ISNULL([11], 0) as nov,
					ISNULL([12], 0) as dec
				FROM
                (select U.Username as Username, month, coalesce(hours, 0) as hours from @table T  INNER JOIN Users U on U.Id = T.UserId where year = @yr2) AS SourceTable 
                PIVOT (
	            sum(hours)
	            for month in ([1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12])
                ) AS PivotTable;
                insert into @table3
                select 'Required Resource',
                (select TOP 1 jan from @table3) - sum(CASE WHEN Resource != 'Total' THEN jan ELSE 0 END) as jan,
                (select TOP 1 feb from @table3) - sum(CASE WHEN Resource != 'Total' THEN feb ELSE 0 END) as feb,
                (select TOP 1 mar from @table3) - sum(CASE WHEN Resource != 'Total' THEN mar ELSE 0 END) as mar,
                (select TOP 1 apr from @table3) - sum(CASE WHEN Resource != 'Total' THEN apr ELSE 0 END) as apr,
                (select TOP 1 may from @table3) - sum(CASE WHEN Resource != 'Total' THEN may ELSE 0 END) as may,
                (select TOP 1 jun from @table3) - sum(CASE WHEN Resource != 'Total' THEN jun ELSE 0 END) as jun,
                (select TOP 1 jul from @table3) - sum(CASE WHEN Resource != 'Total' THEN jul ELSE 0 END) as jul,
                (select TOP 1 aug from @table3) - sum(CASE WHEN Resource != 'Total' THEN aug ELSE 0 END) as aug,
                (select TOP 1 sep from @table3) - sum(CASE WHEN Resource != 'Total' THEN sep ELSE 0 END) as sep,
                (select TOP 1 oct from @table3) - sum(CASE WHEN Resource != 'Total' THEN oct ELSE 0 END) as oct,
                (select TOP 1 nov from @table3) - sum(CASE WHEN Resource != 'Total' THEN nov ELSE 0 END) as nov,
                (select TOP 1 dec from @table3) - sum(CASE WHEN Resource != 'Total' THEN dec ELSE 0 END) as dec
                from @table3
				

				select t2.Resource,
				case when t2.jan < 0 then 0 else (ISNULL(t2.jan, 0)) end as jan,
				case when t2.feb < 0 then 0 else (ISNULL(t2.feb, 0)) end as feb,
				case when t2.mar < 0 then 0 else (ISNULL(t2.mar, 0)) end as mar,
				case when t2.apr < 0 then 0 else (ISNULL(t2.apr, 0)) end as apr,
				case when t2.may < 0 then 0 else (ISNULL(t2.may, 0)) end as may,
				case when t2.jun < 0 then 0 else (ISNULL(t2.jun, 0)) end as jun,
				case when t2.jul < 0 then 0 else (ISNULL(t2.jul, 0)) end as jul,
				case when t2.aug < 0 then 0 else (ISNULL(t2.aug, 0)) end as aug,
				case when t2.sep < 0 then 0 else (ISNULL(t2.sep, 0)) end as sep,
				case when t2.oct < 0 then 0 else (ISNULL(t2.oct, 0)) end as oct,
				case when t2.nov < 0 then 0 else (ISNULL(t2.nov, 0)) end as nov,
				case when t2.dec < 0 then 0 else (ISNULL(t2.dec, 0)) end as dec,
				case when t3.jan < 0 then 0 else (ISNULL(t3.jan, 0)) end as jan2,
				case when t3.feb < 0 then 0 else (ISNULL(t3.feb, 0)) end as feb2,
				case when t3.mar < 0 then 0 else (ISNULL(t3.mar, 0)) end as mar2,
				case when t3.apr < 0 then 0 else (ISNULL(t3.apr, 0)) end as apr2,
				case when t3.may < 0 then 0 else (ISNULL(t3.may, 0)) end as may2,
				case when t3.jun < 0 then 0 else (ISNULL(t3.jun, 0)) end as jun2,
				case when t3.jul < 0 then 0 else (ISNULL(t3.jul, 0)) end as jul2,
				case when t3.aug < 0 then 0 else (ISNULL(t3.aug, 0)) end as aug2,
				case when t3.sep < 0 then 0 else (ISNULL(t3.sep, 0)) end as sep2,
				case when t3.oct < 0 then 0 else (ISNULL(t3.oct, 0)) end as oct2,
				case when t3.nov < 0 then 0 else (ISNULL(t3.nov, 0)) end as nov2,
				case when t3.dec < 0 then 0 else (ISNULL(t3.dec, 0)) end as dec2
				from @table2 t2 
				LEFT JOIN @table3 t3 on t2.Resource = t3.Resource;
            ;";

			using var connection = new SqlConnection(connectionString);
			connection.Open();
			return await connection.QueryAsync<ProjectUtil>(sql, new { Project = project });
		}

		public async Task<IEnumerable<ProjectUtil>> ForecastProject(string project)
		{
			var sql = @"
                				declare @table table (UserId int, Year int, month int, hours int);
				declare @pid int;
				declare @yr1 int, @yr2 int
				set @yr1= YEAR(GETDATE());
				set @yr2 = YEAR(GETDATE()) + 1;
                set @pid = (select Id from Projects where Title = @Project);
                insert into @table
                 select UP.UserId,  UP.Year, UP.month, coalesce(UP.hours, 0) as hours
                    from UserHours UP
                 where UP.ProjectId  = @pid and
				    (Year = @yr1 or Year = @yr2);
                declare @table2 table (Resource nvarchar(max), jan float, feb float, mar float, apr float, may float, jun float,
                jul float, aug float, sep float, oct float, nov float, dec float);
				declare @table3 table (Resource nvarchar(max),jan float, feb float, mar float, apr float, may float, jun float,
                jul float, aug float, sep float, oct float, nov float, dec float);

                insert into @table2
					Select Username as Resource, 
					CASE WHEN (select Jan from ProjectStatus where Id = @pid and Year = @yr1) = 0
					THEN 0 ELSE [1]/cast((select Jan from ProjectStatus where Id = @pid and Year = @yr1) as float) END as jan,
					CASE WHEN (select Feb from ProjectStatus where Id = @pid and Year = @yr1) = 0
					THEN 0 ELSE [2]/cast((select Feb from ProjectStatus where Id = @pid and Year = @yr1) as float) END as feb,
					CASE WHEN (select Mar from ProjectStatus where Id = @pid and Year = @yr1) = 0
					THEN 0 ELSE [3]/cast((select Mar from ProjectStatus where Id = @pid and Year = @yr1) as float) END as mar,
					CASE WHEN (select Apr from ProjectStatus where Id = @pid and Year = @yr1) = 0
					THEN 0 ELSE [4]/cast((select Apr from ProjectStatus where Id = @pid and Year = @yr1) as float) END as apr,
					CASE WHEN (select May from ProjectStatus where Id = @pid and Year = @yr1) = 0
					THEN 0 ELSE [5]/cast((select May from ProjectStatus where Id = @pid and Year = @yr1) as float) END as may,
					CASE WHEN (select Jun from ProjectStatus where Id = @pid and Year = @yr1) = 0
					THEN 0 ELSE [6]/cast((select Jun from ProjectStatus where Id = @pid and Year = @yr1) as float) END as jun,
					CASE WHEN (select Jul from ProjectStatus where Id = @pid and Year = @yr1) = 0
					THEN 0 ELSE [7]/cast((select Jul from ProjectStatus where Id = @pid and Year = @yr1) as float) END as jul,
					CASE WHEN (select Aug from ProjectStatus where Id = @pid and Year = @yr1) = 0
					THEN 0 ELSE [8]/cast((select Aug from ProjectStatus where Id = @pid and Year = @yr1) as float) END as aug,
					CASE WHEN (select Sep from ProjectStatus where Id = @pid and Year = @yr1) = 0
					THEN 0 ELSE [9]/cast((select Sep from ProjectStatus where Id = @pid and Year = @yr1) as float) END as sep,
					CASE WHEN (select Oct from ProjectStatus where Id = @pid and Year = @yr1) = 0
					THEN 0 ELSE [10]/cast((select Oct from ProjectStatus where Id = @pid and Year = @yr1) as float) END as oct,
					CASE WHEN (select Nov from ProjectStatus where Id = @pid and Year = @yr1) = 0
					THEN 0 ELSE [11]/cast((select Nov from ProjectStatus where Id = @pid and Year = @yr1) as float) END as nov,
					CASE WHEN (select Dec from ProjectStatus where Id = @pid and Year = @yr1) = 0
					THEN 0 ELSE [12]/cast((select Dec from ProjectStatus where Id = @pid and Year = @yr1) as float) END as dec
				FROM
                (select U.Username as Username, month, hours from @table T  INNER JOIN Users U on U.Id = T.UserId where year = @yr1) AS SourceTable 
                PIVOT (
	            sum(hours)
	            for month in ([1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12])
                ) AS PivotTable;


                insert into @table3
					Select Username as Resource, 
					CASE WHEN (select Jan from ProjectStatus where Id = @pid and Year = @yr2) = 0
					THEN 0 ELSE [1]/cast((select Jan from ProjectStatus where Id = @pid and Year = @yr2) as float) END as jan,
					CASE WHEN (select Feb from ProjectStatus where Id = @pid and Year = @yr2) = 0
					THEN 0 ELSE [2]/cast((select Feb from ProjectStatus where Id = @pid and Year = @yr2) as float) END as feb,
					CASE WHEN (select Mar from ProjectStatus where Id = @pid and Year = @yr2) = 0
					THEN 0 ELSE [3]/cast((select Mar from ProjectStatus where Id = @pid and Year = @yr2) as float) END as mar,
					CASE WHEN (select Apr from ProjectStatus where Id = @pid and Year = @yr2) = 0
					THEN 0 ELSE [4]/cast((select Apr from ProjectStatus where Id = @pid and Year = @yr2) as float) END as apr,
					CASE WHEN (select May from ProjectStatus where Id = @pid and Year = @yr2) = 0
					THEN 0 ELSE [5]/cast((select May from ProjectStatus where Id = @pid and Year = @yr2) as float) END as may,
					CASE WHEN (select Jun from ProjectStatus where Id = @pid and Year = @yr2) = 0
					THEN 0 ELSE [6]/cast((select Jun from ProjectStatus where Id = @pid and Year = @yr2) as float) END as jun,
					CASE WHEN (select Jul from ProjectStatus where Id = @pid and Year = @yr2) = 0
					THEN 0 ELSE [7]/cast((select Jul from ProjectStatus where Id = @pid and Year = @yr2) as float) END as jul,
					CASE WHEN (select Aug from ProjectStatus where Id = @pid and Year = @yr2) = 0
					THEN 0 ELSE [8]/cast((select Aug from ProjectStatus where Id = @pid and Year = @yr2) as float) END as aug,
					CASE WHEN (select Sep from ProjectStatus where Id = @pid and Year = @yr2) = 0
					THEN 0 ELSE [9]/cast((select Sep from ProjectStatus where Id = @pid and Year = @yr2) as float) END as sep,
					CASE WHEN (select Oct from ProjectStatus where Id = @pid and Year = @yr2) = 0
					THEN 0 ELSE [10]/cast((select Oct from ProjectStatus where Id = @pid and Year = @yr2) as float) END as oct,
					CASE WHEN (select Nov from ProjectStatus where Id = @pid and Year = @yr2) = 0
					THEN 0 ELSE [11]/cast((select Nov from ProjectStatus where Id = @pid and Year = @yr2) as float) END as nov,
					CASE WHEN (select Dec from ProjectStatus where Id = @pid and Year = @yr2) = 0
					THEN 0 ELSE [12]/cast((select Dec from ProjectStatus where Id = @pid and Year = @yr2) as float) END as dec
				FROM
                (select U.Username as Username, month, coalesce(hours, 0) as hours from @table T  INNER JOIN Users U on U.Id = T.UserId where year = @yr2) AS SourceTable 
                PIVOT (
	            sum(hours)
	            for month in ([1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12])
                ) AS PivotTable;                
				

				select t2.Resource,
				case when t2.jan < 0 then 0 else (ISNULL(t2.jan, 0)) end as jan,
				case when t2.feb < 0 then 0 else (ISNULL(t2.feb, 0)) end as feb,
				case when t2.mar < 0 then 0 else (ISNULL(t2.mar, 0)) end as mar,
				case when t2.apr < 0 then 0 else (ISNULL(t2.apr, 0)) end as apr,
				case when t2.may < 0 then 0 else (ISNULL(t2.may, 0)) end as may,
				case when t2.jun < 0 then 0 else (ISNULL(t2.jun, 0)) end as jun,
				case when t2.jul < 0 then 0 else (ISNULL(t2.jul, 0)) end as jul,
				case when t2.aug < 0 then 0 else (ISNULL(t2.aug, 0)) end as aug,
				case when t2.sep < 0 then 0 else (ISNULL(t2.sep, 0)) end as sep,
				case when t2.oct < 0 then 0 else (ISNULL(t2.oct, 0)) end as oct,
				case when t2.nov < 0 then 0 else (ISNULL(t2.nov, 0)) end as nov,
				case when t2.dec < 0 then 0 else (ISNULL(t2.dec, 0)) end as dec,
				case when t3.jan < 0 then 0 else (ISNULL(t3.jan, 0)) end as jan2,
				case when t3.feb < 0 then 0 else (ISNULL(t3.feb, 0)) end as feb2,
				case when t3.mar < 0 then 0 else (ISNULL(t3.mar, 0)) end as mar2,
				case when t3.apr < 0 then 0 else (ISNULL(t3.apr, 0)) end as apr2,
				case when t3.may < 0 then 0 else (ISNULL(t3.may, 0)) end as may2,
				case when t3.jun < 0 then 0 else (ISNULL(t3.jun, 0)) end as jun2,
				case when t3.jul < 0 then 0 else (ISNULL(t3.jul, 0)) end as jul2,
				case when t3.aug < 0 then 0 else (ISNULL(t3.aug, 0)) end as aug2,
				case when t3.sep < 0 then 0 else (ISNULL(t3.sep, 0)) end as sep2,
				case when t3.oct < 0 then 0 else (ISNULL(t3.oct, 0)) end as oct2,
				case when t3.nov < 0 then 0 else (ISNULL(t3.nov, 0)) end as nov2,
				case when t3.dec < 0 then 0 else (ISNULL(t3.dec, 0)) end as dec2
				from @table2 t2 
				LEFT JOIN @table3 t3 on t2.Resource = t3.Resource;
            ;";

			using var connection = new SqlConnection(connectionString);
			connection.Open();
			return await connection.QueryAsync<ProjectUtil>(sql, new { Project = project });
		}

	}
}
