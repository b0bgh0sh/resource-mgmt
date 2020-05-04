namespace Web.API.Application.Models
{
    public class Skill
    {
        public int Id { get; set; }
        public int DisciplineId { get; set; }
        public string DisciplineName { get; set; }
        public string Name { get; set; }
        public int NumberOfPeople { get; set; }
    }
}
