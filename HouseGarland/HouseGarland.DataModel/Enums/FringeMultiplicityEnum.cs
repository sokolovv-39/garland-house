using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.DataModel.Enums
{
    public enum FringeMultiplicityEnum
    {
        [Display(Name = "3 метра")]
        m3,

        [Display(Name = "5 метров")]
        m5
    }
}
