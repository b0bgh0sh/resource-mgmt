CREATE TABLE [dbo].[UserHours](
	[UserId] INT NOT NULL,
	[ProjectId] INT NOT NULL,
	[Year] INT NOT NULL,
	[Month] INT NOT NULL,
	[Hours] INT NOT NULL
CONSTRAINT [PK_UserHours] PRIMARY KEY ([UserId], [ProjectId], [Year], [Month]),
CONSTRAINT [FK_UserHours_Users] FOREIGN KEY ([UserId]) REFERENCES [Users]([Id]) ON DELETE CASCADE,
CONSTRAINT [FK_UserHours_Projects] FOREIGN KEY ([ProjectId]) REFERENCES [Projects]([Id]) ON DELETE CASCADE
)
