using GarlandHouse.DataModel.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.Shared.DTO
{
    public class RegisterUserDto
    {
        public string FIO {  get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public RoleNameEnum Role {  get; set; }
    }
}
