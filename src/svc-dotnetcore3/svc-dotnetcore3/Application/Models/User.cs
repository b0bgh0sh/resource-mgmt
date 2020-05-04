namespace Web.API.Application.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Location { get; set; }
        public string Type { get; set; }
        public string Organization { get; set; }
    }
    public class Uname
    { 
        public string Username { get; set; }
        public string FullName { get; set; }
        public string Type { get; set; }
    }
}
