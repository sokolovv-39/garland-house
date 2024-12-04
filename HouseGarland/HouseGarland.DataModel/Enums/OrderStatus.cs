using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GarlandHouse.DataModel.Enums
{
    public enum OrderStatus
    {
        [Display(Name = "Назначен")]
        Assigned,

        [Display(Name = "Подписан")]
        Sign,

        [Display(Name = "Проведен")]
        Conducted,

        [Display(Name = "Отменен")]
        Canceled
    }
}
