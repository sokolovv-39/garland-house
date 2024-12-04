using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.DataModel.Enums
{
    public enum FringeLedEnum
    {
        [Display(Name = "Стандарт")]
        Standart,

        [Display(Name = "Премиум")]
        Premium
    }
}
