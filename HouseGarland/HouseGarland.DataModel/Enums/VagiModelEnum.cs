using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.DataModel.Enums
{
    /// <summary>
    /// Модель клеммы
    /// </summary>
    public enum VagiModelEnum
    {
        [Display(Name = "2-проводная клемма")]
        Wire2,

        [Display(Name = "3-проводная клемма")]
        Wire3,

        [Display(Name = "5-проводная клемма")]
        Wire5
    }
}
