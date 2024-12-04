using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.DataModel.Enums
{
    public enum ThreadScreedsTypeEnum
    {
        [Display(Name = "Стяжка 200мм")]
        Screeds_200,

        [Display(Name = "Стяжка 480-500мм")]
        Screeds_480_500,
    }
}
