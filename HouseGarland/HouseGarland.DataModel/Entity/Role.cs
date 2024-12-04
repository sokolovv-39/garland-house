using GarlandHouse.DataModel.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace GarlandHouse.DataModel.Entity
{
    public class Role : EntityBase
    {
        public Role()
        {
            UserRoles = new HashSet<UserRole>();
        }
        public RoleNameEnum Name { get; set; }

        public ICollection<UserRole> UserRoles { get; set; }
    }
}
