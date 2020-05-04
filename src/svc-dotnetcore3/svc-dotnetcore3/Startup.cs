using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using Web.API.Application.Repository;
using Web.API.Infrastructure.Config;
using Web.API.Infrastructure.Data;

namespace Web.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.WithOrigins(Configuration["AllowedOrigins"])
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });

            var connectionString = Configuration["ConnectionString"];

            services.AddAuthentication(sharedOptions =>
            {
                sharedOptions.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                var authSettings = Configuration.GetSection("AzureAd").Get<AzureAdOptions>();

                options.Audience = authSettings.ClientId;
                options.Authority = authSettings.Authority;
            });

            services.AddScoped<ILocationsRepository>(sp => new LocationsRepository(connectionString));
            services.AddScoped<IProjectsRepository>(sp => new ProjectsRepository(connectionString));
            services.AddScoped<IOrgRepository>(sp => new OrgRepository(connectionString));
            services.AddScoped<IUsersRepository>(sp => new UsersRepository(connectionString));
            services.AddScoped<ISkillsRepository>(sp => new SkillsRepository(connectionString));
            services.AddScoped<IAdminRepository>(sp => new AdminRepository(connectionString));
            services.AddScoped<IDisciplinesRepository>(sp => new DisciplinesRepository(connectionString));
            services.AddScoped<ISDRepository>(sp => new SDRepository(connectionString));
            services.AddScoped<IUDRepository>(sp => new UDRepository(connectionString));
            services.AddScoped<IUPRepository>(sp => new UPRepository(connectionString));
            services.AddScoped<IUURepository>(sp => new UURepository(connectionString));
            services.AddScoped<IPURepository>(sp => new PURepository(connectionString));
            services.AddScoped<ISearchRepository>(sp => new SearchRepository(connectionString));
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseCors("CorsPolicy");

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
