using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace GarlandHouse.DataModel.Enums
{
    public enum GlowModeEnum
    {
        [Display(Name = "Мерцание")]
        Flickering,

        [Display(Name = "Статическое свечение")]
        Static
    }
}
