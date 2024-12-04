using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using HouseGarland.Shared;
using GarlandHouse.DataModel.Entity;
using GarlandHouse.DataModel.Enum;

namespace GarlandHouse.DataModel
{
    public class DbInitializer
    {
        private readonly ApplicationContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IConfiguration _configuration;

        public DbInitializer(ApplicationContext context, IPasswordHasher<User> passwordHasher, IConfiguration configuration)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _configuration = configuration;
        }
        public void Initialize()
        {
            InitMainAdmin();
            //InitRole();
            //InitMainAdminsRole();

        }

        private void InitMainAdmin()
        {
            if (!_context.Users.Any())
            {
                var adminSettings = _configuration.GetSection("AdminUser").Get<AdminUserSettings>();

                var adminUser = new User();
                adminUser.FIO = adminSettings.FIO;
                adminUser.Email = adminSettings.Email;
                adminUser.Password = _passwordHasher.HashPassword(adminUser, adminSettings.Password);
                adminUser.Role = RoleNameEnum.Admin;
                _context.Users.Add(adminUser);
            }
            _context.SaveChanges();

        }

        //private void InitRole()
        //{
        //    var enumValues = System.Enum.GetValues(typeof(RoleNameEnum)).Cast<RoleNameEnum>();
        //    if(!_context.Roles.Any())
        //    {
        //        foreach (var item in enumValues)
        //        {
        //           _context.Roles.Add(new Role() { Name = item });
        //        }
        //    }
        //    _context.SaveChanges();
        //}

        //private void InitMainAdminsRole()
        //{
        //    var adminSettings = _configuration.GetSection("AdminUser").Get<AdminUserSettings>();
        //    var admin = _context.Users
        //        .Include(x => x.UserRoles)
        //        .FirstOrDefault(x => x.Email == adminSettings!.Email);

        //    if (admin != null && !admin.UserRoles.Any())
        //    {
        //        var adminRole = _context.Roles.First(x => x.Name == RoleNameEnum.Admin);

        //        _context.UserRoles.Add(new UserRole
        //        {
        //            UserId = admin.Id,
        //            RoleId = adminRole.Id
        //        });

        //        _context.SaveChanges();
        //    }
        //}
    }
}
