using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.DataModel.Enums
{
    /// <summary>
    /// Толщина
    /// </summary>
    public enum ThicknessEnum
    {
        [Display(Name = "8x16 mm")]
        mm8x16,

        [Display(Name = "14x25 mm")]
        mm14x25,

        [Display(Name = "2 мм")]
        mm2,

        [Display(Name = "3 мм")]
        mm3,

        [Display(Name = "16 мм")]
        mm_16,

        [Display(Name = "25 мм")]
        mm_25
    }
}
