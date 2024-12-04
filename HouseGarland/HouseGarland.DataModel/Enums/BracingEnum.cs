using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GarlandHouse.DataModel.Enums
{
    public enum BracingEnum
    {
        [Display(Name = "Скоба")]
        Bracket,

        [Display(Name = "Трос")]
        Rope,

        [Display(Name = "Стяжка")]
        Screeds
    }
}
