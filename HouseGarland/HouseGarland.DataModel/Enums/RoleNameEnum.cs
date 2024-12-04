using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GarlandHouse.DataModel.Enum
{
    public enum RoleNameEnum
    {
        [Display(Name = "Администратор")]
        Admin,

        [Display(Name = "Менеджер")]
        Manager,

        [Display(Name = "Исполнитель")]
        Executor,
    }
}
