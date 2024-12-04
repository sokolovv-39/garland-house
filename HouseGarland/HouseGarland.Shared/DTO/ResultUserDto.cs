using GarlandHouse.DataModel.Entity;
using GarlandHouse.DataModel.Enum;

namespace GarlandHouse.API.DTO
{
    public class ResultUserDto
    {
        public int Id { get; set; }
        public string FIO { get; set; }
        public string Email { get; set; }

        public RoleNameEnum Role { get; set; }
    }
}
