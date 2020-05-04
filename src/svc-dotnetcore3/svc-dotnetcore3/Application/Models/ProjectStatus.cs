
using System;
namespace Web.API.Application.Models
{
    public class ProjectStatus
    {
        public string Project { get; set; }
        public string Location { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string Status { get; set; }
        public string ProjectManager { get; set; }
        public string Discipline { get; set; }
    }
}
