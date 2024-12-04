using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.DataModel.Enums
{
    /// <summary>
    /// Шаг между цоколями ламп
    /// </summary>
    public enum BeltLightLampStepEnum
    {
        [Display(Name = "20см")]
        Cm20,

        [Display(Name = "40 см")]
        Cm40
    }
}
