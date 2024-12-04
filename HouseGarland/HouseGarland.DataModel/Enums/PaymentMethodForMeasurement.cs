using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GarlandHouse.DataModel.Enums
{
    public enum PaymentMethodForMeasurement
    {
        [Display(Name = "Офисе")]
        Office,

        [Display(Name = "Клиент")]
        CLient,

        [Display(Name = "Нет данных")] 
        NoData
    }
}
