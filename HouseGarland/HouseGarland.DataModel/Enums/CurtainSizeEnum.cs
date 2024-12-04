using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.DataModel.Enums
{
    public enum CurtainSizeEnum
    {
        [Display(Name = "2*1 м")]
        s_2_1,

        [Display(Name = "2*1.5 м")]
        s_2_1d5,

        [Display(Name = "2*2 м")]
        s_2_2,

        [Display(Name = "2*3 м")]
        s_2_3,

        [Display(Name = "2*4 м")]
        s_2_4,

        [Display(Name = "2*6 м")]
        s_2_6,

        [Display(Name = "2*9 м")]
        s_2_9,
    }
}
