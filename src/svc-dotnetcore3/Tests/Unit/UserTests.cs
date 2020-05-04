using FluentAssertions;
using Newtonsoft.Json;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Web.API.Application.Models;
using Xunit;

namespace Tests.Unit
{
    public class UserTests
    {
        [Fact]
        public void PropertiesShouldBeEqual()
        {
            var properties = new User
            {
                Id = 1,
                FirstName = "John",
                LastName = "Doe",
                Username = "doej",
                Location = "Vancouver"
            };

            properties.Id.Should().Be(1);
            properties.FirstName.Should().Be("John");
            properties.LastName.Should().Be("Doe");
            properties.Location.Should().Be("Vancouver");
        }
    }
}
