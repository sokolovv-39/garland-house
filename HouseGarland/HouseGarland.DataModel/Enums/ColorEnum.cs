using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GarlandHouse.DataModel.Enums
{
    public enum ColorEnum
    {
        [Display(Name = "Черный")]
        Black,

        [Display(Name = "Белый")]
        White,

        [Display(Name = "Прозрачный")]
        Transparent,

        [Display(Name = "Венге")]
        Wenge,

        [Display(Name = "Серый")]
        Gray,

        [Display(Name = "Сосна")]
        Pine
    }
}
