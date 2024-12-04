using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.DataModel.Enums
{
    public enum SurfaceEnum
    {
        [Display(Name = "Дерево")]
        Wood,

        [Display(Name = "Бетон")]
        Concrete,
    }
}
