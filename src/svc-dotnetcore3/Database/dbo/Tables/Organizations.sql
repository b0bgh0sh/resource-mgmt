CREATE TABLE [dbo].[Organizations](
	[Id] [int] NOT NULL IDENTITY(1,1),
	[Name] [nvarchar](50) NOT NULL
 CONSTRAINT [PK_Organizations] PRIMARY KEY CLUSTERED ([Id]),
 CONSTRAINT [UK_Organizations_Name] UNIQUE ([Name])
)