using GarlandHouse.DataModel;
using GarlandHouse.DataModel.Entity;
using HouseGarland.BL.Services;
using HouseGarland.DataModel.Interfaces;
using HouseGarland.DataModel.Repository;
using HouseGarland.Shared.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace GarlandHouse.API.Extensions
{
    public static class IServicesCollectionExtension
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddScoped<DbInitializer>();
            services.AddTransient<IPasswordHasher<User>, PasswordHasher<User>>(serviceProvider =>
             {
                 var options = new PasswordHasherOptions
                 {
                     CompatibilityMode = PasswordHasherCompatibilityMode.IdentityV3, // Используемый режим хэширования
                     IterationCount = 10000 // Количество итераций хэширования (по умолчанию 10000)
                 };

                 return new PasswordHasher<User>(Options.Create(options));
             });
            services.AddTransient<OrderRepository, OrderRepository>();
            services.AddTransient<UserRepository, UserRepository>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IAuthService, AuthService>();
            services.AddTransient<IOrderService, OrderService>();
            services.AddTransient<IFileRepository, FileRepository>();
            services.AddTransient<IFileService, FileService>();

            return services;
        }
    }
}
