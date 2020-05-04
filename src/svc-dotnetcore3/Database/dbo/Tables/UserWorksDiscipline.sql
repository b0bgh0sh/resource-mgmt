CREATE TABLE [dbo].[UserWorksDiscipline](
	[UserId] INT NOT NULL,
	[DisciplineId] INT NOT NULL,
	[Year] [nvarchar](50) NOT NULL
CONSTRAINT [PK_UserWorksDiscipline] PRIMARY KEY ([UserId], [DisciplineId]),
CONSTRAINT [FK_UserWorksDiscipline_Users] FOREIGN KEY ([UserId]) REFERENCES [Users]([Id]) ON DELETE CASCADE, 
CONSTRAINT [FK_UserWorksDiscipline_Discipline] FOREIGN KEY ([DisciplineId]) REFERENCES [Disciplines]([Id]) ON DELETE CASCADE
)
