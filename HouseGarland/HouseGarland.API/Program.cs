
using GarlandHouse.API.Extensions;
using GarlandHouse.DataModel;
using GarlandHouse.DataModel.Entity;
using HouseGarland.API.Configurations;
using HouseGarland.Shared;
using HouseGarland.Shared.DTO.Mapping;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json.Converters;
using System.Text;

namespace GarlandHouse.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var jwtConfig = builder.Configuration.GetSection("jwt").Get<JwtConfiguration>();
            var jwtKeyBytes = Encoding.ASCII.GetBytes(jwtConfig.Key);

            builder.Services.AddControllers()
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                    options.SerializerSettings.Converters.Add(new StringEnumConverter());
                });


            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "Введите JWT токен в формате: Bearer {token}",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer"
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        Array.Empty<string>()
                    }
                });
            });
            builder.Services.AddSwaggerGenNewtonsoftSupport();


            builder.Services.AddDbContext<ApplicationContext>(options => 
                options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddServices();

            builder.Services.AddAutoMapper(typeof(SharedAssemblyMarker).Assembly);

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer("AccessToken", options =>
            {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                         IssuerSigningKey = new SymmetricSecurityKey(jwtKeyBytes),
                         ValidateLifetime = true,
                         ValidateAudience = true,
                         ValidAudience = jwtConfig.Audience,
                         ValidateIssuer = true,
                         ValidIssuer = jwtConfig.Issuer,
                    };
            })
            .AddJwtBearer("RefreshToken", options =>
             {
                 options.TokenValidationParameters = new TokenValidationParameters
                 {
                     IssuerSigningKey = new SymmetricSecurityKey(jwtKeyBytes),
                     ValidateLifetime = false // Не проверяем срок действия для refresh токена
                 };
            });

            builder.Services.AddAuthorization(options =>
            {
                // Политика для маршрутов, защищенных AccessToken
                options.AddPolicy("AccessTokenPolicy", policy =>
                {
                    policy.AuthenticationSchemes.Add("AccessToken");
                    policy.RequireAuthenticatedUser();
                });

                // Политика для маршрутов, защищенных RefreshToken
                options.AddPolicy("RefreshTokenPolicy", policy =>
                {
                    policy.AuthenticationSchemes.Add("RefreshToken");
                    policy.RequireAuthenticatedUser();
                });
            });

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontendApp", police =>
                {
                    police.WithOrigins("http://localhost:3000", "http://91.236.199.216", "http://kalc.pro", "https://kalc.pro")
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });
            });

            var app = builder.Build();

            using(var scope = app.Services.CreateScope())
            {
                var initializer = scope.ServiceProvider.GetRequiredService<DbInitializer>();
                initializer.Initialize();
            }

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1");
                });
            }

            app.UseHttpsRedirection();
            app.UseCors("AllowFrontendApp");
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "uploads")),
                RequestPath = "/uploads"
            });

            app.MapControllers();

            app.Run();
        }
    }
}
