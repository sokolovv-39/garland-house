using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GarlandHouse.DataModel.Enums
{
    public enum GlowShadeEnum
    {
        [Display(Name = "Теплый")]
        Warm,

        [Display(Name = "Холодный")]
        Cold,

        [Display(Name = "RGB")]
        RGB,

        [Display(Name = " 7 цветов")]
        Colors7,

        [Display(Name = "Синий")]
        Blue,

        [Display(Name = "Красный")]
        Red,

        [Display(Name = "Зеленый")]
        Green,

        [Display(Name = "Филамент")]
        Filament,

        [Display(Name = "Розовый")]
        Pink,

        [Display(Name = "Оранжевый")]
        Orange,
    }
}
