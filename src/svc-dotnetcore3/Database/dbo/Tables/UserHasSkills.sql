CREATE TABLE [dbo].[UserHasSkills](
	[UserId] INT NOT NULL,
	[DisciplineId] INT NOT NULL,
	[SkillId] INT NOT NULL
CONSTRAINT [PK_UserHasSkills] PRIMARY KEY ([UserId], [DisciplineId], [SkillId]),
CONSTRAINT [FK_UserHasSkills_Users] FOREIGN KEY ([UserId]) REFERENCES [Users]([Id]) ON DELETE CASCADE, 
CONSTRAINT [FK_UserHasSkills_Skills] FOREIGN KEY ([DisciplineId], [SkillId]) REFERENCES [Skills]([DisciplineId], [Id]) ON DELETE CASCADE
)